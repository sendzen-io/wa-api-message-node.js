import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, ApiError, RequestOptions, DeveloperOptions } from '../types';

/**
 * HTTP client for making API requests
 */
export class HttpClient {
  private client: AxiosInstance;
  private baseUrl: string;
  private apiKey: string;
  private defaultTimeout: number;
  private developerOptions: DeveloperOptions;

  constructor(baseUrl: string, apiKey: string, timeout: number = 30000, developerOptions?: DeveloperOptions) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.defaultTimeout = timeout;
    this.developerOptions = developerOptions || {
      logs: [],
      logLevel: 'info',
      logFormat: 'pretty',
      enableRequestLogging: false,
      enableResponseLogging: false,
      enableErrorLogging: false,
      enableDebugLogging: false
    };

    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: this.defaultTimeout,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'User-Agent': 'SendZen-SDK/1.0.0',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add timestamp to prevent caching
        config.params = {
          ...config.params,
          _t: Date.now(),
        };
        
        // Log request payload if enabled
        if (this.developerOptions.enableRequestLogging) {
          this.logRequest(config);
        }
        
        return config;
      },
      (error) => {
        if (this.developerOptions.enableErrorLogging) {
          this.logError('Request Error', error);
        }
        return Promise.reject(this.handleError(error));
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response if enabled
        if (this.developerOptions.enableResponseLogging) {
          this.logResponse(response);
        }
        return response;
      },
      (error) => {
        if (this.developerOptions.enableErrorLogging) {
          this.logError('Response Error', error);
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Log request details
   */
  private logRequest(config: AxiosRequestConfig): void {
    const logData = {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      data: config.data,
      headers: config.headers,
      timestamp: new Date().toISOString()
    };

    if (this.developerOptions.logFormat === 'json') {
      console.log('🚀 Request:', JSON.stringify(logData, null, 2));
    } else {
      console.group('🚀 Request Payload');
      console.log('Method:', logData.method);
      console.log('URL:', logData.url);
      console.log('Base URL:', logData.baseURL);
      console.log('Data:', JSON.stringify(logData.data, null, 2));
      console.log('Headers:', JSON.stringify(logData.headers,null,2));
      console.log('Timestamp:', logData.timestamp);
      console.groupEnd();
    }
  }

  /**
   * Log response details
   */
  private logResponse(response: AxiosResponse): void {
    const logData = {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers,
      timestamp: new Date().toISOString()
    };

    if (this.developerOptions.logFormat === 'json') {
      console.log('📥 Response:', JSON.stringify(logData, null, 2));
    } else {
      console.group('📥 Response');
      console.log('Status:', logData.status, logData.statusText);
      console.log('Data:', JSON.stringify(logData.data, null, 2));
      console.log('Headers:', JSON.stringify(logData.headers,null,2));
      console.log('Timestamp:', logData.timestamp);
      console.groupEnd();
    }
  }

  /**
   * Log error details
   */
  private logError(type: string, error: any): void {
    const logData = {
      type,
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      timestamp: new Date().toISOString()
    };

    if (this.developerOptions.logFormat === 'json') {
      console.error('❌ Error:', JSON.stringify(logData, null, 2));
    } else {
      console.group('❌ Error');
      console.log('Type:', logData.type);
      console.log('Message:', logData.message);
      if (logData.status) {
        console.log('Status:', logData.status, logData.statusText);
      }
      if (logData.data) {
        console.log('Data:', JSON.stringify(logData.data, null, 2));
      }
      console.log('Timestamp:', logData.timestamp);
      console.groupEnd();
    }
  }

  /**
   * Debug log
   */
  private debugLog(message: string, data?: any): void {
    if (this.developerOptions.enableDebugLogging) {
      if (this.developerOptions.logFormat === 'json') {
        console.log('🐛 Debug:', JSON.stringify({ message, data, timestamp: new Date().toISOString() }, null, 2));
      } else {
        console.log('🐛 Debug:', message, data);
      }
    }
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): ApiError {
    if (error.response) {
      // Server responded with error status
      const { status, statusText, data } = error.response;
      return {
        message: data?.message || statusText || 'Request failed',
        error: {
          code: data?.error?.code || 'API_ERROR',
          details: data?.error?.details || 'Unknown error details',
        },
        status,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        message: 'Network error - no response received',
        error: {
          code: 'NETWORK_ERROR',
          details: 'No response received from server',
        },
        status: 0,
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'Unknown error occurred',
        error: {
          code: 'UNKNOWN_ERROR',
          details: 'An unexpected error occurred',
        },
      };
    }
  }

  /**
   * Make a GET request
   */
  async get<T = any>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    const config = this.buildRequestConfig(options);
    const response = await this.client.get<T>(url, config);
    return this.formatResponse(response);
  }

  /**
   * Make a POST request
   */
  async post<T = any>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    const config = this.buildRequestConfig(options);
    const response = await this.client.post<T>(url, data, config);
    return this.formatResponse(response);
  }

  /**
   * Make a PUT request
   */
  async put<T = any>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    const config = this.buildRequestConfig(options);
    const response = await this.client.put<T>(url, data, config);
    return this.formatResponse(response);
  }

  /**
   * Make a PATCH request
   */
  async patch<T = any>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    const config = this.buildRequestConfig(options);
    const response = await this.client.patch<T>(url, data, config);
    return this.formatResponse(response);
  }

  /**
   * Make a DELETE request
   */
  async delete<T = any>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    const config = this.buildRequestConfig(options);
    const response = await this.client.delete<T>(url, config);
    return this.formatResponse(response);
  }

  /**
   * Build request configuration
   */
  private buildRequestConfig(options?: RequestOptions): AxiosRequestConfig {
    const config: AxiosRequestConfig = {};

    if (options?.timeout) {
      config.timeout = options.timeout;
    }

    if (options?.headers) {
      config.headers = {
        ...config.headers,
        ...options.headers,
      };
    }

    return config;
  }

  /**
   * Format response to consistent structure
   */
  private formatResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return {
      message: (response.data as any)?.message || 'Success',
      data: (response.data as any)?.data || response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as Record<string, string>,
    };
  }

  /**
   * Update API key
   */
  updateApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    this.client.defaults.headers['Authorization'] = `Bearer ${apiKey}`;
  }

  /**
   * Update base URL
   */
  updateBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl;
    this.client.defaults.baseURL = baseUrl;
  }
}
