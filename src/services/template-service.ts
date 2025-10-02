import { BaseService } from './base-service';
import { WaMessageApi } from '../core/sendzen-sdk';
import { 
  ApiResponse, 
  RequestOptions, 
  MessageResponse,
  validatePhoneNumber
} from '../types';

/**
 * Language code validation utility
 */
export function validateLanguageCode(langCode: string): boolean {
  // Validates format like en_US, es_ES, fr_FR, etc.
  const langCodePattern = /^[a-z]{2}_[A-Z]{2}$/;
  return langCodePattern.test(langCode);
}

/**
 * Template component types
 */
export type TemplateComponentType = 'header' | 'body' | 'footer' | 'button';

/**
 * Template parameter types
 */
export type TemplateParameterType = 'text' | 'image' | 'video' | 'document';

/**
 * Button sub types
 */
export type ButtonSubType = 'quick_reply' | 'phone_number' | 'url' | 'copy_code';

/**
 * Template parameter interface
 */
export interface TemplateParameter {
  type: TemplateParameterType;
  text?: string;
  image?: {
    link?: string;
    id?: string;
  };
  video?: {
    link?: string;
    id?: string;
  };
  document?: {
    link?: string;
    id?: string;
  };
}

/**
 * Template component interface
 */
export interface TemplateComponent {
  type: TemplateComponentType;
  parameters?: TemplateParameter[];
  sub_type?: ButtonSubType;
  index?: number;
}

/**
 * Template message interface
 */
export interface TemplateMessage {
  type: 'template';
  from: string;
  to: string;
  template: {
    name: string;
    lang_code: string;
    components?: TemplateComponent[];
  };
}

/**
 * Template message payload interface
 */
export interface TemplateMessagePayload {
  to: string;
  templateName: string;
  langCode: string;
  components?: TemplateComponent[];
  options?: RequestOptions;
}

/**
 * Template service for sending template messages through sendzen.io API
 */
export class TemplateService extends BaseService {
  constructor(sdk: WaMessageApi) {
    super(sdk);
  }

  /**
   * Send a template message
   */
  async sendTemplateMessage(
    payloadData: TemplateMessagePayload
  ): Promise<ApiResponse<MessageResponse>> {
    // Validate phone numbers
    if (!validatePhoneNumber(this.sdk.getFromNumber())) {
      throw new Error(`Invalid 'from' phone number format: ${this.sdk.getFromNumber()}`);
    }
    if (!validatePhoneNumber(payloadData.to)) {
      throw new Error(`Invalid 'to' phone number format: ${payloadData.to}`);
    }

    // Validate language code
    if (!validateLanguageCode(payloadData.langCode)) {
      throw new Error(`Invalid language code format: ${payloadData.langCode}. Expected format: en_US, es_ES, fr_FR, etc.`);
    }

    // Validate template components if provided
    if (payloadData.components) {
      this.validateTemplateComponents(payloadData.components);
    }

    const message: TemplateMessage = {
      type: 'template',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      template: {
        name: payloadData.templateName,
        lang_code: payloadData.langCode,
        components: payloadData.components,
      },
    };

    return this.post<MessageResponse>('', message, payloadData.options);
  }

  /**
   * Create a header component with text
   */
  createHeaderTextComponent(text: string): TemplateComponent {
    return {
      type: 'header',
      parameters: [
        {
          type: 'text',
          text,
        },
      ],
    };
  }

  /**
   * Create a header component with image
   */
  createHeaderImageComponent(imageUrl: string): TemplateComponent {
    return {
      type: 'header',
      parameters: [
        {
          type: 'image',
          image: {
            link: imageUrl,
          },
        },
      ],
    };
  }

  /**
   * Create a header component with image using media ID
   */
  createHeaderImageIdComponent(mediaId: string): TemplateComponent {
    return {
      type: 'header',
      parameters: [
        {
          type: 'image',
          image: {
            id: mediaId,
          },
        },
      ],
    };
  }

  /**
   * Create a header component with video
   */
  createHeaderVideoComponent(videoUrl: string): TemplateComponent {
    return {
      type: 'header',
      parameters: [
        {
          type: 'video',
          video: {
            link: videoUrl,
          },
        },
      ],
    };
  }

  /**
   * Create a header component with video using media ID
   */
  createHeaderVideoIdComponent(mediaId: string): TemplateComponent {
    return {
      type: 'header',
      parameters: [
        {
          type: 'video',
          video: {
            id: mediaId,
          },
        },
      ],
    };
  }

  /**
   * Create a header component with document
   */
  createHeaderDocumentComponent(documentUrl: string): TemplateComponent {
    return {
      type: 'header',
      parameters: [
        {
          type: 'document',
          document: {
            link: documentUrl,
          },
        },
      ],
    };
  }

  /**
   * Create a header component with document using media ID
   */
  createHeaderDocumentIdComponent(mediaId: string): TemplateComponent {
    return {
      type: 'header',
      parameters: [
        {
          type: 'document',
          document: {
            id: mediaId,
          },
        },
      ],
    };
  }

  /**
   * Create a body component with dynamic text parameters
   */
  createBodyComponent(textParameters: string[]): TemplateComponent {
    return {
      type: 'body',
      parameters: textParameters.map(text => ({
        type: 'text' as const,
        text,
      })),
    };
  }

  /**
   * Create a footer component with dynamic text parameters
   */
  createFooterComponent(textParameters: string[]): TemplateComponent {
    return {
      type: 'footer',
      parameters: textParameters.map(text => ({
        type: 'text' as const,
        text,
      })),
    };
  }

  /**
   * Create a quick reply button component
   */
  createQuickReplyButtonComponent(index: number, text: string): TemplateComponent {
    return {
      type: 'button',
      sub_type: 'quick_reply',
      index,
      parameters: [
        {
          type: 'text',
          text,
        },
      ],
    };
  }

  /**
   * Create a phone number button component
   */
  createPhoneNumberButtonComponent(index: number, phoneNumber: string): TemplateComponent {
    return {
      type: 'button',
      sub_type: 'phone_number',
      index,
      parameters: [
        {
          type: 'text',
          text: phoneNumber,
        },
      ],
    };
  }

  /**
   * Create a URL button component
   */
  createUrlButtonComponent(index: number, url: string): TemplateComponent {
    return {
      type: 'button',
      sub_type: 'url',
      index,
      parameters: [
        {
          type: 'text',
          text: url,
        },
      ],
    };
  }

  /**
   * Create a copy code button component
   */
  createCopyCodeButtonComponent(index: number, code: string): TemplateComponent {
    return {
      type: 'button',
      sub_type: 'copy_code',
      index,
      parameters: [
        {
          type: 'text',
          text: code,
        },
      ],
    };
  }

  /**
   * Validate template components
   */
  private validateTemplateComponents(components: TemplateComponent[]): void {
    const buttonComponents = components.filter(comp => comp.type === 'button');
    
    if (buttonComponents.length > 0) {
      this.validateButtonComponents(buttonComponents);
    }

    // Validate that each component has required parameters
    for (const component of components) {
      if (component.type !== 'button' && (!component.parameters || component.parameters.length === 0)) {
        throw new Error(`${component.type} component must have parameters`);
      }
    }
  }

  /**
   * Validate button components
   */
  private validateButtonComponents(buttonComponents: TemplateComponent[]): void {
    const quickReplyButtons = buttonComponents.filter(btn => btn.sub_type === 'quick_reply');
    const phoneNumberButtons = buttonComponents.filter(btn => btn.sub_type === 'phone_number');
    const urlButtons = buttonComponents.filter(btn => btn.sub_type === 'url');
    const copyCodeButtons = buttonComponents.filter(btn => btn.sub_type === 'copy_code');

    // Validate quick reply buttons (max 10)
    if (quickReplyButtons.length > 10) {
      throw new Error('Maximum 10 quick reply buttons allowed');
    }

    // Validate phone number buttons (max 1)
    if (phoneNumberButtons.length > 1) {
      throw new Error('Maximum 1 phone number button allowed');
    }

    // Validate URL buttons (max 1)
    if (urlButtons.length > 1) {
      throw new Error('Maximum 1 URL button allowed');
    }

    // Validate copy code buttons (max 1)
    if (copyCodeButtons.length > 1) {
      throw new Error('Maximum 1 copy code button allowed');
    }

    // Validate button combinations
    const hasQuickReply = quickReplyButtons.length > 0;
    const hasPhoneOrUrl = phoneNumberButtons.length > 0 || urlButtons.length > 0;
    const hasCopyCode = copyCodeButtons.length > 0;

    if (hasQuickReply && (hasPhoneOrUrl || hasCopyCode)) {
      throw new Error('Quick reply buttons cannot be combined with other button types');
    }

    if (hasCopyCode && hasPhoneOrUrl) {
      throw new Error('Copy code buttons cannot be combined with phone number or URL buttons');
    }

    // Validate button indices are unique
    const indices = buttonComponents.map(btn => btn.index);
    const uniqueIndices = new Set(indices);
    if (uniqueIndices.size !== indices.length) {
      throw new Error('Button indices must be unique');
    }

    // Validate button text uniqueness
    const buttonTexts = buttonComponents.map(btn => btn.parameters?.[0]?.text);
    const uniqueTexts = new Set(buttonTexts);
    if (uniqueTexts.size !== buttonTexts.length) {
      throw new Error('Button texts must be unique');
    }
  }
}
