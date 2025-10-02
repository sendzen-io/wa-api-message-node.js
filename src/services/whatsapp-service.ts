import { BaseService } from './base-service';
import { WaMessageApi } from '../core/sendzen-sdk';
import { TemplateService } from './template-service';
import { 
  ApiResponse, 
  RequestOptions, 
  WhatsAppMessage,
  TextMessage,
  ImageMessage,
  DocumentMessage,
  VideoMessage,
  AudioMessage,
  InteractiveMessage,
  MessageResponse,
  MessageStatus,
  validatePhoneNumber,
  validateInteractiveButtons
} from '../types';

/**
 * WhatsApp service for sending messages through sendzen.io API
 */
export class WhatsAppService extends BaseService {
  public template: TemplateService;

  constructor(sdk: WaMessageApi) {
    super(sdk);
    this.template = new TemplateService(sdk);
  }

  /**
   * Send a WhatsApp message
   */
  async sendMessage(
    message: WhatsAppMessage,
    options?: RequestOptions
  ): Promise<ApiResponse<MessageResponse>> {
    // Validate phone numbers
    if (!validatePhoneNumber(message.from)) {
      throw new Error(`Invalid 'from' phone number format: ${message.from}`);
    }
    if (!validatePhoneNumber(message.to)) {
      throw new Error(`Invalid 'to' phone number format: ${message.to}`);
    }

    // Format the message according to sendzen.io API structure
    const formattedMessage: any = {
      from: message.from,
      To: message.to, // Note: Capital 'T' as per API spec
      type: message.type,
    };
    
    if (message.type === 'text') {
      formattedMessage.text = {
        body: (message as TextMessage).text.body,
        preview_url: (message as TextMessage).text.preview_url || false
      };
    } else if (message.type === 'image') {
      const imageData: any = {
        caption: (message as ImageMessage).image.caption
      };
      if ((message as ImageMessage).image.link) {
        imageData.link = (message as ImageMessage).image.link;
      } else if ((message as ImageMessage).image.id) {
        imageData.id = (message as ImageMessage).image.id;
      } else {
        throw new Error('Image message must have either link or id');
      }
      formattedMessage.image = imageData;
    } else if (message.type === 'document') {
      const documentData: any = {
        filename: (message as DocumentMessage).document.filename,
        caption: (message as DocumentMessage).document.caption
      };
      if ((message as DocumentMessage).document.link) {
        documentData.link = (message as DocumentMessage).document.link;
      } else if ((message as DocumentMessage).document.id) {
        documentData.id = (message as DocumentMessage).document.id;
      } else {
        throw new Error('Document message must have either link or id');
      }
      formattedMessage.document = documentData;
    } else if (message.type === 'video') {
      const videoData: any = {
        caption: (message as VideoMessage).video.caption
      };
      if ((message as VideoMessage).video.link) {
        videoData.link = (message as VideoMessage).video.link;
      } else if ((message as VideoMessage).video.id) {
        videoData.id = (message as VideoMessage).video.id;
      } else {
        throw new Error('Video message must have either link or id');
      }
      formattedMessage.video = videoData;
    } else if (message.type === 'audio') {
      const audioData: any = {};
      if ((message as AudioMessage).audio.link) {
        audioData.link = (message as AudioMessage).audio.link;
      } else if ((message as AudioMessage).audio.id) {
        audioData.id = (message as AudioMessage).audio.id;
      } else {
        throw new Error('Audio message must have either link or id');
      }
      formattedMessage.audio = audioData;
    } else if (message.type === 'interactive') {
      formattedMessage.interactive = (message as InteractiveMessage).interactive;
    }
    
    return this.post<MessageResponse>('', formattedMessage, options);
  }

  /**
   * Send a text message
   */
  async sendTextMessage(
    payloadData: {
      to: string;
      text: string;
      previewUrl?: boolean;
      options?: RequestOptions;
    }
  ): Promise<ApiResponse<MessageResponse>> {
    const message: TextMessage = {
      type: 'text',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      text: {
        body: payloadData.text,
        preview_url: payloadData.previewUrl || false
      }
    };
    return this.sendMessage(message, payloadData.options);
  }

  /**
   * Send an image message
   */
  async sendImageMessage(
    payloadData: {
      to: string;
      imageUrl: string;
      caption?: string;
      options?: RequestOptions;
    }
  ): Promise<ApiResponse<MessageResponse>> {
    const message: ImageMessage = {
      type: 'image',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      image: {
        link: payloadData.imageUrl,
        caption: payloadData.caption,
      },
    };
    return this.sendMessage(message, payloadData.options);
  }

  /**
   * Send an image message using media ID
   */
  async sendImageMessageWithId(
    payloadData: {
      to: string;
      mediaId: string;
      caption?: string;
      options?: RequestOptions;
    }
  ): Promise<ApiResponse<MessageResponse>> {
    const message: ImageMessage = {
      type: 'image',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      image: {
        id: payloadData.mediaId,
        caption: payloadData.caption,
      },
    };
    return this.sendMessage(message, payloadData.options);
  }


  /**
   * Send a document message
   */
  async sendDocumentMessage(
    payloadData: {
      to: string;
      documentUrl: string;
      filename: string;
      caption?: string;
      options?: RequestOptions;
    }
  ): Promise<ApiResponse<MessageResponse>> {
    const message: DocumentMessage = {
      type: 'document',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      document: {
        link: payloadData.documentUrl,
        filename: payloadData.filename,
        caption: payloadData.caption,
      },
    };
    return this.sendMessage(message, payloadData.options);
  }

  /**
   * Send a document message using media ID
   */
  async sendDocumentMessageWithId(
    payloadData: {
      to: string;
      mediaId: string;
      filename: string;
      caption?: string;
      options?: RequestOptions;
    }
  ): Promise<ApiResponse<MessageResponse>> {
    const message: DocumentMessage = {
      type: 'document',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      document: {
        id: payloadData.mediaId,
        filename: payloadData.filename,
        caption: payloadData.caption,
      },
    };
    return this.sendMessage(message, payloadData.options);
  }


  /**
   * Send a video message
   */
  async sendVideoMessage(
    payloadData: {
      to: string;
      videoUrl: string;
      caption: string;
      options?: RequestOptions;
    }
  ): Promise<ApiResponse<MessageResponse>> {
    const message: VideoMessage = {
      type: 'video',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      video: {
        link: payloadData.videoUrl,
        caption: payloadData.caption,
      },
    };
    return this.sendMessage(message, payloadData.options);
  }

  /**
   * Send a video message using media ID
   */
  async sendVideoMessageWithId(
    payloadData: {
      to: string;
      mediaId: string;
      caption: string;
      options?: RequestOptions;
    }
  ): Promise<ApiResponse<MessageResponse>> {
    const message: VideoMessage = {
      type: 'video',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      video: {
        id: payloadData.mediaId,
        caption: payloadData.caption,
      },
    };
    return this.sendMessage(message, payloadData.options);
  }

  /**
   * Send an audio message
   */
  async sendAudioMessage(
    payloadData: {
      to: string;
      audioUrl: string;
      options?: RequestOptions;
    }
  ): Promise<ApiResponse<MessageResponse>> {
    const message: AudioMessage = {
      type: 'audio',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      audio: {
        link: payloadData.audioUrl,
      },
    };
    return this.sendMessage(message, payloadData.options);
  }

  /**
   * Send an audio message using media ID
   */
  async sendAudioMessageWithId(
    payloadData: {
      to: string;
      mediaId: string;
      options?: RequestOptions;
    }
  ): Promise<ApiResponse<MessageResponse>> {
    const message: AudioMessage = {
      type: 'audio',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      audio: {
        id: payloadData.mediaId,
      },
    };
    return this.sendMessage(message, payloadData.options);
  }

  /**
   * Send an interactive button message
   */
  async sendInteractiveMessage(
    payloadData: {
      to: string;
      bodyText: string;
      buttons: Array<{ id: string; title: string }>;
      headerText?: string;
      footerText?: string;
      options?: RequestOptions;
    }
  ): Promise<ApiResponse<MessageResponse>> {
    // Validate buttons
    validateInteractiveButtons(payloadData.buttons);

    const message: InteractiveMessage = {
      type: 'interactive',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      interactive: {
        type: 'button',
        body: {
          text: payloadData.bodyText,
        },
        action: {
          buttons: payloadData.buttons.map(button => ({
            type: 'reply' as const,
            reply: {
              id: button.id,
              title: button.title,
            },
          })),
        },
      },
    };

    // Add optional header
    if (payloadData.headerText) {
      message.interactive.header = {
        type: 'text',
        text: payloadData.headerText,
      };
    }

    // Add optional footer
    if (payloadData.footerText) {
      message.interactive.footer = {
        text: payloadData.footerText,
      };
    }

    return this.sendMessage(message, payloadData.options);
  }

  /**
   * Send an interactive message with image header
   */
  async sendInteractiveMessageWithImageHeader(
    payloadData: {
      to: string;
      bodyText: string;
      buttons: Array<{ id: string; title: string }>;
      imageUrl: string;
      footerText?: string;
      options?: RequestOptions;
    }
  ): Promise<ApiResponse<MessageResponse>> {
    // Validate buttons
    validateInteractiveButtons(payloadData.buttons);

    const message: InteractiveMessage = {
      type: 'interactive',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      interactive: {
        type: 'button',
        header: {
          type: 'image',
          image: {
            link: payloadData.imageUrl,
          },
        },
        body: {
          text: payloadData.bodyText,
        },
        action: {
          buttons: payloadData.buttons.map(button => ({
            type: 'reply' as const,
            reply: {
              id: button.id,
              title: button.title,
            },
          })),
        },
      },
    };

    // Add optional footer
    if (payloadData.footerText) {
      message.interactive.footer = {
        text: payloadData.footerText,
      };
    }

    return this.sendMessage(message, payloadData.options);
  }

  /**
   * Send an interactive message with image header using media ID
   */
  async sendInteractiveMessageWithImageIdHeader(
    payloadData: {
      to: string;
      bodyText: string;
      buttons: Array<{ id: string; title: string }>;
      mediaId: string;
      footerText?: string;
      options?: RequestOptions;
    }
  ): Promise<ApiResponse<MessageResponse>> {
    // Validate buttons
    validateInteractiveButtons(payloadData.buttons);

    const message: InteractiveMessage = {
      type: 'interactive',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      interactive: {
        type: 'button',
        header: {
          type: 'image',
          image: {
            id: payloadData.mediaId,
          },
        },
        body: {
          text: payloadData.bodyText,
        },
        action: {
          buttons: payloadData.buttons.map(button => ({
            type: 'reply' as const,
            reply: {
              id: button.id,
              title: button.title,
            },
          })),
        },
      },
    };

    // Add optional footer
    if (payloadData.footerText) {
      message.interactive.footer = {
        text: payloadData.footerText,
      };
    }

    return this.sendMessage(message, payloadData.options);
  }

  /**
   * Send an interactive message with video header
   */
  async sendInteractiveMessageWithVideoHeader(
    payloadData: {
      to: string;
      bodyText: string;
      buttons: Array<{ id: string; title: string }>;
      videoUrl: string;
      footerText?: string;
      options?: RequestOptions;
    }
  ): Promise<ApiResponse<MessageResponse>> {
    // Validate buttons
    validateInteractiveButtons(payloadData.buttons);

    const message: InteractiveMessage = {
      type: 'interactive',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      interactive: {
        type: 'button',
        header: {
          type: 'video',
          video: {
            link: payloadData.videoUrl,
          },
        },
        body: {
          text: payloadData.bodyText,
        },
        action: {
          buttons: payloadData.buttons.map(button => ({
            type: 'reply' as const,
            reply: {
              id: button.id,
              title: button.title,
            },
          })),
        },
      },
    };

    // Add optional footer
    if (payloadData.footerText) {
      message.interactive.footer = {
        text: payloadData.footerText,
      };
    }

    return this.sendMessage(message, payloadData.options);
  }

  /**
   * Send an interactive message with video header using media ID
   */
  async sendInteractiveMessageWithVideoIdHeader(
    payloadData: {
      to: string;
      bodyText: string;
      buttons: Array<{ id: string; title: string }>;
      mediaId: string;
      footerText?: string;
      options?: RequestOptions;
    }
  ): Promise<ApiResponse<MessageResponse>> {
    // Validate buttons
    validateInteractiveButtons(payloadData.buttons);

    const message: InteractiveMessage = {
      type: 'interactive',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      interactive: {
        type: 'button',
        header: {
          type: 'video',
          video: {
            id: payloadData.mediaId,
          },
        },
        body: {
          text: payloadData.bodyText,
        },
        action: {
          buttons: payloadData.buttons.map(button => ({
            type: 'reply' as const,
            reply: {
              id: button.id,
              title: button.title,
            },
          })),
        },
      },
    };

    // Add optional footer
    if (payloadData.footerText) {
      message.interactive.footer = {
        text: payloadData.footerText,
      };
    }

    return this.sendMessage(message, payloadData.options);
  }

  /**
   * Send an interactive message with document header
   */
  async sendInteractiveMessageWithDocumentHeader(
    payloadData: {
      to: string;
      bodyText: string;
      buttons: Array<{ id: string; title: string }>;
      documentUrl: string;
      footerText?: string;
      options?: RequestOptions;
    }
  ): Promise<ApiResponse<MessageResponse>> {
    // Validate buttons
    validateInteractiveButtons(payloadData.buttons);

    const message: InteractiveMessage = {
      type: 'interactive',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      interactive: {
        type: 'button',
        header: {
          type: 'document',
          document: {
            link: payloadData.documentUrl,
          },
        },
        body: {
          text: payloadData.bodyText,
        },
        action: {
          buttons: payloadData.buttons.map(button => ({
            type: 'reply' as const,
            reply: {
              id: button.id,
              title: button.title,
            },
          })),
        },
      },
    };

    // Add optional footer
    if (payloadData.footerText) {
      message.interactive.footer = {
        text: payloadData.footerText,
      };
    }

    return this.sendMessage(message, payloadData.options);
  }

  /**
   * Send an interactive message with document header using media ID
   */
  async sendInteractiveMessageWithDocumentIdHeader(
    payloadData: {
      to: string;
      bodyText: string;
      buttons: Array<{ id: string; title: string }>;
      mediaId: string;
      footerText?: string;
      options?: RequestOptions;
    }
  ): Promise<ApiResponse<MessageResponse>> {
    // Validate buttons
    validateInteractiveButtons(payloadData.buttons);

    const message: InteractiveMessage = {
      type: 'interactive',
      from: this.sdk.getFromNumber(),
      to: payloadData.to,
      interactive: {
        type: 'button',
        header: {
          type: 'document',
          document: {
            id: payloadData.mediaId,
          },
        },
        body: {
          text: payloadData.bodyText,
        },
        action: {
          buttons: payloadData.buttons.map(button => ({
            type: 'reply' as const,
            reply: {
              id: button.id,
              title: button.title,
            },
          })),
        },
      },
    };

    // Add optional footer
    if (payloadData.footerText) {
      message.interactive.footer = {
        text: payloadData.footerText,
      };
    }

    return this.sendMessage(message, payloadData.options);
  }


  /**
   * Get message templates
   */
  async getTemplates(
    options?: RequestOptions
  ): Promise<ApiResponse<Array<{
    id: string;
    name: string;
    status: string;
    category: string;
    language: string;
    components: any[];
  }>>> {
    return this.get('/templates', undefined, options);
  }
}
