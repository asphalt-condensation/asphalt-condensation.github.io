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
    page.getByRole("heading", {
      level: 1,
      name: "Asphalt Condensation Apps",
    }),
  ).toBeVisible();
  await expect(page.locator(".site-header")).toHaveCount(0);
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Dungeon: Memory in the Dark",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("No analytics, advertising, or tracking scripts."),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Dungeon: Memory in the Dark support" })
    .click();
  await expect(page).toHaveURL(/\/dungeon\/$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Dungeon: Memory in the Dark",
    }),
  ).toBeVisible();
});

test("the home particle field renders without remote assets", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const canvas = page.locator("[data-particle-field]");
  await expect(canvas).toBeVisible();

  const pixels = await canvas.evaluate((element: HTMLCanvasElement) => {
    const context = element.getContext("2d");
    if (!context) return { width: 0, height: 0, painted: 0 };
    const data = context.getImageData(0, 0, element.width, element.height).data;
    let painted = 0;
    for (let index = 3; index < data.length; index += 256) {
      if (data[index] > 0) painted += 1;
    }
    return { width: element.width, height: element.height, painted };
  });

  expect(pixels.width).toBeGreaterThan(0);
  expect(pixels.height).toBeGreaterThan(0);
  expect(pixels.painted).toBeGreaterThan(0);
});

test("support topics reveal one answer at a time", async ({ page }) => {
  await page.goto("/dungeon/");
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "What do you need help with?",
    }),
  ).toBeVisible();

  const troubleshooting = page.locator("details").filter({
    has: page.getByRole("heading", {
      name: "Troubleshooting",
      exact: true,
    }),
  });
  const controls = page.locator("details").filter({
    has: page.getByRole("heading", { name: "Controls", exact: true }),
  });

  await page
    .getByRole("heading", { name: "Troubleshooting", exact: true })
    .click();
  await expect(troubleshooting).toHaveAttribute("open", "");
  await expect(page.getByText("I cannot hear the game")).toBeVisible();

  await page.getByRole("heading", { name: "Controls", exact: true }).click();
  await expect(controls).toHaveAttribute("open", "");
  await expect(troubleshooting).not.toHaveAttribute("open", "");
});

test("support, privacy, and locale navigation remains consistent", async ({
  page,
}) => {
  await page.goto("/dungeon/");
  await page.getByRole("link", { name: "Privacy", exact: true }).click();
  await expect(page).toHaveURL(/\/dungeon\/privacy\/$/);
  await page.getByRole("heading", { name: "Data collection" }).click();
  await expect(
    page.getByText("Dungeon does not collect, transmit, sell, or share"),
  ).toBeVisible();
  await page.getByRole("link", { name: "简体中文" }).click();
  await expect(page).toHaveURL(/\/dungeon\/zh-hans\/privacy\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-hans");
  await page.getByRole("heading", { name: "数据收集" }).click();
  await expect(
    page.getByText("《地牢》不会收集、传输、出售或共享个人数据"),
  ).toBeVisible();
});

test.describe("without client JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("support content remains complete", async ({ page }) => {
    await page.goto("/dungeon/");
    await expect(
      page.getByRole("heading", { level: 2, name: "Recommended setup" }),
    ).toBeVisible();
    await expect(
      page.getByText("GitHub Issues are public and require a GitHub account."),
    ).toBeVisible();
  });
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
