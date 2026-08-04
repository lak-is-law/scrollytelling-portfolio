import { NextResponse, NextRequest } from "next/server";
import { checkRateLimit } from "@/utils/rateLimiter";
import { validateRewardPayload } from "@/utils/validator";
import { env } from "@/utils/env";

export async function POST(req: NextRequest) {
  try {
    // 1. Extract client IP for rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = (forwardedFor ? forwardedFor.split(",")[0] : realIp) || "127.0.0.1";

    // 2. Enforce Rate Limiting (5 submissions per 15 minutes per IP)
    const rateLimit = checkRateLimit(clientIp, 5, 15 * 60 * 1000);

    const headers = {
      "X-RateLimit-Limit": rateLimit.limit.toString(),
      "X-RateLimit-Remaining": rateLimit.remaining.toString(),
      "X-RateLimit-Reset": Math.ceil(rateLimit.resetTimeMs / 1000).toString(),
    };

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait a few minutes before requesting another reward dossier.",
          retryAfterSeconds: Math.ceil((rateLimit.resetTimeMs - Date.now()) / 1000),
        },
        { status: 429, headers }
      );
    }

    // 3. Parse JSON Body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON format in request body." },
        { status: 400, headers }
      );
    }

    // 4. Validate and Sanitize Payload
    const validation = validateRewardPayload(body);
    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: validation.error || "Invalid request payload." },
        { status: 400, headers }
      );
    }

    const { email, badgesUnlocked, gameScore } = validation.data;

    // 5. Construct Secret Developer Vault Dossier
    const payload = {
      recipient: email,
      achievements: badgesUnlocked,
      score: gameScore,
      downloadUrl: "/Resume.pdf",
      secretCode: "VIP-AI-LAKSHYA-2026",
      developerNotes: "You unlocked the developer vault in Lakshya Agarwal's portfolio. Specializing in high-performance AI systems, WebGL canvas mechanics, and full-stack distributed systems.",
      directContact: "mailto:contact@lakshya.uk?subject=Found%20Your%20Hidden%20Arcade%20Vault%20-%20Let's%20Talk",
      dispatchedAt: new Date().toISOString(),
    };

    // 6. Optional Transactional Email Delivery via Resend
    if (env.RESEND_API_KEY) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Lakshya Agarwal <contact@lakshya.uk>",
            to: [email],
            subject: "🎖️ Unlocked: Lakshya Agarwal Developer Vault Dossier",
            html: `
              <div style="font-family: monospace; background: #07090e; color: #ffffff; padding: 32px; border-radius: 12px; border: 1px solid rgba(6,182,212,0.3);">
                <h2 style="color: #06b6d4; margin-bottom: 16px;">// ARCADE VAULT DOSSIER UNLOCKED</h2>
                <p style="color: #a1a1aa; font-size: 14px;">Greetings,</p>
                <p style="color: #e4e4e7; font-size: 14px; line-height: 1.6;">
                  Congratulations on conquering the arcade minigames. Here are your verified access credentials:
                </p>
                <ul style="color: #10b981; font-size: 14px;">
                  <li><strong>Player Score:</strong> ${gameScore} PTS</li>
                  <li><strong>Unlocked Badges:</strong> ${badgesUnlocked.join(", ")}</li>
                  <li><strong>Secret Code:</strong> <code>VIP-AI-LAKSHYA-2026</code></li>
                </ul>
                <div style="margin-top: 24px;">
                  <a href="https://lakshya.uk/Resume.pdf" style="display: inline-block; background: #06b6d4; color: #000000; font-weight: bold; padding: 12px 24px; border-radius: 9999px; text-decoration: none;">Download Verified Resume (PDF)</a>
                </div>
                <p style="margin-top: 32px; font-size: 12px; color: #71717a;">
                  Direct channel: <a href="mailto:contact@lakshya.uk" style="color: #06b6d4;">contact@lakshya.uk</a>
                </p>
              </div>
            `,
          }),
        });

        if (!emailResponse.ok) {
          console.warn("Transactional email dispatch warning:", await emailResponse.text());
        }
      } catch (emailErr) {
        console.warn("Failed to dispatch email via Resend:", emailErr);
      }
    }

    // 7. Return Successful Response with Dossier Payload
    return NextResponse.json(
      {
        success: true,
        message: "Developer Vault Dossier dispatched successfully.",
        payload,
      },
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Reward API Internal Error:", err);
    return NextResponse.json(
      { error: "Internal server error processing reward dispatch." },
      { status: 500 }
    );
  }
}
