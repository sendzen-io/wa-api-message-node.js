---
name: Bug Report
about: Create a report to help us improve
title: '[BUG] '
labels: ['bug', 'needs-triage']
assignees: ''
---

## Bug Description

A clear and concise description of what the bug is.

## Steps to Reproduce

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior

A clear and concise description of what you expected to happen.

## Actual Behavior

A clear and concise description of what actually happened.

## Environment

- **Node.js version**: [e.g. 18.17.0]
- **npm version**: [e.g. 9.6.7]
- **OS**: [e.g. Windows 11, macOS 13.0, Ubuntu 22.04]
- **SDK version**: [e.g. 1.0.0]

## Code Example

```typescript
// Please provide a minimal code example that reproduces the issue
import { WaMessageApi } from 'wa-api-message-node-js';

const waApi = new WaMessageApi({
  apiKey: 'your-api-key',
  from: '1234567890'
});

// Your code here
```

## Error Details

```
// Paste any error messages, stack traces, or logs here
```

## Screenshots

If applicable, add screenshots to help explain your problem.

## Additional Context

Add any other context about the problem here.

## Checklist

- [ ] I have searched existing issues to ensure this is not a duplicate
- [ ] I have provided all the required information above
- [ ] I have tested this with the latest version of the SDK
