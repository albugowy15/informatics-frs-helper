import test, { expect } from "@playwright/test";

test("statistik page", async ({ page }) => {
  await page.goto("/statistik");
  await expect(page).toHaveTitle("Statistik - Informatics FRS Helper");
  await expect(page.getByRole("heading", { name: "Statistik" })).toBeVisible();
});
