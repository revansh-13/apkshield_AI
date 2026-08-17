import { apiClient } from './api.client';
import { 
  transformBackendResponse, 
  BackendUploadResponse, 
  BackendAnalyzeResponse 
} from './analysis.adapter';
import { AnalysisResult, HistorySummary } from '@/shared/types/analysis';

/**
 * AnalysisService
 *
 * Encapsulates the two-step backend pipeline:
 *   1. POST /upload  — multipart/form-data, field: `file`
 *   2. POST /analyze — JSON body: { saved_path }
 *
 * Components call `uploadAndAnalyze()` and receive an AnalysisResult.
 * The two-step nature of the backend is hidden entirely from the UI layer.
 */
class AnalysisService {
  /** Active AbortController for the currently running upload or analysis. */
  private currentAbortController: AbortController | null = null;

  /**
   * Upload an APK file and run security analysis.
   *
   * @param file             The APK file selected by the user.
   * @param onUploadProgress Optional callback receiving upload progress 0–100.
   *                         This covers only the file transfer phase (step 1).
   *                         The analysis phase (step 2) has no progress signal
   *                         from the backend; the UI shows a Processing state.
   * @returns                The transformed AnalysisResult ready for the store.
   */
  async uploadAndAnalyze(
    file: File,
    onUploadProgress?: (progress: number) => void,
  ): Promise<AnalysisResult> {
    // Cancel any stale in-flight request before starting a new one
    this.cancelCurrentUpload();

    const abortController = new AbortController();
    this.currentAbortController = abortController;

    const startTime = Date.now();

    try {
      // ── Step 1: Upload the APK ───────────────────────────────────────────
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await apiClient.post<BackendUploadResponse>(
        '/upload',
        formData,
        {
          signal: abortController.signal,
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total && onUploadProgress) {
              const pct = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onUploadProgress(pct);
            }
          },
        },
      );

      const uploadData = uploadResponse.data;

      if (!uploadData.ready_for_analysis) {
        throw new Error('Backend rejected the uploaded file.');
      }

      const savedPath = uploadData.metadata.saved_path;

      // ── Step 2: Trigger analysis ─────────────────────────────────────────
      // At this point the UI should be in the PROCESSING state.
      // No progress percentage is available — the backend does not stream it.
      const analyzeResponse = await apiClient.post<BackendAnalyzeResponse>(
        '/analyze',
        { 
          saved_path: savedPath,
          metadata: uploadData.metadata 
        },
        {
          signal: abortController.signal,
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const analysisTimeMs = Date.now() - startTime;

      // ── Step 3: Transform to domain model ───────────────────────────────
      return transformBackendResponse(
        analyzeResponse.data,
        uploadData.metadata,
        analysisTimeMs,
      );

    } finally {
      // Clear the controller only if it hasn't already been replaced by a new
      // upload that cancelled this one.
      if (this.currentAbortController === abortController) {
        this.currentAbortController = null;
      }
    }
  }

  /**
   * Abort any in-flight upload or analysis request.
   * Called when the user cancels, or before starting a new upload.
   */
  cancelCurrentUpload(): void {
    if (this.currentAbortController) {
      this.currentAbortController.abort();
      this.currentAbortController = null;
    }
  }

  /**
   * Retrieve a list of historical analyses.
   */
  async getHistoryList(): Promise<HistorySummary[]> {
    const response = await apiClient.get('/history');
    return response.data.history || [];
  }

  /**
   * Retrieve a specific historical analysis by ID.
   */
  async getHistoryItem(analysisId: string): Promise<AnalysisResult> {
    const response = await apiClient.get(`/history/${analysisId}`);
    const record = response.data.record;
    
    // We assume analysisTimeMs wasn't persisted accurately or isn't crucial for history view
    // so we pass 0 or a stored value if it exists.
    return transformBackendResponse(
      record.result,
      record.metadata,
      0 
    );
  }

  /**
   * Delete a historical analysis by ID.
   */
  async deleteHistoryItem(analysisId: string): Promise<void> {
    await apiClient.delete(`/history/${analysisId}`);
  }
}

export const analysisService = new AnalysisService();
