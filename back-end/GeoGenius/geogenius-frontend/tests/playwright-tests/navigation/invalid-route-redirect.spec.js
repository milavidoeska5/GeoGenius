import { test, expect } from '@playwright/test';

test('Redirect to homepage on invalid route - admin', async ({ page }) => {

    await page.goto('http://localhost:3000/login');
    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('admin123');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.waitForURL('**/admin');

    await page.goto('http://localhost:3000/invalid-admin-url');

    await expect(page).toHaveURL('http://localhost:3000/');
});