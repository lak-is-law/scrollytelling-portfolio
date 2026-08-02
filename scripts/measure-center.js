const sharp = require('sharp');

async function measure() {
  const sourcePath = '/Users/lakshya/.gemini/antigravity/brain/f744ae60-6796-4000-820d-275a1431533e/.user_uploaded/media__1785668212336.jpg';
  const { data, info } = await sharp(sourcePath).raw().toBuffer({ resolveWithObject: true });
  
  console.log(`Image size: ${info.width}x${info.height}`);

  // Let's inspect the underline near Y=660-680
  for (let y = 600; y < 700; y++) {
    let minX = info.width, maxX = 0, count = 0;
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      if ((data[idx] + data[idx+1] + data[idx+2])/3 < 128) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        count++;
      }
    }
    if (count > 50) {
      console.log(`Row Y=${y}: count=${count}, X=[${minX}, ${maxX}], Center X=${(minX + maxX)/2}`);
    }
  }

  // Let's inspect LAKSHYA text around Y=700-740
  for (let y = 700; y < 745; y++) {
    let minX = info.width, maxX = 0, count = 0;
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      if ((data[idx] + data[idx+1] + data[idx+2])/3 < 128) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        count++;
      }
    }
    if (count > 10) {
      console.log(`Text Row Y=${y}: count=${count}, X=[${minX}, ${maxX}], Center X=${(minX + maxX)/2}`);
    }
  }
}

measure().catch(console.error);
