const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processBranding() {
  const sourcePath = '/Users/lakshya/.gemini/antigravity/brain/f744ae60-6796-4000-820d-275a1431533e/.user_uploaded/media__1785668212336.jpg';
  
  // 1. Copy raw original source to public
  fs.copyFileSync(sourcePath, path.join(__dirname, '../public/logo.jpg'));
  
  // 2. High-res Master 1024x1024 PNG from original centered image
  // High quality lanczos3 scaling on pure white background
  const master1024 = await sharp(sourcePath)
    .resize(1024, 1024, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
      kernel: 'lanczos3'
    })
    .png({ quality: 100 })
    .toBuffer();

  fs.writeFileSync(path.join(__dirname, '../public/logo.png'), master1024);
  fs.writeFileSync(path.join(__dirname, '../public/emblem.png'), master1024);
  fs.writeFileSync(path.join(__dirname, '../public/IMGL.png'), master1024);

  // 3. Generate all Favicon & PWA App sizes
  // Favicons: 16x16, 32x32, 48x48, favicon.ico
  await sharp(master1024).resize(16, 16, { kernel: 'lanczos3' }).png().toFile(path.join(__dirname, '../public/favicon-16x16.png'));
  await sharp(master1024).resize(32, 32, { kernel: 'lanczos3' }).png().toFile(path.join(__dirname, '../public/favicon-32x32.png'));
  await sharp(master1024).resize(48, 48, { kernel: 'lanczos3' }).png().toFile(path.join(__dirname, '../public/favicon-48x48.png'));
  await sharp(master1024).resize(32, 32, { kernel: 'lanczos3' }).png().toFile(path.join(__dirname, '../public/favicon.ico'));
  await sharp(master1024).resize(192, 192, { kernel: 'lanczos3' }).png().toFile(path.join(__dirname, '../public/icon.png'));

  // Next.js App Router root icons
  await sharp(master1024).resize(192, 192, { kernel: 'lanczos3' }).png().toFile(path.join(__dirname, '../src/app/icon.png'));
  await sharp(master1024).resize(180, 180, { kernel: 'lanczos3' }).png().toFile(path.join(__dirname, '../src/app/apple-icon.png'));

  // PWA / iOS / Android touch icons
  await sharp(master1024).resize(180, 180, { kernel: 'lanczos3' }).png().toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
  await sharp(master1024).resize(192, 192, { kernel: 'lanczos3' }).png().toFile(path.join(__dirname, '../public/android-chrome-192x192.png'));
  await sharp(master1024).resize(512, 512, { kernel: 'lanczos3' }).png().toFile(path.join(__dirname, '../public/android-chrome-512x512.png'));

  console.log('All branding assets, favicons, and PWA icons generated with original centered justification!');
}

processBranding().catch(console.error);
