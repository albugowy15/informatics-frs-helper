import test, { expect } from "@playwright/test";
import { getFullPageTitle } from "../helpers";

test("Home page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(getFullPageTitle("Home"));

  // get schedule status
  // await expect(page.getByRole("alert", {name: })).toBeVisible();

  // get heading
  await expect(
    page.getByRole("heading", { name: "Informatics FRS Helper" }),
  ).toBeVisible();
});
