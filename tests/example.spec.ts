import { test, chromium, expect } from "@playwright/test";

const testPassword = process.env.TEST_PASSWORD;
const testEmail = process.env.TEST_EMAIL;

test("suggested communities test", async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://app-threads-eta.vercel.app/");

  // Fill in the identifier input and click 'Continue'
  if (testEmail !== undefined) {
    await page.fill(
      "//input[contains(@class,'cl-formFieldInput cl-formFieldInput__identifier')]",
      testEmail
    );
    await page.click("//button[text()='Continue']");

    // Wait for a brief period (e.g., 2000 milliseconds or 2 seconds)
    await page.waitForTimeout(4000);
  }

  // Fill in the password input and click 'Continue'
  if (testPassword !== undefined) {
    await page.fill(
      "//input[contains(@class,'cl-formFieldInput cl-formFieldInput__password')]",
      testPassword
    );
    await page.click("//button[text()='Continue']");

    await page
      .textContent("(//div[contains(@class,'flex flex-1')])[1]", {
        timeout: 3000,
      })
      .then((value) => {
        console.log(value);
      });
  }
});
