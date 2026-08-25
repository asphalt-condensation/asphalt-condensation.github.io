import fs from "node:fs";
import path from "node:path";
import { parseHTML } from "linkedom";

const root = process.cwd();
const dist = path.join(root, "dist");
const errors = [];

function filesUnder(directory, extension) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return filesUnder(entryPath, extension);
    return entryPath.endsWith(extension) ? [entryPath] : [];
  });
}

function fail(file, message) {
  errors.push(`${path.relative(root, file)}: ${message}`);
}

function internalTargetExists(rawUrl) {
  const clean = rawUrl.split("#")[0].split("?")[0];
  if (!clean || !clean.startsWith("/")) return true;
  const relative = decodeURIComponent(clean).replace(/^\//, "");
  const candidates = [];
  if (clean.endsWith("/"))
    candidates.push(path.join(dist, relative, "index.html"));
  else {
    candidates.push(path.join(dist, relative));
    candidates.push(path.join(dist, relative, "index.html"));
  }
  return candidates.some((candidate) => fs.existsSync(candidate));
}

if (!fs.existsSync(dist)) {
  console.error("dist/ does not exist. Run npm run build first.");
  process.exit(1);
}

const htmlFiles = filesUnder(dist, ".html");
if (htmlFiles.length === 0) errors.push("dist contains no HTML files.");

const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const { document } = parseHTML(html);

  if (!document.documentElement.getAttribute("lang"))
    fail(file, "missing html lang attribute.");
  if (!document.title.trim()) fail(file, "missing document title.");
  if (
    !document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content")
      ?.trim()
  ) {
    fail(file, "missing meta description.");
  }
  const headings = document.querySelectorAll("h1");
  if (headings.length !== 1)
    fail(file, `expected one h1, found ${headings.length}.`);
  if (emailPattern.test(html)) fail(file, "contains a public email address.");

  for (const image of document.querySelectorAll("img")) {
    if (!image.hasAttribute("alt"))
      fail(file, `image '${image.getAttribute("src")}' is missing alt text.`);
  }

  for (const element of document.querySelectorAll("[href], [src]")) {
    const rawUrl =
      element.getAttribute("href") ?? element.getAttribute("src") ?? "";
    if (!internalTargetExists(rawUrl))
      fail(file, `broken internal reference '${rawUrl}'.`);
  }
}

if (errors.length > 0) {
  console.error(`Built-site validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated ${htmlFiles.length} built HTML page(s), metadata, images, and internal references.`,
);
