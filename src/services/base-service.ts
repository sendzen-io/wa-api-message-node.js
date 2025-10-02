import { WaMessageApi } from '../core/sendzen-sdk';
import { ApiResponse, RequestOptions, PaginationParams, PaginatedResponse } from '../types';

/**
 * Base service class that provides common functionality for all services
 */
export abstract class BaseService {
  protected sdk: WaMessageApi;

  constructor(sdk: WaMessageApi) {
    this.sdk = sdk;
  }

  /**
   * Build pagination parameters
   */
  protected buildPaginationParams(params?: PaginationParams): Record<string, any> {
    if (!params) return {};

    const result: Record<string, any> = {};

    if (params.page) {
      result.page = params.page;
    }

    if (params.limit) {
      result.limit = params.limit;
    }

    if (params.sortBy) {
      result.sort_by = params.sortBy;
    }

    if (params.sortOrder) {
      result.sort_order = params.sortOrder;
    }

    return result;
  }

  /**
   * Make a GET request
   */
  protected async get<T = any>(
    endpoint: string,
    params?: Record<string, any>,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.sdk.request('GET', endpoint, undefined, options);
  }

  /**
   * Make a POST request
   */
  protected async post<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.sdk.request('POST', endpoint, data, options);
  }

  /**
   * Make a PUT request
   */
  protected async put<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.sdk.request('PUT', endpoint, data, options);
  }

  /**
   * Make a PATCH request
   */
  protected async patch<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.sdk.request('PATCH', endpoint, data, options);
  }

  /**
   * Make a DELETE request
   */
  protected async delete<T = any>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.sdk.request('DELETE', endpoint, undefined, options);
  }

  /**
   * Get a single item by ID
   */
  protected async getById<T = any>(
    id: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.get<T>(`/${id}`, undefined, options);
  }

  /**
   * List items with pagination
   */
  protected async list<T = any>(
    pagination?: PaginationParams,
    filters?: Record<string, any>,
    options?: RequestOptions
  ): Promise<ApiResponse<PaginatedResponse<T>>> {
    return this.get<PaginatedResponse<T>>('', undefined, options);
  }

  /**
   * Create a new item
   */
  protected async create<T = any>(
    data: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.post<T>('', data, options);
  }

  /**
   * Update an item by ID
   */
  protected async update<T = any>(
    id: string,
    data: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.put<T>(`/${id}`, data, options);
  }

  /**
   * Partially update an item by ID
   */
  protected async partialUpdate<T = any>(
    id: string,
    data: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.patch<T>(`/${id}`, data, options);
  }

  /**
   * Delete an item by ID
   */
  protected async deleteById<T = any>(
    id: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.delete<T>(`/${id}`, options);
  }
}
