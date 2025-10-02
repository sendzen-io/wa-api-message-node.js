/**
 * WA Message API JS - TypeScript SDK for sending WhatsApp messages via SendZen API
 * 
 * @packageDocumentation
 */

// Core SDK
import { WaMessageApi } from './core/sendzen-sdk';

// Services
export { WhatsAppService } from './services/whatsapp-service';

// Types
export type {
  SendZenConfig,
  DeveloperOptions,
  ApiResponse,
  ApiError,
  RequestOptions,
  MessageType,
  BaseMessage,
  TextMessage,
  ImageMessage,
  DocumentMessage,
  VideoMessage,
  InteractiveMessage,
  InteractiveButton,
  WhatsAppMessage,
  MessageResponse,
  MessageResponseItem,
  MessageStatus,
} from './types';

// HTTP Client (for advanced usage)
export { HttpClient } from './client/http-client';

// Default export
export { WaMessageApi };
