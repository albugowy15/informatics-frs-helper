import { expect, test } from "@playwright/test";

test("Report page", async ({ page }) => {
  await page.goto("/report");
  await expect(page).toHaveTitle("Report - Informatics FRS Helper");
  await expect(page.getByRole("heading", { name: "Report" })).toBeVisible();
});
