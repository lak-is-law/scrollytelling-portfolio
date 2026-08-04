# API Reference — Edge Endpoints

Portfolio 2.0 exposes a minimal, highly secure serverless edge API.

---

## 📡 `POST /api/reward`

Dispatches confidential recruiter dossiers upon successful completion of Developer Arcade mini-games.

### Endpoint Overview
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Rate Limit**: Max 3 requests per 10 minutes per IP address.
- **Runtime**: Next.js Edge Runtime.

### Request Body Schema

```json
{
  "email": "recruiter@company.com",
  "name": "Jane Doe",
  "company": "OpenAI",
  "honeypot": ""
}
```

| Field | Type | Required | Description |
| :--- | :---: | :---: | :--- |
| `email` | `string` | Yes | Valid email address to deliver the dossier. |
| `name` | `string` | Yes | Recruiter / visitor full name. |
| `company` | `string` | No | Organization / company name. |
| `honeypot` | `string` | No | Anti-bot decoy field. Must be empty for legitimate requests. |

---

### Response Codes

#### `200 OK` — Success
```json
{
  "success": true,
  "message": "Dossier transmission dispatched successfully."
}
```

#### `400 Bad Request` — Validation Error
```json
{
  "error": "Invalid email address format."
}
```

#### `429 Too Many Requests` — Rate Limit Exceeded
```json
{
  "error": "Rate limit exceeded. Please try again in 10 minutes."
}
```

#### `500 Internal Server Error` — Dispatch Failure
```json
{
  "error": "Failed to transmit dossier. Please contact contact@lakshya.uk directly."
}
```
