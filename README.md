# WA API Message Node.JS

[![npm version](https://badge.fury.io/js/wa-api-message-node-js.svg)](https://badge.fury.io/js/wa-api-message-node-js)
[![npm downloads](https://img.shields.io/npm/dm/wa-api-message-node-js.svg)](https://www.npmjs.com/package/wa-api-message-node-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful TypeScript SDK for sending WhatsApp messages through the [SendZen API](https://api.sendzen.io). Built for developers who want to integrate WhatsApp Business messaging into their applications with ease.

## ✨ Features

- 🚀 **Simple API** - Clean, intuitive interface for all message types
- 📱 **Complete WhatsApp Support** - Text, images, documents, videos, audio, interactive messages, and templates
- 🎯 **Template Management** - Advanced template message support with dynamic content
- 🔒 **Type Safety** - Full TypeScript support with comprehensive type definitions
- ⚡ **Performance** - Optimized for high-volume messaging
- 🛡️ **Validation** - Built-in validation for phone numbers, language codes, and message formats
- 🔄 **Error Handling** - Robust error handling with detailed error messages
- 📊 **Request Logging** - Built-in request payload logging for debugging

## 📦 Installation

```bash
npm install wa-api-message-node-js
```

## 🚀 Quick Start

```typescript
import { WaMessageApi } from 'wa-api-message-node-js';

// Initialize the SDK
const waApi = new WaMessageApi({
  apiKey: 'your-api-key-here',
  from: '1234567890', // Your WhatsApp Business number
});

// Send a text message
const response = await waApi.whatsapp.sendTextMessage({
  to: '1234567890',
  text: 'Hello from WA Message API!'
});

console.log('Message sent:', response.data);
```

## 📋 Table of Contents

- [Configuration](#configuration)
- [Message Types](#message-types)
  - [Text Messages](#text-messages)
  - [Media Messages](#media-messages)
  - [Interactive Messages](#interactive-messages)
  - [Template Messages](#template-messages)
- [Advanced Features](#advanced-features)
- [Error Handling](#error-handling)
- [TypeScript Support](#typescript-support)

## ⚙️ Configuration

```typescript
const waApi = new WaMessageApi({
  apiKey: 'your-api-key-here', // Required
  from: '1234567890', // Required - Your WhatsApp Business number
  timeout: 30000, // Optional, 30 seconds default
  headers: { // Optional custom headers
    'X-Custom-Header': 'value'
  },
  developerOptions: { // Optional - For debugging and logging
    logs: ['request', 'response', 'error', 'debug'], // Enable specific log types
    logLevel: 'info', // Log level: debug, info, warn, error
    logFormat: 'pretty' // Format: pretty, json
  }
});
```

### Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `apiKey` | `string` | ✅ | Your SendZen API key |
| `from` | `string` | ✅ | Your WhatsApp Business number (with country code, no +) |
| `timeout` | `number` | ❌ | Request timeout in milliseconds (default: 30000) |
| `headers` | `object` | ❌ | Custom headers to include with requests |
| `developerOptions` | `object` | ❌ | Developer options for debugging and logging |

### Developer Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `logs` | `string[]` | `[]` | Array of log types to enable: `['request', 'response', 'error', 'debug']` |
| `logLevel` | `string` | `'info'` | Log level: `'debug'`, `'info'`, `'warn'`, `'error'` |
| `logFormat` | `string` | `'pretty'` | Log format: `'pretty'` or `'json'` |
| `enableRequestLogging` | `boolean` | `false` | Enable request logging (auto-enabled if `logs` includes `'request'`) |
| `enableResponseLogging` | `boolean` | `false` | Enable response logging (auto-enabled if `logs` includes `'response'`) |
| `enableErrorLogging` | `boolean` | `false` | Enable error logging (auto-enabled if `logs` includes `'error'`) |
| `enableDebugLogging` | `boolean` | `false` | Enable debug logging (auto-enabled if `logs` includes `'debug'`) |

## 💬 Message Types

### Text Messages

```typescript
// Simple text message
await waApi.whatsapp.sendTextMessage({
  to: '1234567890',
  text: 'Hello World!'
});

// Text message with URL preview
await waApi.whatsapp.sendTextMessage({
  to: '1234567890',
  text: 'Check out this link: https://example.com',
  previewUrl: true
});
```

### Media Messages

#### Images

```typescript
// Image from URL
await waApi.whatsapp.sendImageMessage({
  to: '1234567890',
  imageUrl: 'https://example.com/image.jpg',
  caption: 'Check out this image!'
});

// Image from Media ID
await waApi.whatsapp.sendImageMessageWithId({
  to: '1234567890',
  mediaId: 'media_id_from_meta_cloud',
  caption: 'Image caption'
});
```

#### Documents

```typescript
// Document from URL
await waApi.whatsapp.sendDocumentMessage({
  to: '1234567890',
  documentUrl: 'https://example.com/document.pdf',
  filename: 'document.pdf',
  caption: 'Please find the attached document'
});

// Document from Media ID
await waApi.whatsapp.sendDocumentMessageWithId({
  to: '1234567890',
  mediaId: 'media_id_from_meta_cloud',
  filename: 'document.pdf',
  caption: 'Document caption'
});
```

#### Videos

```typescript
// Video from URL
await waApi.whatsapp.sendVideoMessage({
  to: '1234567890',
  videoUrl: 'https://example.com/video.mp4',
  caption: 'Check out this video!'
});

// Video from Media ID
await waApi.whatsapp.sendVideoMessageWithId({
  to: '1234567890',
  mediaId: 'media_id_from_meta_cloud',
  caption: 'Video caption'
});
```

#### Audio

```typescript
// Audio from URL
await waApi.whatsapp.sendAudioMessage({
  to: '1234567890',
  audioUrl: 'https://example.com/audio.mp3'
});

// Audio from Media ID
await waApi.whatsapp.sendAudioMessageWithId({
  to: '1234567890',
  mediaId: 'media_id_from_meta_cloud'
});
```

### Interactive Messages

Interactive messages allow users to respond with predefined buttons.

```typescript
// Basic interactive message
await waApi.whatsapp.sendInteractiveMessage({
  to: '1234567890',
  bodyText: 'Please choose an option:',
  buttons: [
    { id: 'option1', title: 'Option 1' },
    { id: 'option2', title: 'Option 2' },
    { id: 'option3', title: 'Option 3' }
  ],
  headerText: 'Interactive Message', // Optional
  footerText: 'Powered by WA Message API' // Optional
});
```

#### Interactive Messages with Media Headers

```typescript
// Interactive message with image header
await waApi.whatsapp.sendInteractiveMessageWithImageHeader({
  to: '1234567890',
  bodyText: 'Choose your preferred option:',
  buttons: [
    { id: 'yes', title: 'Yes' },
    { id: 'no', title: 'No' }
  ],
  imageUrl: 'https://example.com/header-image.jpg',
  footerText: 'Thank you!'
});

// Interactive message with video header
await waApi.whatsapp.sendInteractiveMessageWithVideoHeader({
  to: '1234567890',
  bodyText: 'Watch this video and choose:',
  buttons: [
    { id: 'like', title: 'Like' },
    { id: 'share', title: 'Share' }
  ],
  videoUrl: 'https://example.com/video.mp4'
});

// Interactive message with document header
await waApi.whatsapp.sendInteractiveMessageWithDocumentHeader({
  to: '1234567890',
  bodyText: 'Review the document and respond:',
  buttons: [
    { id: 'approve', title: 'Approve' },
    { id: 'reject', title: 'Reject' }
  ],
  documentUrl: 'https://example.com/document.pdf'
});
```

### Template Messages

Template messages are pre-approved message formats that can include dynamic content. They're essential for business communications and marketing.

#### ⚠️ Important: When to Use Components

**Only use components when your template has dynamic values (placeholders like `{{name}}`, `{{order_id}}`, etc.).**

- ✅ **Use components** when template has dynamic content
- ❌ **Don't use components** when template is static
- 🚨 **Warning**: Passing components for static templates will queue the message but it will never be delivered

#### Simple Template (No Dynamic Content)

```typescript
// Template without dynamic content - just template name and language
await waApi.whatsapp.template.sendTemplateMessage({
  to: '1234567890',
  templateName: 'welcome_message',
  langCode: 'en_US'
});
```

#### Template with Dynamic Content

```typescript
// Template with dynamic body content
// Template body: "Hello {{name}}, your order {{order_id}} is confirmed."
const bodyComponent = waApi.whatsapp.template.createBodyComponent([
  'John Doe',      // {{name}}
  'ORD-12345'      // {{order_id}}
]);

await waApi.whatsapp.template.sendTemplateMessage({
  to: '1234567890',
  templateName: 'order_confirmation',
  langCode: 'en_US',
  components: [bodyComponent]
});
```

#### Template with Header and Body

```typescript
// Template with dynamic header and body
// Header: "Order {{order_id}}"
// Body: "Hello {{name}}, your order is ready for pickup."

const headerComponent = waApi.whatsapp.template.createHeaderTextComponent('ORD-12345');
const bodyComponent = waApi.whatsapp.template.createBodyComponent(['John Doe']);

await waApi.whatsapp.template.sendTemplateMessage({
  to: '1234567890',
  templateName: 'order_ready',
  langCode: 'en_US',
  components: [headerComponent, bodyComponent]
});
```

#### Template with Media Header

```typescript
// Template with image header
const headerComponent = waApi.whatsapp.template.createHeaderImageComponent(
  'https://example.com/product-image.jpg'
);
const bodyComponent = waApi.whatsapp.template.createBodyComponent(['John Doe', 'Product Name']);

await waApi.whatsapp.template.sendTemplateMessage({
  to: '1234567890',
  templateName: 'product_announcement',
  langCode: 'en_US',
  components: [headerComponent, bodyComponent]
});
```

#### Template with Buttons

```typescript
// Template with quick reply buttons
const bodyComponent = waApi.whatsapp.template.createBodyComponent(['John Doe']);
const button1 = waApi.whatsapp.template.createQuickReplyButtonComponent(0, 'Track Order');
const button2 = waApi.whatsapp.template.createQuickReplyButtonComponent(1, 'Contact Support');

await waApi.whatsapp.template.sendTemplateMessage({
  to: '1234567890',
  templateName: 'order_status',
  langCode: 'en_US',
  components: [bodyComponent, button1, button2]
});
```

#### Template with URL and Phone Buttons

```typescript
// Template with URL and phone number buttons
const bodyComponent = waApi.whatsapp.template.createBodyComponent(['John Doe']);
const urlButton = waApi.whatsapp.template.createUrlButtonComponent(0, 'https://example.com/track');
const phoneButton = waApi.whatsapp.template.createPhoneNumberButtonComponent(1, '1234567890');

await waApi.whatsapp.template.sendTemplateMessage({
  to: '1234567890',
  templateName: 'order_tracking',
  langCode: 'en_US',
  components: [bodyComponent, urlButton, phoneButton]
});
```

#### Template Component Types

| Component Type | Method | Description |
|----------------|--------|-------------|
| **Header Text** | `createHeaderTextComponent(text)` | Dynamic text header |
| **Header Image** | `createHeaderImageComponent(url)` | Image header from URL |
| **Header Image ID** | `createHeaderImageIdComponent(mediaId)` | Image header from Media ID |
| **Header Video** | `createHeaderVideoComponent(url)` | Video header from URL |
| **Header Video ID** | `createHeaderVideoIdComponent(mediaId)` | Video header from Media ID |
| **Header Document** | `createHeaderDocumentComponent(url)` | Document header from URL |
| **Header Document ID** | `createHeaderDocumentIdComponent(mediaId)` | Document header from Media ID |
| **Body** | `createBodyComponent(textArray)` | Dynamic body text with multiple parameters |
| **Footer** | `createFooterComponent(textArray)` | Dynamic footer text with multiple parameters |
| **Quick Reply Button** | `createQuickReplyButtonComponent(index, text)` | Quick reply button (max 10) |
| **URL Button** | `createUrlButtonComponent(index, url)` | URL button (max 1) |
| **Phone Button** | `createPhoneNumberButtonComponent(index, phone)` | Phone number button (max 1) |
| **Copy Code Button** | `createCopyCodeButtonComponent(index, code)` | Copy code button (max 1) |

#### Template Validation Rules

- **Language Code**: Must be in format `en_US`, `es_ES`, `fr_FR`, etc.
- **Button Indices**: Must be unique (not necessarily sequential)
- **Button Texts**: Must be unique
- **Button Combinations**:
  - Quick reply buttons cannot be combined with other button types
  - Copy code buttons cannot be combined with phone/URL buttons
  - Maximum 1 URL button and 1 phone button per template

## 🔧 Advanced Features

### Batch Sending

```typescript
const phoneNumbers = ['1234567890', '0987654321', '1122334455'];
const promises = phoneNumbers.map(phone =>
  waApi.whatsapp.sendTextMessage({
    to: phone,
    text: 'Batch message to all users'
  })
);

const results = await Promise.allSettled(promises);
results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(`Message sent to ${phoneNumbers[index]}`);
  } else {
    console.error(`Failed to send to ${phoneNumbers[index]}:`, result.reason);
  }
});
```

### Custom Message with Raw API

```typescript
const customMessage = {
  type: 'text' as const,
  from: '1234567890',
  to: '1234567890',
  text: {
    body: 'Custom message',
    preview_url: false
  }
};

await waApi.whatsapp.sendMessage(customMessage);
```

### Request Logging

The SDK supports configurable logging for debugging. Enable logging using developer options:

```typescript
const waApi = new WaMessageApi({
  apiKey: 'your-api-key',
  from: '1234567890',
  developerOptions: {
    logs: ['request', 'response', 'error'], // Enable specific log types
    logFormat: 'pretty' // or 'json'
  }
});
```

#### Log Types

- **`request`**: Logs all outgoing requests with payload, headers, and metadata
- **`response`**: Logs all incoming responses with status, data, and headers
- **`error`**: Logs all errors with detailed error information
- **`debug`**: Logs debug information for troubleshooting

#### Log Formats

**Pretty Format (default):**
```
🚀 Request Payload:
Method: POST
URL: /v1/messages
Data: {
  "type": "text",
  "from": "1234567890",
  "to": "1234567890",
  "text": {
    "body": "Hello World!",
    "preview_url": false
  }
}
```

**JSON Format:**
```json
{
  "🚀 Request": {
    "method": "POST",
    "url": "/v1/messages",
    "data": {
      "type": "text",
      "from": "1234567890",
      "to": "1234567890",
      "text": {
        "body": "Hello World!",
        "preview_url": false
      }
    },
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

## 🚨 Error Handling

```typescript
try {
  const response = await waApi.whatsapp.sendTextMessage({
    to: '1234567890',
    text: 'Hello!'
  });
  console.log('Success:', response.data);
} catch (error: any) {
  if (error.status === 429) {
    console.log('Rate limit exceeded - please wait before retrying');
  } else if (error.status === 401) {
    console.log('Invalid API key - check your credentials');
  } else if (error.status === 400) {
    console.log('Bad request - check your message format');
  } else {
    console.error('Unexpected error:', error.message);
  }
}
```

### Common Error Scenarios

| Error | Status | Description | Solution |
|-------|--------|-------------|----------|
| Invalid phone number | 400 | Phone number format is incorrect | Use format: `1234567890` (no +) |
| Invalid language code | 400 | Language code format is incorrect | Use format: `en_US`, `es_ES`, etc. |
| Template not found | 400 | Template name doesn't exist | Check template name and language |
| Rate limit exceeded | 429 | Too many requests | Implement exponential backoff |
| API key not given  | 401 | Unauthorized | Check your API key |
| Invalid API key | 403 | API key is invalid or expired | Check your API key |
| Template components mismatch | 400 | Components don't match template | Verify template structure |

## 📝 TypeScript Support

The SDK is fully typed with comprehensive TypeScript definitions:

```typescript
import { 
  WaMessageApi, 
  DeveloperOptions,
  TextMessage, 
  ImageMessage, 
  TemplateComponent,
  MessageResponse 
} from 'wa-api-message-node-js';

// Type-safe message creation
const message: TextMessage = {
  type: 'text',
  from: '1234567890',
  to: '1234567890',
  text: {
    body: 'Type-safe message',
    preview_url: false
  }
};

// Type-safe response handling
const response: ApiResponse<MessageResponse> = await waApi.whatsapp.sendMessage(message);
```

## 🧪 Testing

```typescript
// Test your setup
try {
  const response = await waApi.whatsapp.sendTextMessage({
    to: 'your-test-number',
    text: 'Test message from WA Message API SDK'
  });
  console.log('✅ SDK is working correctly!');
  console.log('Message ID:', response.data[0].message_id);
} catch (error) {
  console.error('❌ SDK test failed:', error);
}

// Enable debugging for troubleshooting
const debugApi = new WaMessageApi({
  apiKey: 'your-api-key',
  from: '1234567890',
  developerOptions: {
    logs: ['request', 'response', 'error', 'debug'],
    logFormat: 'pretty'
  }
});
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Watch mode for development
npm run dev
```

## 📄 License

MIT

## 🆘 Support

- 📧 **Email**: milan@sendzen.io
- 🐛 **Issues**: [GitHub Issues](https://github.com/sendzen-io/wa-message-api.js/issues)
- 📖 **Documentation**: [SendZen API Docs](https://sendzen.io/docs)

## 🤝 Contributing

We welcome contributions to WA API Message Node.JS! Here's how you can contribute:

### 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- A GitHub account

### 🚀 Getting Started

#### 1. Fork the Repository

1. Go to [wa-message-api.js](https://github.com/sendzen-io/wa-message-api.js)
2. Click the "Fork" button in the top-right corner
3. This creates a copy of the repository in your GitHub account

#### 2. Clone Your Fork

```bash
# Replace 'your-username' with your GitHub username
git clone https://github.com/your-username/wa-message-api.js.git
cd wa-message-api.js
```

#### 3. Add Upstream Remote

```bash
# Add the original repository as upstream
git remote add upstream https://github.com/sendzen-io/wa-message-api.js.git

# Verify remotes
git remote -v
```

#### 4. Install Dependencies

```bash
npm install
```

#### 5. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description
```

### 💻 Making Changes

#### 1. Make Your Changes

- Write your code following the existing style
- Add tests for new features
- Update documentation if needed
- Ensure all tests pass

#### 2. Test Your Changes

```bash
# Run tests
npm test

# Run linting
npm run lint

# Build the project
npm run build
```

#### 3. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new feature description"
```

**Commit Message Format:**
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

### 🔄 Submitting Changes

#### 1. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

#### 2. Create a Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill out the pull request template:
   - **Title**: Clear, descriptive title
   - **Description**: Explain what changes you made and why
   - **Type**: Feature, Bug Fix, Documentation, etc.
   - **Testing**: Describe how you tested your changes
   - **Breaking Changes**: List any breaking changes (if applicable)

#### 3. Pull Request Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] I have tested these changes locally
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

### 🔍 Review Process

1. **Automated Checks**: GitHub Actions will run tests and linting
2. **Code Review**: Maintainers will review your code
3. **Feedback**: Address any feedback or requested changes
4. **Approval**: Once approved, your PR will be merged

### 🐛 Reporting Issues

If you find a bug or want to suggest a feature:

1. **Check Existing Issues**: Search for similar issues first
2. **Create New Issue**: Use the appropriate issue template
3. **Provide Details**:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (Node.js version, OS, etc.)

### 📚 Development Guidelines

#### Code Style
- Follow existing code patterns
- Use TypeScript for type safety
- Add JSDoc comments for public methods
- Keep functions small and focused

#### Testing
- Write unit tests for new features
- Ensure all tests pass
- Aim for good test coverage

#### Documentation
- Update README.md for user-facing changes
- Add JSDoc comments for new methods
- Update type definitions if needed

### 🎯 Areas for Contribution

- **Bug Fixes**: Fix reported issues
- **New Features**: Add new message types or functionality
- **Documentation**: Improve examples and guides
- **Performance**: Optimize existing code
- **Testing**: Add more test coverage
- **Examples**: Create usage examples

### ❓ Need Help?

- **Issues**: Ask questions in GitHub issues
- **Email**: Contact milan@sendzen.io for direct support

### 🏆 Recognition

Contributors will be:
- Listed in the project's contributors section
- Mentioned in release notes for significant contributions
- Invited to join the core team for consistent contributors

Thank you for contributing to WA API Message Node.JS! 🚀

---

**Made with ❤️ by the SendZen team**