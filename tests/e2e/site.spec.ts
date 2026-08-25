import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const publicPages = [
  "/",
  "/dungeon/",
  "/dungeon/privacy/",
  "/dungeon/zh-hans/",
  "/dungeon/zh-hans/privacy/",
];

test("the support hub exposes Dungeon resources", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Apps and support resources" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 3,
      name: "Dungeon: Memory in the Dark",
    }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Support", exact: true }).click();
  await expect(page).toHaveURL(/\/dungeon\/$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Dungeon: Memory in the Dark",
    }),
  ).toBeVisible();
});

test("support, privacy, and locale navigation remains consistent", async ({
  page,
}) => {
  await page.goto("/dungeon/");
  await page.getByRole("link", { name: "Privacy", exact: true }).click();
  await expect(page).toHaveURL(/\/dungeon\/privacy\/$/);
  await expect(
    page.getByRole("heading", { level: 2, name: "Data collection" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "简体中文" }).click();
  await expect(page).toHaveURL(/\/dungeon\/zh-hans\/privacy\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-hans");
  await expect(
    page.getByRole("heading", { level: 2, name: "数据收集" }),
  ).toBeVisible();
});

for (const route of publicPages) {
  test(`${route} has no serious accessibility violations or horizontal overflow`, async ({
    page,
  }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    const accessibility = await new AxeBuilder({ page }).analyze();
    const serious = accessibility.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    );
    expect(serious).toEqual([]);

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(
      dimensions.clientWidth + 1,
    );
  });
}
