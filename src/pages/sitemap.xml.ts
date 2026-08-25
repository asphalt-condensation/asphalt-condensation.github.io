import { getCollection } from "astro:content";

export async function GET() {
  const pages = await getCollection("pages");
  const urls = ["", ...pages.map((entry) => `${entry.data.route}/`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((route) => `  <url><loc>https://asphalt-condensation.github.io/${route}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
