import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const errors = [];

const publicFiles = execFileSync(
  "git",
  ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
  {
    cwd: root,
    encoding: "utf8",
  },
)
  .split("\0")
  .filter(Boolean);

const forbiddenFiles = [
  /(^|\/)\.env(?:\.|$)/i,
  /(^|\/)\.npmrc$/i,
  /\.(?:jks|key|keystore|mobileprovision|p12|pem)$/i,
];

const detectors = [
  {
    label: "email address",
    pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  },
  {
    label: "macOS or Linux home-directory path",
    pattern: /\/(?:Users|home)\/[A-Z0-9._-]+\//i,
  },
  {
    label: "Windows home-directory path",
    pattern: /[A-Z]:\\Users\\[^\\\s]+\\/i,
  },
  {
    label: "private key",
    pattern: /-----BEGIN (?:EC |OPENSSH |RSA )?PRIVATE KEY-----/,
  },
  {
    label: "GitHub access token",
    pattern: /\b(?:github_pat_|gh[pousr]_)[A-Z0-9_]{20,}\b/i,
  },
  {
    label: "AWS access key",
    pattern: /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/,
  },
  {
    label: "Google API key",
    pattern: /\bAIza[A-Z0-9_-]{30,}\b/,
  },
  {
    label: "Slack token",
    pattern: /\bxox[baprs]-[A-Z0-9-]{16,}\b/i,
  },
  {
    label: "live Stripe secret",
    pattern: /\bsk_live_[A-Z0-9]{16,}\b/i,
  },
  {
    label: "OpenAI API key",
    pattern: /\bsk-(?:proj-)?[A-Z0-9_-]{20,}\b/i,
  },
  {
    label: "credential embedded in a URL",
    pattern: /https?:\/\/[^\s/:]+:[^\s/@]+@/i,
  },
  {
    label: "phone number attached to a contact field",
    pattern: /(?:phone|telephone|mobile|手机号|电话号码)\s*[:：=]\s*\+?[\d(]/i,
  },
];

function inspectContents(label, text) {
  for (const detector of detectors) {
    if (detector.pattern.test(text)) {
      errors.push(`${label}: contains a possible ${detector.label}.`);
    }
  }
}

for (const file of publicFiles) {
  const relative = path.normalize(file);
  if (forbiddenFiles.some((pattern) => pattern.test(relative))) {
    errors.push(`${file}: sensitive file type must not be tracked.`);
    continue;
  }

  const text = fs.readFileSync(path.join(root, file)).toString("utf8");
  inspectContents(file, text);
}

const historyBlobs = new Map();
const historyObjects = execFileSync("git", ["rev-list", "--objects", "--all"], {
  cwd: root,
  encoding: "utf8",
});

for (const line of historyObjects.split("\n")) {
  const separator = line.indexOf(" ");
  if (separator === -1) continue;
  const objectId = line.slice(0, separator);
  const file = line.slice(separator + 1);
  const type = execFileSync("git", ["cat-file", "-t", objectId], {
    cwd: root,
    encoding: "utf8",
  }).trim();
  if (type === "blob" && !historyBlobs.has(objectId)) {
    historyBlobs.set(objectId, file);
  }
}

for (const [objectId, file] of historyBlobs) {
  if (forbiddenFiles.some((pattern) => pattern.test(file))) {
    errors.push(`${file} in Git history: sensitive file type was published.`);
    continue;
  }
  const contents = execFileSync("git", ["cat-file", "blob", objectId], {
    cwd: root,
    maxBuffer: 20 * 1024 * 1024,
  }).toString("utf8");
  inspectContents(`${file} in Git history`, contents);
}

const authorEmails = execFileSync("git", ["log", "--all", "--format=%ae"], {
  cwd: root,
  encoding: "utf8",
})
  .split("\n")
  .map((email) => email.trim())
  .filter(Boolean);

for (const email of new Set(authorEmails)) {
  if (!email.endsWith("@users.noreply.github.com")) {
    errors.push(
      "Git history contains a commit author email that is not a GitHub noreply address.",
    );
    break;
  }
}

if (errors.length > 0) {
  console.error(
    `Public-safety validation failed with ${errors.length} error(s):`,
  );
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated ${publicFiles.length} public file(s), ${historyBlobs.size} historical blob(s), and ${authorEmails.length} commit author record(s) for common public-data risks.`,
);
