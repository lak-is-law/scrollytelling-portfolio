import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, badgesUnlocked, gameScore } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address provided." },
        { status: 400 }
      );
    }

    // Return structured reward dossier
    return NextResponse.json({
      success: true,
      message: "Developer Vault Dossier dispatched successfully.",
      payload: {
        recipient: email,
        achievements: badgesUnlocked || ["Football Champion", "AI Architect", "System Breacher"],
        score: gameScore || 15,
        downloadUrl: "/Resume.pdf",
        secretCode: "VIP-AI-LAKSHYA-2026",
        developerNotes: "You bypassed the standard portfolio surface and mastered the arcade. Lakshya builds high-performance AI engines, interactive WebGL/canvas systems, and full-stack software. Let's build something exceptional together.",
        directContact: "mailto:contact@lakshya.uk?subject=Found%20Your%20Hidden%20Arcade%20Vault%20-%20Let's%20Talk"
      }
    });
  } catch (err) {
    console.error("Reward API Error:", err);
    return NextResponse.json(
      { error: "Internal server error processing reward dispatch." },
      { status: 500 }
    );
  }
}
