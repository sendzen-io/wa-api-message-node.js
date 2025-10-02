import { HttpClient } from '../client/http-client';
import { SendZenConfig, ApiResponse, RequestOptions, DeveloperOptions } from '../types';
import type { WhatsAppService } from '../services/whatsapp-service';

/**
 * Main WA Message API SDK class
 */
export class WaMessageApi {
  private httpClient: HttpClient;
  private config: SendZenConfig;
  private _whatsapp: WhatsAppService | null = null;
  private developerOptions: DeveloperOptions;

  constructor(config: SendZenConfig) {
    this.config = {
      timeout: 30000,
      ...config,
    };

    if (!this.config.apiKey) {
      throw new Error('API key is required');
    }

    if (!this.config.from) {
      throw new Error('From phone number is required');
    }

    this.developerOptions = this.initializeDeveloperOptions(config.developerOptions);

    this.httpClient = new HttpClient(
      'https://api.sendzen.io/v1/messages',
      this.config.apiKey,
      this.config.timeout,
      this.developerOptions
    );
  }

  /**
   * Initialize developer options with defaults
   */
  private initializeDeveloperOptions(options?: DeveloperOptions): DeveloperOptions {
    const defaultOptions: DeveloperOptions = {
      logs: [],
      logLevel: 'info',
      logFormat: 'pretty',
      enableRequestLogging: false,
      enableResponseLogging: false,
      enableErrorLogging: false,
      enableDebugLogging: false
    };

    if (!options) {
      return defaultOptions;
    }

    // If logs array is provided, enable corresponding logging
    if (options.logs && options.logs.length > 0) {
      return {
        ...defaultOptions,
        ...options,
        enableRequestLogging: options.logs.includes('request'),
        enableResponseLogging: options.logs.includes('response'),
        enableErrorLogging: options.logs.includes('error'),
        enableDebugLogging: options.logs.includes('debug')
      };
    }

    return {
      ...defaultOptions,
      ...options
    };
  }

  /**
   * Get developer options
   */
  getDeveloperOptions(): DeveloperOptions {
    return this.developerOptions;
  }

  /**
   * Update developer options
   */
  updateDeveloperOptions(options: Partial<DeveloperOptions>): void {
    this.developerOptions = {
      ...this.developerOptions,
      ...options
    };
    
    // Update HTTP client with new options
    this.httpClient = new HttpClient(
      'https://api.sendzen.io/v1/messages',
      this.config.apiKey,
      this.config.timeout,
      this.developerOptions
    );
  }

  /**
   * Get current configuration
   */
  getConfig(): Readonly<SendZenConfig> {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<SendZenConfig>): void {
    this.config = { ...this.config, ...newConfig };

    if (newConfig.apiKey) {
      this.httpClient.updateApiKey(newConfig.apiKey);
    }
  }

  /**
   * Get the from phone number
   */
  getFromNumber(): string {
    return this.config.from;
  }

  /**
   * Get WhatsApp service (lazy initialization to avoid circular imports)
   */
  get whatsapp(): WhatsAppService {
    if (!this._whatsapp) {
      const { WhatsAppService } = require('../services/whatsapp-service');
      this._whatsapp = new WhatsAppService(this);
    }
    return this._whatsapp!;
  }

  /**
   * Make a raw API request
   */
  async request<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    switch (method) {
      case 'GET':
        return this.httpClient.get<T>(endpoint, options);
      case 'POST':
        return this.httpClient.post<T>(endpoint, data, options);
      case 'PUT':
        return this.httpClient.put<T>(endpoint, data, options);
      case 'PATCH':
        return this.httpClient.patch<T>(endpoint, data, options);
      case 'DELETE':
        return this.httpClient.delete<T>(endpoint, options);
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }
}
