import { test, expect } from '@playwright/test';

test('Clicking the logo from profile navigates to homepage', async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.locator('#username').fill('testuser12345');
    await page.locator('#password').fill('admin1234');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.waitForURL('**/');

    await page.getByRole('link', { name: 'Profile' }).click();
    await page.waitForURL('**/profile');

    await page.locator('a.navbar-brand').click();

    await page.waitForURL('**/');
    await expect(page).toHaveURL(/\/$/);

});
