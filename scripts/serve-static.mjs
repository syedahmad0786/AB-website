import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve } from "node:path";

const root = resolve(new URL("../dist", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const port = Number(process.env.PORT || 3000);
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8"
};

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const clean = pathname === "/" ? "/index.html" : pathname;
  const candidates = [clean, `${clean}.html`, `${clean}/index.html`];
  let file;
  for (const candidate of candidates) {
    const target = resolve(root, `.${candidate}`);
    if (!target.startsWith(root)) continue;
    try {
      if ((await stat(target)).isFile()) { file = target; break; }
    } catch {}
  }
  if (!file) {
    file = resolve(root, "404.html");
    response.statusCode = 404;
  }
  response.setHeader("Content-Type", types[extname(file)] || "application/octet-stream");
  response.end(await readFile(file));
}).listen(port, () => console.log(`Static site running at http://localhost:${port}`));
