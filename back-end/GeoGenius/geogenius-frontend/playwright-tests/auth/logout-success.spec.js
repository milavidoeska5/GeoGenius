import { test, expect } from '@playwright/test';

test('User can logout and is redirected to login page', async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.locator('#username').fill('testuser12345');
    await page.locator('#password').fill('admin1234');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.waitForURL('http://localhost:3000/');

    await page.click('button:has-text("Logout")');

    await page.waitForURL('http://localhost:3000/login');

    await expect(page.locator('h2', { hasText: 'Welcome back!' })).toBeVisible();

});
