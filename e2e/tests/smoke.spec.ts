import { expect, test } from "@playwright/test";

test("renders components and icons", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Svelte package smoke" }),
  ).toBeVisible();

  const button = page.getByRole("button", { name: /Count 0/ });
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole("button", { name: /Count 1/ })).toBeVisible();
});
