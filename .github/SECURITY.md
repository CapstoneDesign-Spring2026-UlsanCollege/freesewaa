# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.x     | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please send an email to:
- **Email:** swarnimkarki60@gmail.com

Please include:
1. Description of the vulnerability
2. Steps to reproduce the issue
3. Potential impact

## Security Best Practices

- **Authentication:** Use strong passwords for production
- **Database:** Connect to MongoDB/MySQL with proper credentials
- **Environment:** Never commit `.env` files or API keys
- **HTTPS:** Always use HTTPS in production

## Dependency Security

We recommend running security audits periodically:

```bash
npm audit
```

## Data Protection

- User passwords are stored (add hashing for production)
- Personal data is handled according to privacy best practices
- No sensitive data is logged in production mode