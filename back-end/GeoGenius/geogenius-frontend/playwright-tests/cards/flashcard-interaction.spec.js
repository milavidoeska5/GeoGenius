import { test, expect } from '@playwright/test';

test('User can flip a flashcard to see its description', async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.locator('#username').fill('testuser12345');
    await page.locator('#password').fill('admin1234');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.waitForURL('**/');

    const flashcard = page.locator('.flashcard').first();
    await expect(flashcard).toBeVisible();

    const frontText = await flashcard.locator('h4').textContent();

    await flashcard.click();

    const backText = await flashcard.locator('p').textContent();
    expect(backText?.trim().length).toBeGreaterThan(0);
    expect(backText?.trim()).not.toEqual(frontText?.trim());
});
