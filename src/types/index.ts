/**
 * Core types and interfaces for the SendZen WhatsApp SDK
 */

/**
 * Developer options for debugging and logging
 */
export interface DeveloperOptions {
  logs?: ('request' | 'response' | 'error' | 'debug')[];
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  logFormat?: 'json' | 'pretty';
  enableRequestLogging?: boolean;
  enableResponseLogging?: boolean;
  enableErrorLogging?: boolean;
  enableDebugLogging?: boolean;
}

export interface SendZenConfig {
  apiKey: string;
  from: string;
  timeout?: number;
  headers?: Record<string, string>;
  developerOptions?: DeveloperOptions;
}

export interface ApiResponse<T = any> {
  message: string;
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface ApiError {
  message: string;
  error: {
    code: string;
    details: string;
  };
  status?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface RequestOptions {
  timeout?: number;
  headers?: Record<string, string>;
  retry?: {
    attempts: number;
    delay: number;
  };
}

/**
 * WhatsApp Message Types
 */
export type MessageType = 'text' | 'image' | 'document' | 'video' | 'audio' | 'interactive' | 'template';

export interface BaseMessage {
  type: MessageType;
  from: string;
  to: string;
  messageId?: string;
}

/**
 * Phone number validation utility
 */
export function validatePhoneNumber(phone: string): boolean {
  const phonePattern = /^[1-9][0-9]{0,3}[1-9][0-9]{9}$/;
  return phonePattern.test(phone) && phone.length <= 15;
}

/**
 * Interactive button validation utility
 */
export function validateInteractiveButtons(buttons: Array<{ id: string; title: string }>): void {
  if (buttons.length === 0) {
    throw new Error('Interactive message must have at least one button');
  }
  
  if (buttons.length > 3) {
    throw new Error('Interactive message can have maximum 3 buttons');
  }
  
  // Check for unique IDs
  const ids = buttons.map(button => button.id);
  const uniqueIds = new Set(ids);
  if (uniqueIds.size !== ids.length) {
    throw new Error('Interactive message buttons must have unique IDs');
  }
  
  // Check for unique titles
  const titles = buttons.map(button => button.title);
  const uniqueTitles = new Set(titles);
  if (uniqueTitles.size !== titles.length) {
    throw new Error('Interactive message buttons must have unique titles');
  }
}

export interface TextMessage extends BaseMessage {
  type: 'text';
  text: {
    body: string;
    preview_url?: boolean;
  };
}

/**
 * Image message interface
 */
export interface ImageMessage extends BaseMessage {
  type: 'image';
  image: {
    link?: string;
    id?: string;
    caption?: string;
  } & (
    | { link: string; id?: never }
    | { id: string; link?: never }
  );
}

/**
 * Document message interface
 */
export interface DocumentMessage extends BaseMessage {
  type: 'document';
  document: {
    link?: string;
    id?: string;
    filename: string;
    caption?: string;
  } & (
    | { link: string; id?: never }
    | { id: string; link?: never }
  );
}

/**
 * Video message interface
 */
export interface VideoMessage extends BaseMessage {
  type: 'video';
  video: {
    link?: string;
    id?: string;
    caption: string;
  } & (
    | { link: string; id?: never; caption: string }
    | { id: string; link?: never; caption: string }
  );
}

/**
 * Audio message interface
 */
export interface AudioMessage extends BaseMessage {
  type: 'audio';
  audio: {
    link?: string;
    id?: string;
  } & (
    | { link: string; id?: never }
    | { id: string; link?: never }
  );
}

/**
 * Interactive button interface
 */
export interface InteractiveButton {
  type: 'reply';
  reply: {
    id: string;
    title: string;
  };
}

/**
 * Interactive header types
 */
export type InteractiveHeader = 
  | { type: 'text'; text: string }
  | { type: 'image'; image: { id: string; link?: never } | { link: string; id?: never } }
  | { type: 'video'; video: { id: string; link?: never } | { link: string; id?: never } }
  | { type: 'document'; document: { id: string; link?: never } | { link: string; id?: never } };

/**
 * Interactive message interface
 */
export interface InteractiveMessage extends BaseMessage {
  type: 'interactive';
  interactive: {
    type: 'button';
    header?: InteractiveHeader;
    body: {
      text: string;
    };
    footer?: {
      text: string;
    };
    action: {
      buttons: InteractiveButton[];
    };
  };
}

/**
 * Union type for all message types
 */
export type WhatsAppMessage = 
  | TextMessage 
  | ImageMessage 
  | DocumentMessage 
  | VideoMessage 
  | AudioMessage
  | InteractiveMessage;

/**
 * Message response item interface
 */
export interface MessageResponseItem {
  message_id: string;
  status: 'queued' | 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  to: string;
}

/**
 * Message response interface (array of messages)
 */
export type MessageResponse = MessageResponseItem[];

/**
 * Message status interface
 */
export interface MessageStatus {
  message_id: string;
  status: 'queued' | 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  to: string;
  error?: {
    code: string;
    details: string;
  };
}
