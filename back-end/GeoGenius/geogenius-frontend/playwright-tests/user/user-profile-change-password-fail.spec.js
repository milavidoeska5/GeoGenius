import { test, expect } from '@playwright/test';

test('User fails to change password with incorrect old password', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.locator('#username').fill('iarsenov2');
    await page.locator('#password').fill('iarsenovpw3'); // current correct password
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.waitForURL('**/');
    await page.getByRole('link', { name: 'Profile' }).click();

    await expect(page).toHaveURL(/.*\/profile/);
    await expect(page.locator('text=Your Profile')).toBeVisible();

    await page.getByRole('button', { name: 'Change Password' }).click();

    await page.getByPlaceholder('Old password').fill('wrongpassword');
    await page.getByPlaceholder('New password').fill('iarsenovpw4');

    await page.getByRole('button', { name: 'Confirm' }).click();

    await expect(page.locator('text=Failed to change password. Please try again.')).toBeVisible();
});
