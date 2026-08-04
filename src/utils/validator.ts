/**
 * Schema Validation Utility for API Requests
 */

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export interface ValidatedRewardRequest {
  email: string;
  badgesUnlocked: string[];
  gameScore: number;
}

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export function validateRewardPayload(body: unknown): ValidationResult<ValidatedRewardRequest> {
  if (!body || typeof body !== "object") {
    return { success: false, error: "Malformed request body. JSON object expected." };
  }

  const record = body as Record<string, unknown>;

  // Honeypot bot protection
  if (record.honeypot && typeof record.honeypot === "string" && record.honeypot.trim().length > 0) {
    return { success: false, error: "Automated submission rejected." };
  }

  const { email, badgesUnlocked, gameScore } = record;

  // Validate Email
  if (!email || typeof email !== "string") {
    return { success: false, error: "A valid email address is required." };
  }

  const sanitizedEmail = email.trim().toLowerCase();
  if (sanitizedEmail.length > 254 || !EMAIL_REGEX.test(sanitizedEmail)) {
    return { success: false, error: "Invalid email format. Please provide a standard email address." };
  }

  // Validate Badges (optional array of strings)
  let cleanBadges: string[] = [];
  if (badgesUnlocked !== undefined) {
    if (!Array.isArray(badgesUnlocked)) {
      return { success: false, error: "badgesUnlocked must be an array of strings." };
    }
    cleanBadges = (badgesUnlocked as unknown[])
      .filter((b): b is string => typeof b === "string" && b.trim().length > 0)
      .map((b) => b.trim().slice(0, 50))
      .slice(0, 20); // Cap at 20 badges max
  }

  // Validate Game Score (optional number)
  let cleanScore = 0;
  if (gameScore !== undefined) {
    if (typeof gameScore !== "number" || isNaN(gameScore) || gameScore < 0 || gameScore > 1000000) {
      return { success: false, error: "gameScore must be a positive integer." };
    }
    cleanScore = Math.floor(gameScore);
  }

  return {
    success: true,
    data: {
      email: sanitizedEmail,
      badgesUnlocked: cleanBadges.length > 0 ? cleanBadges : ["Developer Vault Explorer"],
      gameScore: cleanScore,
    },
  };
}
