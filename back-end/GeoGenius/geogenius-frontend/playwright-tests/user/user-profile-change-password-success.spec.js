import { test, expect } from '@playwright/test';

test('User navigates to profile and changes password', async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.locator('#username').fill('iarsenov2');
    await page.locator('#password').fill('iarsenovpw2');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.waitForURL('**/');

    await page.getByRole('link', { name: 'Profile' }).click();

    await expect(page).toHaveURL(/.*\/profile/);
    await expect(page.locator('text=Your Profile')).toBeVisible();

    await page.getByRole('button', { name: 'Change Password' }).click();

    await page.getByPlaceholder('Old password').fill('iarsenovpw2');
    await page.getByPlaceholder('New password').fill('iarsenovpw3');

    await page.getByRole('button', { name: 'Confirm' }).click();

    await page.click('button:has-text("Logout")');

    await page.waitForURL('http://localhost:3000/login');

    await page.locator('#username').fill('iarsenov2');
    await page.locator('#password').fill('iarsenovpw3');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.waitForURL('**/');
    await expect(page.locator('text=Explore Fun Facts')).toBeVisible();

});
