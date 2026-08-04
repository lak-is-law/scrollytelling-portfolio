import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lakshya Agarwal | Creative AI Engineer & Full Stack Architect";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#07090e",
          backgroundImage:
            "radial-gradient(circle at 15% 25%, rgba(6, 182, 212, 0.22) 0%, transparent 45%), radial-gradient(circle at 85% 75%, rgba(139, 92, 246, 0.2) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.8) 0%, transparent 100%)",
          padding: "54px 64px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "white",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Subtle Tech Grid / Outer Frame */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            pointerEvents: "none",
          }}
        />

        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 18px",
              backgroundColor: "rgba(6, 182, 212, 0.12)",
              border: "1px solid rgba(34, 211, 238, 0.35)",
              borderRadius: "9999px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#22d3ee",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "#22d3ee",
                textTransform: "uppercase",
              }}
            >
              Creative AI Engineer
            </span>
          </div>

          {/* Right Live Indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "9999px",
              fontSize: "13px",
              color: "#94a3b8",
            }}
          >
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "9999px",
                backgroundColor: "#10b981",
              }}
            />
            <span>lakshya.uk</span>
          </div>
        </div>

        {/* Middle Main Content */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 1,
            gap: "40px",
          }}
        >
          {/* Left Column: Typography */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <h1
              style={{
                fontSize: "64px",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                margin: "0 0 12px 0",
                lineHeight: 1.05,
                color: "#ffffff",
              }}
            >
              Lakshya Agarwal
            </h1>

            <p
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#38bdf8",
                margin: "0 0 16px 0",
                letterSpacing: "-0.01em",
              }}
            >
              Full Stack Architect &amp; Interactive AI Developer
            </p>

            <p
              style={{
                fontSize: "17px",
                lineHeight: 1.45,
                color: "#94a3b8",
                margin: 0,
                maxWidth: "680px",
              }}
            >
              High-end scrollytelling experience, neural AI pipelines, real-time Web Audio, and precision-engineered interactive systems.
            </p>
          </div>

          {/* Right Column: Branded Monogram Card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "210px",
              height: "210px",
              borderRadius: "24px",
              backgroundColor: "rgba(10, 15, 29, 0.9)",
              border: "1.5px solid rgba(34, 211, 238, 0.3)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(6, 182, 212, 0.2)",
              position: "relative",
            }}
          >
            {/* LK Monogram Typography Graphic */}
            <div
              style={{
                fontSize: "68px",
                fontWeight: 900,
                letterSpacing: "-0.05em",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              LK
            </div>
            <div
              style={{
                marginTop: "8px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "#38bdf8",
                textTransform: "uppercase",
              }}
            >
              PORTFOLIO
            </div>
          </div>
        </div>

        {/* Bottom Bar: Tech Stack Tags & Domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            zIndex: 1,
          }}
        >
          {/* Tech Badges */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {["Next.js 14", "Scrollytelling", "Deep Learning", "Web Audio API", "TypeScript"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "6px 14px",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#e2e8f0",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>

          {/* Action Link */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "15px",
              fontWeight: 600,
              color: "#38bdf8",
            }}
          >
            <span>Explore Experience</span>
            <span style={{ fontSize: "18px" }}>→</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
