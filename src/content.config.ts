import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const apps = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/apps" }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    name: z.string().min(1),
    summary: z.string().min(1),
    localized: z.record(
      z.string(),
      z.object({
        name: z.string().min(1),
        summary: z.string().min(1),
      }),
    ),
    platform: z.array(z.enum(["iOS", "iPadOS", "macOS", "watchOS", "tvOS"])),
    status: z.enum(["available", "coming-soon", "retired"]),
    icon: z.string().startsWith("/"),
    accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    defaultLocale: z.string(),
    locales: z.array(
      z.object({
        code: z.string(),
        label: z.string(),
      }),
    ),
    issueUrl: z.url(),
    repositoryUrl: z.url(),
    collectsData: z.boolean(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    app: z.string(),
    locale: z.string(),
    kind: z.enum(["support", "privacy"]),
    route: z.string().regex(/^[a-z0-9][a-z0-9/-]*$/),
    title: z.string().min(1),
    description: z.string().min(1),
    languageLabel: z.string().min(1),
    lastUpdated: z.coerce.date(),
  }),
});

export const collections = { apps, pages };
