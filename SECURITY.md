# Security Policy

## Supported Versions

We provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**⚠️ IMPORTANT: Do NOT report security vulnerabilities publicly!**

If you discover a security vulnerability, please follow these steps:

1. **Email us directly** at: security@dosibridge.com
   - Include a detailed description of the vulnerability
   - Include steps to reproduce (if possible)
   - Include potential impact assessment

2. **Allow us time to respond**
   - We will acknowledge receipt within 48 hours
   - We will provide an estimated timeline for a fix
   - We will keep you informed of our progress

3. **Disclosure policy**
   - We will work with you to coordinate public disclosure
   - We will credit you as the discoverer (if you wish)
   - We will not disclose your information without permission

## Security Best Practices

### For Users

1. **Keep dependencies updated**
   ```bash
   # Backend
   pip install --upgrade -r requirements.txt
   
   # Frontend
   npm update
   ```

2. **Use strong SECRET_KEY**
   - Generate a secure key: `python -c "import secrets; print(secrets.token_hex(32))"`
   - Never commit `.env` files

3. **Configure CORS properly**
   - Only allow trusted origins
   - Don't use `*` in production

4. **Set appropriate rate limits**
   - Configure `RATE_LIMIT` in `.env`
   - Adjust based on your use case

5. **Use HTTPS in production**
   - Never transmit sensitive data over HTTP
   - Use proper SSL/TLS certificates

6. **Regular security audits**
   - Review dependencies for vulnerabilities
   - Use tools like `npm audit` and `safety check`

### For Developers

1. **Input Validation**
   - Always validate user input
   - Sanitize file uploads
   - Check file types and sizes

2. **Secure File Handling**
   - Use secure file paths
   - Validate file content, not just extensions
   - Implement proper file cleanup

3. **Session Management**
   - Use secure session IDs
   - Implement proper timeout
   - Clean up old sessions regularly

4. **Error Handling**
   - Don't expose sensitive information in errors
   - Log errors securely
   - Provide generic error messages to users

5. **Dependencies**
   - Keep dependencies updated
   - Review dependency security advisories
   - Use `requirements.txt` with version pinning

## Security Checklist

Before deploying to production:

- [ ] Change default `SECRET_KEY`
- [ ] Set `DEBUG=False`
- [ ] Configure proper `CORS_ORIGINS`
- [ ] Set appropriate `RATE_LIMIT`
- [ ] Use HTTPS
- [ ] Review and update dependencies
- [ ] Configure proper logging
- [ ] Set up file size limits
- [ ] Implement proper error handling
- [ ] Review security headers
- [ ] Set up monitoring and alerts

## Known Security Considerations

### File Upload Security

- Files are validated for type and size
- MIME type checking is implemented
- File content is validated, not just extensions
- Temporary files are cleaned up automatically

### CORS Configuration

- CORS is configurable via environment variables
- Default allows localhost for development
- Production should restrict to specific domains

### Rate Limiting

- Rate limiting is enabled by default
- Configurable per endpoint
- Prevents abuse and DoS attacks

### Session Management

- Sessions are automatically cleaned up
- Configurable timeout
- Secure session ID generation

## Security Updates

We will:
- Respond to security issues promptly
- Provide patches for supported versions
- Document security fixes in release notes
- Credit security researchers appropriately

## Contact

For security concerns: **security@dosibridge.com**

For general questions: **contact@dosibridge.com**

---

**Made with ❤️ by [DosiBridge](https://dosibridge.com)**

