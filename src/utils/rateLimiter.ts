/**
 * Sliding Window In-Memory IP Rate Limiter
 * Limits requests per client identifier over a given timeframe window.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically (every 10 minutes)
const CLEANUP_INTERVAL = 10 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStaleRecords(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  rateLimitMap.forEach((record, ip) => {
    const validTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);
    if (validTimestamps.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      record.timestamps = validTimestamps;
    }
  });
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTimeMs: number;
}

export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): RateLimitResult {
  const now = Date.now();
  cleanupStaleRecords(windowMs);

  const record = rateLimitMap.get(identifier) || { timestamps: [] };
  
  // Filter out timestamps outside the current sliding window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limit) {
    const oldestTimestamp = record.timestamps[0];
    const resetTimeMs = oldestTimestamp + windowMs;
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetTimeMs,
    };
  }

  // Record this request
  record.timestamps.push(now);
  rateLimitMap.set(identifier, record);

  const resetTimeMs = record.timestamps[0] + windowMs;
  return {
    allowed: true,
    limit,
    remaining: Math.max(0, limit - record.timestamps.length),
    resetTimeMs,
  };
}
