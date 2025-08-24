# Security Guide for Parentlytics

## Overview
This document outlines the security measures implemented to protect against XSS attacks, SQL injection, and other vulnerabilities.

## 🛡️ Security Threats Addressed

### 1. Cross-Site Scripting (XSS)
- **Threat**: Malicious scripts injected through user input
- **Solution**: HTML sanitization and SafeText components
- **Implementation**: `sanitizeHtml()` function removes dangerous tags

### 2. SQL Injection
- **Threat**: Malicious SQL code injected through form inputs
- **Solution**: Input sanitization and parameterized queries
- **Implementation**: `sanitizeDatabaseInput()` function

### 3. Input Validation
- **Threat**: Invalid or malicious data submitted through forms
- **Solution**: Comprehensive validation rules
- **Implementation**: Validation functions for each data type

### 4. Rate Limiting
- **Threat**: Brute force attacks and spam
- **Solution**: Rate limiting on form submissions
- **Implementation**: `RateLimiter` class

## 🔧 Security Components

### 1. Validation System (`lib/validation.ts`)

#### HTML Sanitization
```typescript
export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
};
```

#### Database Input Sanitization
```typescript
export const sanitizeDatabaseInput = (input: string): string => {
  return input
    .replace(/['";\\]/g, '')
    .replace(/--/g, '')
    .replace(/union\s+select/gi, '')
    .replace(/drop\s+table/gi, '')
    .trim();
};
```

#### Password Strength Validation
```typescript
export const validatePasswordStrength = (password: string) => {
  // Checks: length, uppercase, lowercase, numbers, special chars, common patterns
  // Returns: isValid, score, feedback
};
```

### 2. Safe Text Components (`components/SafeText.tsx`)

#### SafeText Component
```typescript
<SafeText 
  content={userInput} 
  tag="div" 
  allowHtml={false} 
  maxLength={100}
/>
```

#### Specialized Components
- `SafeHeading` - Safe headings with level control
- `SafeParagraph` - Safe paragraph text
- `SafeSpan` - Safe inline text

### 3. Safe Form Component (`components/SafeForm.tsx`)

#### Built-in Security Features
- Input sanitization
- Form validation
- Rate limiting
- Error handling

#### Usage
```typescript
<SafeForm
  type="registration"
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  initialData={data}
/>
```

## 📝 Validation Rules

### Registration Form
- **Name**: 2-50 characters, letters only
- **Email**: Valid email format
- **Password**: 8+ chars, uppercase, lowercase, number, special char
- **Confirm Password**: Must match password

### Child Profile Form
- **Name**: 2-50 characters, letters only
- **Birth Date**: Valid date, not in future, not too old
- **Weight**: 0.1-200 kg
- **Height**: 10-300 cm
- **Allergies**: 1-100 characters each
- **Health Concerns**: 0-500 characters

## 🚫 Security Restrictions

### HTML Tags Blocked
- `<script>`, `<iframe>`, `<object>`, `<embed>`
- `<link>`, `<meta>`, `<style>`
- All other HTML tags (when `allowHtml={false}`)

### JavaScript Events Blocked
- `onclick`, `onload`, `onsubmit`, etc.
- `javascript:` protocol
- Event handlers in attributes

### SQL Patterns Blocked
- `--` (comments)
- `/* */` (block comments)
- `UNION SELECT`, `DROP TABLE`, `DELETE FROM`
- Quotes, semicolons, backslashes

## 🚦 Rate Limiting

### Configuration
- **Max Attempts**: 5 per window
- **Window**: 15 minutes
- **Scope**: Per user identifier (email/IP)

### Implementation
```typescript
const rateLimiter = new RateLimiter(5, 15 * 60 * 1000);
if (!rateLimiter.isAllowed(userIdentifier)) {
  // Block request
}
```

## 🔍 Input Sanitization Process

### 1. Client-Side Sanitization
- Immediate sanitization on input change
- Real-time validation feedback
- Length restrictions

### 2. Server-Side Sanitization
- Double-check all inputs
- Database query sanitization
- Output encoding

### 3. Display Sanitization
- SafeText components for output
- HTML entity encoding
- Content Security Policy (CSP)

## 🧪 Testing Security

### XSS Testing
```javascript
// Test payloads (should be sanitized)
<script>alert('xss')</script>
<img src="x" onerror="alert('xss')">
javascript:alert('xss')
```

### SQL Injection Testing
```sql
-- Test payloads (should be blocked)
'; DROP TABLE users; --
' UNION SELECT * FROM users --
```

### Input Validation Testing
- Empty values
- Extremely long strings
- Special characters
- Unicode characters
- SQL keywords

## 📋 Best Practices

### 1. Always Use Safe Components
```typescript
// ❌ Dangerous
<div>{userInput}</div>

// ✅ Safe
<SafeText content={userInput} tag="div" />
```

### 2. Validate All Inputs
```typescript
// ❌ No validation
const data = req.body;

// ✅ With validation
const data = validateRegistrationForm(req.body);
if (!data.isValid) return res.status(400).json(data.errors);
```

### 3. Sanitize Before Storage
```typescript
// ❌ Raw input
await saveToDatabase(userInput);

// ✅ Sanitized input
const sanitized = sanitizeFormInput(userInput, 'text');
await saveToDatabase(sanitized);
```

### 4. Use Rate Limiting
```typescript
// ❌ No rate limiting
app.post('/login', handleLogin);

// ✅ With rate limiting
app.post('/login', rateLimiter, handleLogin);
```

## 🚨 Security Headers

### Recommended Headers
```http
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 🔐 Authentication Security

### Session Management
- Secure session tokens
- Token expiration
- Secure cookie settings
- CSRF protection

### Password Security
- Strong password requirements
- Password hashing (bcrypt)
- Account lockout after failed attempts
- Password change requirements

## 📊 Security Monitoring

### Logging
- Failed authentication attempts
- Input validation failures
- Rate limit violations
- Suspicious patterns

### Alerts
- Multiple failed logins
- Unusual input patterns
- Rate limit exceeded
- Security policy violations

## 🆘 Incident Response

### 1. Immediate Actions
- Block suspicious IPs
- Reset affected accounts
- Review logs for scope
- Notify security team

### 2. Investigation
- Analyze attack vectors
- Review affected data
- Identify vulnerabilities
- Document incident

### 3. Recovery
- Patch vulnerabilities
- Restore from backups
- Update security measures
- User communication

## 🔮 Future Security Enhancements

### Planned Features
1. **Two-Factor Authentication (2FA)**
2. **Advanced Threat Detection**
3. **Behavioral Analysis**
4. **Automated Security Testing**
5. **Security Score Dashboard**

### Ongoing Improvements
- Regular security audits
- Dependency vulnerability scanning
- Penetration testing
- Security training for developers

---

**Remember**: Security is an ongoing process, not a one-time implementation. Regular reviews and updates are essential to maintain protection against evolving threats. 