import { test, expect } from '@playwright/test';

test('User can sign up successfully', async ({ page }) => {

    await page.goto('http://localhost:3000/register');

    await page.fill('input[placeholder="Your name"]', 'Igor');
    await page.fill('input[placeholder="Your surname"]', 'Arsenovski');
    await page.fill('input[placeholder="your_username"]', 'igorigor');
    await page.fill('input[placeholder="example@mail.com"]', 'igorigor@example.com');
    await page.fill('input[type="password"]', 'igor12345');

    await page.click('button:has-text("Register")');

    await expect(page).toHaveURL(/.*login/);

});