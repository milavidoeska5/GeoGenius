import { test, expect } from '@playwright/test';

test('Shows error on invalid login', async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.locator('#username').fill('wronguser');
    await page.locator('#password').fill('wrongpass');
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.locator('text=Invalid username or password.')).toBeVisible();

});
