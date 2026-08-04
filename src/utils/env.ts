/**
 * Environment Configuration and Validation Utility
 */

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  RESEND_API_KEY: process.env.RESEND_API_KEY || "",
  CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@lakshya.uk",
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://lakshya.uk",
};
