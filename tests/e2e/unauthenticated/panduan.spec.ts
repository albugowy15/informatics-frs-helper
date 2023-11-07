import test, { expect } from "@playwright/test";
import { getFullPageTitle } from "../helpers";

test("Panduan page", async ({ page }) => {
  await page.goto("/panduan");
  await expect(page).toHaveTitle(getFullPageTitle("Panduan Penggunaan"));
  await expect(
    page.getByRole("heading", {
      name: "Panduan Penggunaan Informatics FRS Helper",
    }),
  ).toBeVisible();
});
