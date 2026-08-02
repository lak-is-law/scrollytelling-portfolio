const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processBranding() {
  const sourcePath = '/Users/lakshya/.gemini/antigravity/brain/f744ae60-6796-4000-820d-275a1431533e/.user_uploaded/media__1785668212336.jpg';
  
  // 1. Copy original source to public
  fs.copyFileSync(sourcePath, path.join(__dirname, '../public/logo.jpg'));
  
  // Read metadata
  const meta = await sharp(sourcePath).metadata();
  console.log('Source dimensions:', meta.width, 'x', meta.height);

  // 2. Trim whitespace to get the exact bounding box of the LK monogram + text
  // The background is near-white (>245). We trim with a threshold.
  const trimmedBuffer = await sharp(sourcePath)
    .trim({
      background: '#ffffff',
      threshold: 15
    })
    .png()
    .toBuffer();

  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  console.log('Trimmed logo dimensions:', trimmedMeta.width, 'x', trimmedMeta.height);

  // 3. Create a perfectly centered square on pure white background (#ffffff)
  // Calculate size to fit inside 1024x1024 with clean 12% padding (800x800 bounding box)
  const targetContentSize = 760;
  const resizedTrimmed = await sharp(trimmedBuffer)
    .resize(targetContentSize, targetContentSize, {
      fit: 'inside',
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .png()
    .toBuffer();

  const resizedTrimmedMeta = await sharp(resizedTrimmed).metadata();
  console.log('Resized trimmed dimensions:', resizedTrimmedMeta.width, 'x', resizedTrimmedMeta.height);

  const padX = Math.round((1024 - resizedTrimmedMeta.width) / 2);
  const padY = Math.round((1024 - resizedTrimmedMeta.height) / 2);

  // Perfectly centered 1024x1024 master logo on pure white background
  const masterWhiteLogo = await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([{
      input: resizedTrimmed,
      top: padY,
      left: padX
    }])
    .png()
    .toBuffer();

  // Save master white logo
  fs.writeFileSync(path.join(__dirname, '../public/logo.png'), masterWhiteLogo);
  fs.writeFileSync(path.join(__dirname, '../public/emblem.png'), masterWhiteLogo);
  fs.writeFileSync(path.join(__dirname, '../public/IMGL.png'), masterWhiteLogo);

  // 4. Generate all Favicons and PWA Icons on pure white background with black text
  // 16x16, 32x32, 48x48, favicon.ico
  await sharp(masterWhiteLogo).resize(16, 16).png().toFile(path.join(__dirname, '../public/favicon-16x16.png'));
  await sharp(masterWhiteLogo).resize(32, 32).png().toFile(path.join(__dirname, '../public/favicon-32x32.png'));
  await sharp(masterWhiteLogo).resize(48, 48).png().toFile(path.join(__dirname, '../public/favicon-48x48.png'));
  await sharp(masterWhiteLogo).resize(32, 32).png().toFile(path.join(__dirname, '../public/favicon.ico'));
  await sharp(masterWhiteLogo).resize(192, 192).png().toFile(path.join(__dirname, '../public/icon.png'));

  // Next.js App Router root icons in src/app/
  await sharp(masterWhiteLogo).resize(192, 192).png().toFile(path.join(__dirname, '../src/app/icon.png'));
  await sharp(masterWhiteLogo).resize(180, 180).png().toFile(path.join(__dirname, '../src/app/apple-icon.png'));

  // Mobile / PWA / Android icons
  await sharp(masterWhiteLogo).resize(180, 180).png().toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
  await sharp(masterWhiteLogo).resize(192, 192).png().toFile(path.join(__dirname, '../public/android-chrome-192x192.png'));
  await sharp(masterWhiteLogo).resize(512, 512).png().toFile(path.join(__dirname, '../public/android-chrome-512x512.png'));

  console.log('Successfully generated perfectly centered, original white bg & black text branding across all sizes!');
}

processBranding().catch(console.error);
