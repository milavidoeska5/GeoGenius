import { test, expect } from '@playwright/test';

test('successful login redirects user appropriately', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.locator('#username').fill('jovjo');
    await page.locator('#password').fill('joki1234');

    await page.getByRole('button', { name: 'Log In' }).click();

    await page.waitForURL('**/');

    await expect(page.locator('text=Explore Fun Facts')).toBeVisible();
});