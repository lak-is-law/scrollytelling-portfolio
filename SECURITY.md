# Security Policy

Lakshya Agarwal Portfolio 2.0 takes security, data integrity, and responsible vulnerability disclosure seriously.

---

## 🛡️ Supported Versions

We actively maintain and provide security patches for the following versions:

| Version | Supported | Security Notes |
| :--- | :---: | :--- |
| `2.0.x` | ✅ Yes | Next.js 14 App Router, Edge Middleware, Strict CSP & Rate Limiting |
| `< 2.0.0` | ❌ No | Deprecated legacy builds |

---

## 🔒 Reporting a Vulnerability

If you discover a security vulnerability or potential exploit within this codebase or the live production deployment ([lakshya.uk](https://lakshya.uk)), please **do not open a public issue**.

### Disclosure Protocol

1. **Email Directly**: Send a detailed vulnerability report to **[contact@lakshya.uk](mailto:contact@lakshya.uk)** with the subject line: `[SECURITY VULNERABILITY] - Component Name`.
2. **Include Necessary Details**:
   - Step-by-step reproduction instructions.
   - Proof of Concept (PoC) scripts or curl commands.
   - Potential impact analysis (e.g. Rate limit bypass, XSS vector, header misconfiguration).
   - Recommended remediation steps if available.
3. **Response SLA**:
   - **Initial Acknowledgement**: Within 24 hours.
   - **Triage & Assessment**: Within 48 hours.
   - **Patch Deployment**: Within 5 business days depending on severity.

---

## 🛡️ Production Security Architecture

This repository enforces defense-in-depth security best practices across all layers:

1. **Strict Content Security Policy (CSP)**:
   - Configured via Next.js middleware with `default-src 'self'`.
   - Script, style, font, and connect origins restricted strictly to verified CDNs and APIs.
   - Anti-clickjacking headers (`X-Frame-Options: DENY`).
   - XSS audit filters (`X-Content-Type-Options: nosniff`).
   - Strict Referrer Policy (`strict-origin-when-cross-origin`).

2. **Edge Rate Limiting & Anti-Abuse**:
   - In-memory sliding-window token bucket tracking on sensitive endpoints (`/api/reward`).
   - Automated IP throttling preventing automated DDoS and mail flood abuse.

3. **Honeypot Bot Traps**:
   - Hidden decoy fields on form inputs silently trapping and discarding automated scrapers and bots without providing feedback.

4. **Environment Isolation**:
   - Production secrets (`RESEND_API_KEY`, etc.) are isolated strictly to server-side edge runtime and never exposed in client bundles (`NEXT_PUBLIC_` scoping strictly enforced).
