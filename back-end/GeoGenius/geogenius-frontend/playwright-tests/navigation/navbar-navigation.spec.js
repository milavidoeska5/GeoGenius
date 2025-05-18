import { test, expect } from '@playwright/test';

test('Navbar links navigate correctly', async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.locator('#username').fill('testuser12345');
    await page.locator('#password').fill('admin1234');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.waitForURL('**/');

    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Chatbot' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Quiz' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();

    await page.click('text=Chatbot');
    await expect(page).toHaveURL(/\/chatbot$/);

    await page.goBack();
    await expect(page).toHaveURL('http://localhost:3000/');

    await page.click('text=Quiz');
    await expect(page).toHaveURL(/\/quiz$/);

    await page.goBack();
    await expect(page).toHaveURL('http://localhost:3000/');

    await page.click('text=Profile');
    await expect(page).toHaveURL(/\/profile$/);

    await page.goBack();
    await expect(page).toHaveURL('http://localhost:3000/');

    await page.click('text=Home');
    await expect(page).toHaveURL('http://localhost:3000/');

});
