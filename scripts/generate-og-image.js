const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateCleanOg() {
  const sourcePath = path.join(__dirname, '../public/logo.jpg');
  const width = 1200;
  const height = 630;

  // 1. Create 1200x630 canvas with pure white background, logo perfectly centered
  // Resize source logo to fit nicely in 1200x630 (e.g. max height 540)
  const logoResized = await sharp(sourcePath)
    .resize(null, 540, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
      kernel: 'lanczos3'
    })
    .toBuffer();

  const og1200x630 = await sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([
      {
        input: logoResized,
        gravity: 'center'
      }
    ])
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  // Save to public
  fs.writeFileSync(path.join(__dirname, '../public/og-image.png'), og1200x630);
  
  // Also save a lightweight JPG version (<100KB for ultra-fast WhatsApp preview)
  const ogJpg = await sharp(og1200x630)
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync(path.join(__dirname, '../public/og-image.jpg'), ogJpg);

  // Convert centered logo to base64 for opengraph-image.tsx
  const logoBase64 = `data:image/png;base64,${(await sharp(sourcePath).resize(null, 520, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).png({ quality: 90 }).toBuffer()).toString('base64')}`;

  // Update opengraph-image.tsx with clean white background and pure logo
  const opengraphTsxContent = `import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lakshya Agarwal";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const LOGO_BASE64 = "${logoBase64}";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <img
          src={LOGO_BASE64}
          alt="Lakshya Agarwal"
          style={{
            height: "520px",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
`;

  fs.writeFileSync(path.join(__dirname, '../src/app/opengraph-image.tsx'), opengraphTsxContent);
  console.log('Successfully generated clean logo 1200x630 OG image and updated opengraph-image.tsx!');
}

generateCleanOg().catch(console.error);
