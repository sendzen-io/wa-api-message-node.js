# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 1. **DO NOT** create a public GitHub issue

Security vulnerabilities should be reported privately to protect users.

### 2. Email us directly

Send an email to [milan@sendzen.io](mailto:milan@sendzen.io) with the subject line:
```
[SECURITY] WA API Message Node.JS - Vulnerability Report
```

### 3. Include the following information

- **Description**: Clear description of the vulnerability
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Impact**: Potential impact of the vulnerability
- **Environment**: Node.js version, OS, SDK version
- **Proof of concept**: Code examples or screenshots (if applicable)

### 4. What to expect

- **Acknowledgment**: We'll acknowledge receipt within 48 hours
- **Assessment**: We'll assess the vulnerability within 7 days
- **Fix**: We'll work on a fix and keep you updated
- **Disclosure**: We'll coordinate disclosure with you

## Security Best Practices

### For Users

1. **Keep dependencies updated**
   ```bash
   npm audit
   npm update
   ```

2. **Use environment variables for sensitive data**
   ```typescript
   const waApi = new WaMessageApi({
     apiKey: process.env.SENDZEN_API_KEY, // Never hardcode API keys
     from: process.env.WHATSAPP_FROM_NUMBER
   });
   ```

3. **Validate input data**
   ```typescript
   // Always validate phone numbers and message content
   if (!validatePhoneNumber(phoneNumber)) {
     throw new Error('Invalid phone number');
   }
   ```

4. **Use HTTPS in production**
   - The SDK uses HTTPS by default
   - Never use HTTP for API calls in production

### For Contributors

1. **Never commit sensitive information**
   - API keys, passwords, tokens
   - Personal information
   - Internal URLs or endpoints

2. **Use security-focused coding practices**
   - Validate all inputs
   - Sanitize user data
   - Use parameterized queries
   - Implement proper error handling

3. **Review dependencies regularly**
   ```bash
   npm audit
   npm audit fix
   ```

## Security Audit

We regularly audit our dependencies and code:

- **Dependencies**: Monthly security audits
- **Code reviews**: All PRs require security review
- **Automated scanning**: GitHub Security Advisories
- **Penetration testing**: Annual third-party testing

## Security Checklist

Before submitting code:

- [ ] No hardcoded secrets or credentials
- [ ] Input validation implemented
- [ ] Error handling doesn't leak sensitive information
- [ ] Dependencies are up to date
- [ ] No security vulnerabilities in dependencies
- [ ] Code follows security best practices

## Known Security Considerations

### API Key Security
- API keys are sent in HTTP headers
- Never log or expose API keys
- Rotate keys regularly
- Use environment variables

### Phone Number Validation
- The SDK validates phone numbers using `libphonenumber-js`
- Invalid numbers are rejected to prevent abuse
- International format is enforced

### Message Content
- Content is sent to third-party services (SendZen API)
- Avoid sending sensitive information in messages
- Consider encryption for sensitive data

## Contact

For security-related questions or concerns:

- **Email**: [milan@sendzen.io](mailto:milan@sendzen.io)
- **Response time**: Within 48 hours
- **Encryption**: PGP key available upon request

## Security Acknowledgments

We appreciate security researchers who help us improve the security of our SDK. Contributors will be acknowledged in our security advisories (unless they prefer to remain anonymous).

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [npm Security](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [GitHub Security Advisories](https://docs.github.com/en/code-security/security-advisories)

---

**Last updated**: January 2025
**Next review**: July 2025
