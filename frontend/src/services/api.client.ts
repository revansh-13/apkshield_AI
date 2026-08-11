import axios, { AxiosError } from 'axios';

// Ensure NEXT_PUBLIC_API_URL is set, fallback for local dev
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL,
  timeout: 120000, // 2 minutes, APK analysis can take a while
});

export class ApiError extends Error {
  public code: string;
  public status?: number;

  constructor(message: string, code: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

// Global Response Interceptor to standardize errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // If request was canceled, throw a specific cancellation error
    if (axios.isCancel(error)) {
      return Promise.reject(new ApiError('Request was canceled.', 'CANCELED'));
    }

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const data = error.response.data as Record<string, unknown>;
      const message =
        typeof data?.detail === 'string' ? data.detail :
        typeof data?.message === 'string' ? data.message :
        'The server encountered an error.';
      
      if (status === 400 || status === 422) {
        return Promise.reject(new ApiError(message || 'The uploaded file is not a valid Android package archive.', 'INVALID_FILE', status));
      }
      
      return Promise.reject(new ApiError(`Server Error: ${message}`, 'SERVER_ERROR', status));
    } else if (error.request) {
      // The request was made but no response was received (network error or timeout)
      if (error.code === 'ECONNABORTED') {
        return Promise.reject(new ApiError('Analysis timed out. The binary may be too complex or backend is under heavy load.', 'TIMEOUT'));
      }
      return Promise.reject(new ApiError('Unable to connect to security backend. Please check your network or server status.', 'NETWORK_ERROR'));
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(new ApiError(error.message, 'UNKNOWN_ERROR'));
    }
  }
);
