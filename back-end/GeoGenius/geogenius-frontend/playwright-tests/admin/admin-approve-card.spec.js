import { test, expect } from '@playwright/test';

test('Admin approves a card', async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('admin123');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.waitForURL('**/admin');
    await expect(page.locator('h1', { hasText: 'Pending Cards' })).toBeVisible();

    const approveBtn = page.locator('button', { hasText: 'Approve' }).first();
    if (await approveBtn.isVisible()) {
        await approveBtn.click();
    }

});