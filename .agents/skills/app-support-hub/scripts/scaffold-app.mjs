import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const option = (name) => {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? undefined : args[index + 1];
};

const slug = option("slug");
const name = option("name");
const zhName = option("zh-name");
const platform = option("platform") ?? "iOS";

if (!slug || !name || !zhName) {
  console.error(
    'Usage: npm run new:app -- --slug app-slug --name "App Name" --zh-name "中文名" [--platform iOS]',
  );
  process.exit(1);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error(
    "--slug must use lowercase letters, numbers, and single hyphens.",
  );
  process.exit(1);
}

const root = process.cwd();
const manifestPath = path.join(root, "src/data/apps", `${slug}.json`);
if (fs.existsSync(manifestPath)) {
  console.error(`App '${slug}' already exists.`);
  process.exit(1);
}

const issueUrl =
  "https://github.com/asphalt-condensation/asphalt-condensation.github.io/issues/new/choose";
const repositoryUrl =
  "https://github.com/asphalt-condensation/asphalt-condensation.github.io";
const date = new Date().toISOString().slice(0, 10);
const manifest = {
  slug,
  name,
  summary: "TODO: Add a concise English app summary.",
  localized: {
    en: { name, summary: "TODO: Add a concise English app summary." },
    "zh-hans": { name: zhName, summary: "TODO: 添加简短的中文 App 说明。" },
  },
  platform: [platform],
  status: "coming-soon",
  icon: `/apps/${slug}/icon.png`,
  accent: "#176D75",
  defaultLocale: "en",
  locales: [
    { code: "en", label: "English" },
    { code: "zh-hans", label: "简体中文" },
  ],
  issueUrl,
  repositoryUrl,
  collectsData: false,
};

const pages = [
  {
    locale: "en",
    kind: "support",
    route: slug,
    title: `${name} Support`,
    description: "TODO: Describe this support page.",
    languageLabel: "English",
    body: "TODO: Add setup, troubleshooting, support-channel, and privacy-link content.",
  },
  {
    locale: "en",
    kind: "privacy",
    route: `${slug}/privacy`,
    title: `${name} Privacy Policy`,
    description: "TODO: Describe this privacy policy.",
    languageLabel: "English",
    body: "TODO: Document actual data collection, local storage, network access, third parties, children, changes, and contact options.",
  },
  {
    locale: "zh-hans",
    kind: "support",
    route: `${slug}/zh-hans`,
    title: `${zhName}支持`,
    description: "TODO: 描述此支持页面。",
    languageLabel: "简体中文",
    body: "TODO: 添加设置、故障排查、支持渠道和隐私政策链接。",
  },
  {
    locale: "zh-hans",
    kind: "privacy",
    route: `${slug}/zh-hans/privacy`,
    title: `${zhName}隐私政策`,
    description: "TODO: 描述此隐私政策。",
    languageLabel: "简体中文",
    body: "TODO: 如实说明数据收集、本地存储、网络、第三方、儿童隐私、政策变更和联系渠道。",
  },
];

fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

for (const page of pages) {
  const directory = path.join(root, "src/content/pages", slug, page.locale);
  const file = path.join(directory, `${page.kind}.md`);
  const frontmatter = [
    "---",
    `app: ${slug}`,
    `locale: ${page.locale}`,
    `kind: ${page.kind}`,
    `route: ${page.route}`,
    `title: ${page.title}`,
    `description: ${page.description}`,
    `languageLabel: ${page.languageLabel}`,
    `lastUpdated: ${date}`,
    "---",
    "",
    page.body,
    "",
  ].join("\n");
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(file, frontmatter);
}

fs.mkdirSync(path.join(root, "public/apps", slug), { recursive: true });

console.log(`Scaffolded '${slug}'.`);
console.log(
  `Next: add public/apps/${slug}/icon.png, replace all TODO text, update Issue Forms, then run npm run check.`,
);
