# Security Architecture & Threat Model

This document outlines the defense-in-depth security model implemented in **Portfolio 2.0**.

---

## 🛡️ Threat Model & Mitigations

### 1. Cross-Site Scripting (XSS) & Code Injection
- **Risk**: Malicious scripts executed via client-side inputs or external dependencies.
- **Mitigation**:
  - Strict Content Security Policy (CSP) headers applied on all responses via Next.js Middleware.
  - Zero `eval()` or un-sanitized `dangerouslySetInnerHTML` usage.
  - React 18 automatic JSX output escaping.

### 2. Clickjacking & UI Redress Attacks
- **Risk**: Framing the application inside malicious iframes to hijack user clicks.
- **Mitigation**:
  - `X-Frame-Options: DENY` header.
  - CSP `frame-ancestors 'none'` directive.

### 3. API Abuse, DDoS & Mail Flood on `/api/reward`
- **Risk**: Automated bots spamming the dossier reward endpoint to deplete email quotas or flood recruiter inboxes.
- **Mitigation**:
  - **In-Memory Sliding-Window Rate Limiting**: Enforces a strict threshold of 3 requests per 10-minute window per IP.
  - **Silent Honeypot Trap**: Invisible decoy input fields that, when filled by automated scraping bots, silently discard the request and return a fake `200 OK` success response without executing backend delivery.

---

## 🔒 HTTP Security Headers Configuration

All responses served from Next.js Edge Middleware include the following headers:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data: https:; img-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'none';
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```
