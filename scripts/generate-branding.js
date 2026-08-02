const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processBranding() {
  const sourcePath = '/Users/lakshya/.gemini/antigravity/brain/f744ae60-6796-4000-820d-275a1431533e/.user_uploaded/media__1785668212336.jpg';
  
  // 1. Copy original source to public
  fs.copyFileSync(sourcePath, path.join(__dirname, '../public/logo.jpg'));
  
  // Read source metadata
  const meta = await sharp(sourcePath).metadata();
  console.log('Source image dimensions:', meta.width, 'x', meta.height);

  // Create a high-res PNG version with transparent background
  // The background is near-white (RGB > 240). We can threshold or keep it crisp.
  // In addition, create a dark-themed version (white logo on black/transparent background) for dark mode web UI & favicon
  
  // 2. High-res base logo (clean square)
  const baseLogoBuffer = await sharp(sourcePath)
    .resize(1024, 1024, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(__dirname, '../public/logo.png'), baseLogoBuffer);

  // 3. Create transparent version by extracting black/dark ink
  // Since the logo is pure black on white, we can invert or mask to get:
  // (a) Black ink on transparent background
  // (b) White ink on transparent background (for dark themes / navbar / loading screen)
  // (c) Elegant dark badge (black square #09090b with white LK logo, with 15% inner padding)
  // (d) Elegant light badge (white square with black LK logo, with 15% inner padding)

  // High-res Dark Emblem (Black background with white logo & padding):
  // Let's invert the grayscale image so white background becomes black, and black logo becomes white:
  const invertedWhiteLogo = await sharp(sourcePath)
    .negate({ alpha: false })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(__dirname, '../public/logo-white.png'), invertedWhiteLogo);

  // Padded Square Badge (1024x1024, #09090b background, centered crisp white logo with 18% padding):
  const paddedEmblemBuffer = await sharp(invertedWhiteLogo)
    .resize(800, 800, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 112,
      bottom: 112,
      left: 112,
      right: 112,
      background: { r: 9, g: 9, b: 11, alpha: 1 } // #09090b matches the portfolio dark theme!
    })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(__dirname, '../public/emblem.png'), paddedEmblemBuffer);

  // Padded Light Square Badge (for light contexts):
  const paddedLightEmblemBuffer = await sharp(sourcePath)
    .resize(800, 800, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .extend({
      top: 112,
      bottom: 112,
      left: 112,
      right: 112,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(__dirname, '../public/emblem-light.png'), paddedLightEmblemBuffer);

  // 4. Generate all Favicon & PWA App sizes
  // Favicons:
  await sharp(paddedEmblemBuffer).resize(16, 16).png().toFile(path.join(__dirname, '../public/favicon-16x16.png'));
  await sharp(paddedEmblemBuffer).resize(32, 32).png().toFile(path.join(__dirname, '../public/favicon-32x32.png'));
  await sharp(paddedEmblemBuffer).resize(48, 48).png().toFile(path.join(__dirname, '../public/favicon-48x48.png'));
  await sharp(paddedEmblemBuffer).resize(32, 32).png().toFile(path.join(__dirname, '../public/favicon.ico'));
  await sharp(paddedEmblemBuffer).resize(192, 192).png().toFile(path.join(__dirname, '../public/icon.png'));

  // Next.js App Router root icons
  await sharp(paddedEmblemBuffer).resize(192, 192).png().toFile(path.join(__dirname, '../src/app/icon.png'));
  await sharp(paddedEmblemBuffer).resize(180, 180).png().toFile(path.join(__dirname, '../src/app/apple-icon.png'));

  // PWA / iOS / Android touch icons
  await sharp(paddedEmblemBuffer).resize(180, 180).png().toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
  await sharp(paddedEmblemBuffer).resize(192, 192).png().toFile(path.join(__dirname, '../public/android-chrome-192x192.png'));
  await sharp(paddedEmblemBuffer).resize(512, 512).png().toFile(path.join(__dirname, '../public/android-chrome-512x512.png'));

  // Also replace any IMGL.png placeholder in public
  fs.copyFileSync(path.join(__dirname, '../public/android-chrome-512x512.png'), path.join(__dirname, '../public/IMGL.png'));

  console.log('All branding assets, favicons, PWA icons, and emblems generated successfully!');
}

processBranding().catch(console.error);
