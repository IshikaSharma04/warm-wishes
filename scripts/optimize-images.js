/**
 * One-off maintenance script: shrink oversized product photography.
 *
 * The source PNGs in public/images were 2-3 MB each (~111 MB total), which
 * bloats the repo and slows down cold image optimisation. This converts any
 * image over 150 KB to WebP capped at 1400px wide, rewrites the code
 * references, and deletes the originals.
 *
 * Run:  node scripts/optimize-images.js
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const MIN_BYTES = 150 * 1024; // leave already-small files alone
const MAX_WIDTH = 1400; // covers the widest layout (2x of ~700px hero)
const QUALITY = 82;

const ROOT = path.join(__dirname, "..");
const IMAGES = path.join(ROOT, "public", "images");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(png|jpe?g)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

(async () => {
  const files = walk(IMAGES);
  const rewritten = [];
  let before = 0;
  let after = 0;

  for (const file of files) {
    const size = fs.statSync(file).size;
    if (size < MIN_BYTES) {
      before += size;
      after += size;
      continue;
    }

    const rel = path.relative(ROOT, file); // public/images/...
    const out = file.replace(/\.(png|jpe?g)$/i, ".webp");

    const buf = await sharp(file)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toBuffer();

    fs.writeFileSync(out, buf);
    fs.unlinkSync(file);

    rewritten.push({
      from: rel,
      to: path.relative(ROOT, out),
      fromKB: Math.round(size / 1024),
      toKB: Math.round(buf.length / 1024),
    });

    before += size;
    after += buf.length;
  }

  // Point the code at the new .webp paths.
  for (const { from, to } of rewritten) {
    const oldPath = "/" + from.replace(/^public\//, "");
    const newPath = "/" + to.replace(/^public\//, "");
    const grep = `grep -rl -- ${JSON.stringify(oldPath)} src`;
    let filesWithRef = "";
    try {
      filesWithRef = execSync(grep, { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] })
        .toString()
        .trim();
    } catch {
      continue; // no references
    }
    for (const f of filesWithRef.split("\n").filter(Boolean)) {
      const src = fs.readFileSync(path.join(ROOT, f), "utf8");
      fs.writeFileSync(
        path.join(ROOT, f),
        src.split(oldPath).join(newPath)
      );
    }
  }

  const mb = (n) => (n / 1048576).toFixed(1) + " MB";
  console.log(`converted ${rewritten.length} image(s)`);
  console.log(`${mb(before)} -> ${mb(after)}  (${(100 - (100 * after) / before).toFixed(0)}% smaller)`);
  for (const r of rewritten) {
    console.log(`  ${r.fromKB}KB -> ${r.toKB}KB  ${r.to}`);
  }
})();
