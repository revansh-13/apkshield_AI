import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AnalysisResult, HistorySummary } from '@/shared/types/analysis';
import { analysisService } from '@/services/analysis.service';

export type UploadStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';
export type HistoryStatus = 'idle' | 'loading' | 'success' | 'error';

interface AnalysisState {
  currentAnalysis: AnalysisResult | null;
  uploadStatus: UploadStatus;
  uploadProgress: number; // 0 to 100
  currentError: string | null;

  // History State
  historyList: HistorySummary[];
  historyStatus: HistoryStatus;
  historyError: string | null;

  // Actions
  uploadApk: (file: File) => Promise<void>;
  cancelUpload: () => void;
  resetState: () => void;
  clearAnalysis: () => void;
  
  // History Actions
  fetchHistory: () => Promise<void>;
  loadHistoricalAnalysis: (analysisId: string) => Promise<void>;
  deleteHistoricalAnalysis: (analysisId: string) => Promise<void>;
}

export const useAnalysisStore = create<AnalysisState>()(
  persist(
    (set, get) => ({
      currentAnalysis: null,
      uploadStatus: 'idle',
      uploadProgress: 0,
      currentError: null,

      historyList: [],
      historyStatus: 'idle',
      historyError: null,

      uploadApk: async (file: File) => {
        // Prevent overlapping uploads
        const { uploadStatus, cancelUpload } = get();
        if (uploadStatus === 'uploading' || uploadStatus === 'processing') {
          cancelUpload();
        }

        set({ uploadStatus: 'uploading', uploadProgress: 0, currentError: null });

        try {
          const result = await analysisService.uploadAndAnalyze(file, (progress) => {
            // Only update to processing if progress reaches 100
            set((state) => {
              // If the request was cancelled, don't update state
              if (state.uploadStatus === 'error' || state.uploadStatus === 'idle') return state;

              if (progress >= 100) {
                return { uploadProgress: 100, uploadStatus: 'processing' };
              }
              return { uploadProgress: progress, uploadStatus: 'uploading' };
            });
          });

          set({ 
            currentAnalysis: result, 
            uploadStatus: 'success', 
            uploadProgress: 100,
            currentError: null 
          });

        } catch (error: unknown) {
          // Cancellation — reset silently; do not show an error to the user
          if (
            error instanceof Error &&
            (error.name === 'CanceledError' || error.message === 'Canceled' || error.name === 'AbortError')
          ) {
            set({ uploadStatus: 'idle', uploadProgress: 0, currentError: null });
            return;
          }

          const message =
            error instanceof Error
              ? error.message
              : 'An unexpected error occurred during analysis.';

          set({ 
            uploadStatus: 'error', 
            currentError: message,
          });
        }
      },

      cancelUpload: () => {
        analysisService.cancelCurrentUpload();
        set({ uploadStatus: 'idle', uploadProgress: 0, currentError: null });
      },

      resetState: () => {
        set({ uploadStatus: 'idle', uploadProgress: 0, currentError: null });
      },

      clearAnalysis: () => {
        set({ currentAnalysis: null, uploadStatus: 'idle', uploadProgress: 0, currentError: null });
      },

      fetchHistory: async () => {
        set({ historyStatus: 'loading', historyError: null });
        try {
          const list = await analysisService.getHistoryList();
          set({ historyList: list, historyStatus: 'success' });
        } catch {
          set({ historyStatus: 'error', historyError: 'Failed to load history.' });
        }
      },

      loadHistoricalAnalysis: async (analysisId: string) => {
        set({ uploadStatus: 'processing', currentError: null });
        try {
          const result = await analysisService.getHistoryItem(analysisId);
          set({ currentAnalysis: result, uploadStatus: 'success' });
        } catch {
          set({ uploadStatus: 'error', currentError: 'Failed to load historical analysis.' });
        }
      },

      deleteHistoricalAnalysis: async (analysisId: string) => {
        try {
          await analysisService.deleteHistoryItem(analysisId);
          
          // Remove from local list
          set((state) => ({
            historyList: state.historyList.filter(h => h.analysis_id !== analysisId)
          }));
          
          // Clear current if we just deleted it
          const { currentAnalysis, clearAnalysis } = get();
          if (currentAnalysis && currentAnalysis.id === `res_${analysisId}`) {
            clearAnalysis();
          }
        } catch (error) {
          console.error("Failed to delete analysis:", error);
          throw error;
        }
      }
    }),
    {
      name: 'apkshield-analysis-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ currentAnalysis: state.currentAnalysis }),
    }
  )
);
