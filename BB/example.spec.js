import { test, expect } from '@playwright/test';

test('TC01', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.getByLabel('Username').fill('student');
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button',{name: 'Submit'}).click();
  expect(page.url()).toBe('https://practicetestautomation.com/logged-in-successfully/');
  expect(page.getByRole('heading',{name: 'Logged In Successfully'}));
  await page.screenshot({path: 'screenshot.png'});
  await page.setViewportSize({ width: 720, height: 1080 });
});

test('TC02 - Login Failed with Incorrect Password', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Submit' }).click();
  
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toHaveText('Your password is invalid!');
});

test('TC03 - Login Failed with Incorrect Username', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.getByLabel('Username').fill('wrongstudent');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();
  
    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toHaveText('Your username is invalid!');
});