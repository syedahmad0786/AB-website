import sharp from "sharp";
import { readdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const IMAGE_DIRS = [
  "public/images/portfolio",
  "public/images/blog",
];

const STANDALONE_IMAGES = [
  "public/images/ahmad-bukhari.jpg",
];

async function generateBlurDataURL(filePath) {
  const buffer = await sharp(filePath)
    .resize(10) // 10px wide, auto height
    .jpeg({ quality: 20 })
    .toBuffer();
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

async function main() {
  const results = {};

  for (const dir of IMAGE_DIRS) {
    const fullDir = path.join(ROOT, dir);
    const files = await readdir(fullDir);
    for (const file of files) {
      if (/\.(png|jpg|jpeg|webp)$/i.test(file)) {
        const filePath = path.join(fullDir, file);
        const key = "/" + dir.replace(/^public\//, "") + "/" + file;
        results[key] = await generateBlurDataURL(filePath);
        console.log(`Generated blur for: ${key}`);
      }
    }
  }

  for (const file of STANDALONE_IMAGES) {
    const filePath = path.join(ROOT, file);
    const key = "/" + file.replace(/^public\//, "");
    results[key] = await generateBlurDataURL(filePath);
    console.log(`Generated blur for: ${key}`);
  }

  const outputPath = path.join(__dirname, "blur-data.json");
  await writeFile(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nDone! Generated ${Object.keys(results).length} blur placeholders.`);
  console.log(`Output: ${outputPath}`);
}

main().catch(console.error);
