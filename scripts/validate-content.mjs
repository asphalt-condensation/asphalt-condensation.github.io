import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const errors = [];

function filesUnder(directory, extension) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return filesUnder(entryPath, extension);
    return entryPath.endsWith(extension) ? [entryPath] : [];
  });
}

function fail(message) {
  errors.push(message);
}

const appFiles = filesUnder(path.join(root, "src/data/apps"), ".json");
const pageFiles = filesUnder(path.join(root, "src/content/pages"), ".md");

if (appFiles.length === 0) fail("No app manifests found in src/data/apps.");
if (pageFiles.length === 0)
  fail("No content pages found in src/content/pages.");

const apps = appFiles.map((file) => {
  try {
    return { file, data: JSON.parse(fs.readFileSync(file, "utf8")) };
  } catch (error) {
    fail(`${path.relative(root, file)} is not valid JSON: ${error.message}`);
    return { file, data: {} };
  }
});

const pages = pageFiles.map((file) => {
  try {
    const parsed = matter(fs.readFileSync(file, "utf8"));
    return { file, data: parsed.data, body: parsed.content };
  } catch (error) {
    fail(
      `${path.relative(root, file)} has invalid frontmatter: ${error.message}`,
    );
    return { file, data: {}, body: "" };
  }
});

const placeholderPattern =
  /\b(?:TODO|TBD|FIXME)\b|\[(?:LEGAL_NAME|APP_NAME|DATE|URL)\]/i;
const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const publicFiles = [
  ...filesUnder(path.join(root, "src"), ".astro"),
  ...filesUnder(path.join(root, "src"), ".ts"),
  ...filesUnder(path.join(root, "src"), ".json"),
  ...pageFiles,
  ...filesUnder(path.join(root, ".github/ISSUE_TEMPLATE"), ".yml"),
];

for (const file of publicFiles) {
  const text = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  if (placeholderPattern.test(text))
    fail(`${relative} contains an unresolved placeholder.`);
  if (emailPattern.test(text))
    fail(`${relative} contains a public email address.`);
}

const appBySlug = new Map();
for (const { file, data: app } of apps) {
  const relative = path.relative(root, file);
  if (!app.slug) {
    fail(`${relative} is missing slug.`);
    continue;
  }
  if (appBySlug.has(app.slug)) fail(`Duplicate app slug: ${app.slug}.`);
  appBySlug.set(app.slug, app);

  if (path.basename(file, ".json") !== app.slug) {
    fail(`${relative} filename must match slug '${app.slug}'.`);
  }
  if (!Array.isArray(app.locales) || app.locales.length === 0) {
    fail(`${relative} must define at least one locale.`);
    continue;
  }
  if (!app.locales.some((locale) => locale.code === app.defaultLocale)) {
    fail(`${relative} defaultLocale must appear in locales.`);
  }
  for (const locale of app.locales) {
    if (!app.localized?.[locale.code]) {
      fail(
        `${relative} is missing localized name and summary for '${locale.code}'.`,
      );
    }
  }
  const iconPath = path.join(
    root,
    "public",
    String(app.icon ?? "").replace(/^\//, ""),
  );
  if (!fs.existsSync(iconPath))
    fail(`${relative} references missing icon '${app.icon}'.`);
  const expectedRepository =
    "https://github.com/asphalt-condensation/asphalt-condensation.github.io";
  if (app.repositoryUrl !== expectedRepository) {
    fail(`${relative} repositoryUrl must be '${expectedRepository}'.`);
  }
  if (!String(app.issueUrl ?? "").startsWith(`${expectedRepository}/issues/`)) {
    fail(`${relative} issueUrl must use the shared repository's Issues area.`);
  }
}

const routes = new Map();
for (const page of pages) {
  const relative = path.relative(root, page.file);
  const { data, body } = page;
  for (const key of [
    "app",
    "locale",
    "kind",
    "route",
    "title",
    "description",
    "lastUpdated",
  ]) {
    if (!data[key]) fail(`${relative} is missing frontmatter field '${key}'.`);
  }
  if (routes.has(data.route))
    fail(`Duplicate route '${data.route}' in ${relative}.`);
  routes.set(data.route, relative);

  const app = appBySlug.get(data.app);
  if (!app) {
    fail(`${relative} references unknown app '${data.app}'.`);
    continue;
  }
  if (!app.locales.some((locale) => locale.code === data.locale)) {
    fail(`${relative} uses undeclared locale '${data.locale}'.`);
  }
  const prefix =
    data.locale === app.defaultLocale ? app.slug : `${app.slug}/${data.locale}`;
  const expectedRoute = data.kind === "privacy" ? `${prefix}/privacy` : prefix;
  if (data.route !== expectedRoute) {
    fail(
      `${relative} route must be '${expectedRoute}', received '${data.route}'.`,
    );
  }
  if (data.kind === "privacy" && app.collectsData === false) {
    const expectedPhrase =
      data.locale === "zh-hans" ? "不会收集" : "does not collect";
    if (
      !body.toLocaleLowerCase().includes(expectedPhrase.toLocaleLowerCase())
    ) {
      fail(`${relative} must state that the app ${expectedPhrase}.`);
    }
  }
  if (data.kind === "support" && !body.includes("GitHub")) {
    fail(`${relative} must explain the GitHub support channel.`);
  }
}

for (const app of appBySlug.values()) {
  for (const locale of app.locales) {
    for (const kind of ["support", "privacy"]) {
      const match = pages.find(
        (page) =>
          page.data.app === app.slug &&
          page.data.locale === locale.code &&
          page.data.kind === kind,
      );
      if (!match) fail(`Missing ${kind} page for ${app.slug}/${locale.code}.`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Content validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated ${apps.length} app manifest(s), ${pages.length} content page(s), and ${routes.size} route(s).`,
);
