import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const host = "127.0.0.1";
const port = 4321;

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
]);

function resolveRequest(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const normalized = path.posix.normalize(decoded).replace(/^\/+/, "");
  if (normalized.startsWith("..")) return null;

  const direct = path.join(dist, normalized);
  const candidates = decoded.endsWith("/")
    ? [path.join(direct, "index.html")]
    : [direct, path.join(direct, "index.html")];

  return candidates.find((candidate) => {
    try {
      return fs.statSync(candidate).isFile();
    } catch {
      return false;
    }
  });
}

const server = http.createServer((request, response) => {
  const requested = resolveRequest(request.url ?? "/");
  const file = requested ?? path.join(dist, "404.html");
  const status = requested ? 200 : 404;

  fs.readFile(file, (error, body) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Unable to read the built site.");
      return;
    }

    response.writeHead(status, {
      "Cache-Control": "no-store",
      "Content-Type":
        contentTypes.get(path.extname(file)) ?? "application/octet-stream",
    });
    response.end(body);
  });
});

server.listen(port, host, () => {
  console.log(`Serving dist at http://${host}:${port}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
