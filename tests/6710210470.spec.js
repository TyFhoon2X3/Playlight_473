const { test, expect } = require('@playwright/test');

test.describe('SauceDemo Web Test', () => {

  // 1️⃣ ทดสอบการโหลดหน้า Login
  test('หน้า Login ต้องโหลดสำเร็จ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator('#login-button')).toBeVisible();
  });

  // 2️⃣ ทดสอบการล็อกอินสำเร็จ
  test('ล็อกอินสำเร็จด้วยบัญชีที่ถูกต้อง', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  // 3️⃣ ทดสอบการเพิ่มสินค้าลงตะกร้า
  test('เพิ่มสินค้าลงตะกร้าแล้วจำนวนต้องเพิ่มขึ้น', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    await page.click('.inventory_item:first-child .btn_inventory'); // กดเพิ่มสินค้าชิ้นแรก
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  // 4️⃣ ทดสอบการลบสินค้าจากตะกร้า
  test('ลบสินค้าออกจากตะกร้าแล้วจำนวนต้องลดลง', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    await page.click('.inventory_item:first-child .btn_inventory'); // เพิ่มสินค้า
    await page.click('.shopping_cart_badge'); // เปิดตะกร้า
    await page.click('.cart_item .cart_button'); // กดลบสินค้า

    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  // 5️⃣ ทดสอบการล็อกเอาต์
  test('ล็อกเอาต์สำเร็จและกลับมาที่หน้า Login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('#react-burger-menu-btn'); // เปิดเมนู
    await page.click('#logout_sidebar_link'); // กด Logout

    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

});
