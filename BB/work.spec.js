const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/tracalorie/');
});

test('เพิ่มมื้ออาหารใหม่', async ({ page }) => {
  await page.fill('input#item-name', 'ข้าวผัด');
  await page.fill('input#item-calories', '500');
  await page.click('button.add-btn.btn.blue.darken-3');
  await expect(page.locator('text=ข้าวผัด')).toBeVisible();
});

test('ไม่สามารถเพิ่มมื้ออาหารโดยไม่มีชื่อ', async ({ page }) => {
  await page.fill('input#item-calories', '500');
  await page.click('button.add-btn.btn.blue.darken-3');
  await expect(page.locator('input#item-name')).toHaveValue('');
});

test('รีเซ็ตฟอร์มหลังจากเพิ่มมื้ออาหาร', async ({ page }) => {
  await page.fill('input#item-name', 'ข้าวผัด');
  await page.fill('input#item-calories', '500');
  await page.click('button.add-btn.btn.blue.darken-3');
  await expect(page.locator('input#item-name')).toHaveValue('');
  await expect(page.locator('input#item-calories')).toHaveValue('');
});



test('แสดงรายการมื้ออาหารที่ถูกต้อง', async ({ page }) => {
  await page.fill('#item-name', 'ข้าวผัด');
  await page.fill('#item-calories', '500');
  await page.click('text=Add Meal');
  await page.fill('#item-name', 'ส้มตำ');
  await page.fill('#item-calories', '300');
  await page.click('button.add-btn.btn.blue.darken-3');

  const meals = await page.locator('.meal-item').allTextContents();
  await expect(page.locator(".center-align")).toHaveText("Total Calories: 300");
  // expect(meals).toContain('ส้มตำ - 300 Calories');
});

test('ปุ่ม "Clear All" ลบมื้ออาหารทั้งหมด', async ({ page }) => {
  await page.fill('#item-name', 'ข้าวผัด');
  await page.fill('#item-calories', '500');
  await page.click('text=Add Meal');
  await page.click('text=Clear All');
  await expect(page.locator('.meal-item')).toHaveCount(0);
});
