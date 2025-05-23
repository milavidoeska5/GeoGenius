import { test, expect } from '@playwright/test';

test('User proposes a card and sees success message', async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.locator('#username').fill('jovjo');
    await page.locator('#password').fill('joki1234');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.waitForURL('**/');

    await page.locator('button', { hasText: 'Propose a Card' }).click();

    await page.locator('#title').fill('17.05.2025 - test card');
    await page.locator('#description').fill('Test Card Description');

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Card successfully proposed! Awaiting admin approval.')).toBeVisible();
});