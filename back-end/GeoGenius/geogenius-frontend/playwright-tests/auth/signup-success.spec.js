import { test, expect } from '@playwright/test';

test('User can sign up successfully', async ({ page }) => {

    await page.goto('http://localhost:3000/register');

    await page.fill('input[placeholder="Your name"]', 'Tests');
    await page.fill('input[placeholder="Your surname"]', 'Users');
    await page.fill('input[placeholder="your_username"]', 'testuser1234567');
    await page.fill('input[placeholder="example@mail.com"]', 'testuser1234567@example.com');
    await page.fill('input[type="password"]', 'user1234567');

    await page.click('button:has-text("Register")');

    await expect(page).toHaveURL(/.*login/);

});