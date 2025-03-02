const { test, expect } = require('@playwright/test');

test.describe('BMI Calculator Tests', () => {
  // ทดสอบ: คำนวณ BMI สำเร็จ
  test('should calculate BMI successfully', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/bmi');
    
    // เลือกเพศ
    await page.selectOption('#gender', 'Female');
    
    // กรอกน้ำหนักและส่วนสูง
    await page.fill('#weight', '70');
    await page.fill('#height', '175');
    
    // คลิกปุ่มส่งข้อมูล
    await page.click('.btn-primary');
    
    // ตรวจสอบว่าแสดงผลลัพธ์
    await expect(page.locator('#divResult')).toBeVisible();
  });

  // ทดสอบ: เปลี่ยนเพศหลายครั้ง
  test('should change gender successfully', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/bmi');
    
    // เลือกเพศและสลับระหว่างชายและหญิง
    await page.selectOption('#gender', 'Female');
    await page.selectOption('#gender', 'Male');
    
  });

  // ทดสอบ: แสดงข้อความผิดพลาดเมื่อไม่ได้กรอกน้ำหนักและส่วนสูง
  test('should show an error message when weight and height are missing', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/bmi');
    
    // เลือกเพศและปล่อยให้น้ำหนักและส่วนสูงว่าง
    await page.selectOption('#gender', 'Female');
    await page.fill('#weight', '');
    await page.fill('#height', '');
    
    // คลิกปุ่มส่งข้อมูล
    await page.click('.btn-primary');
    
    // ตรวจสอบว่าแสดงข้อความผิดพลาด
    const alertBox = page.locator('.alert-box');
    await expect(alertBox).toBeVisible();
    await expect(alertBox).toContainText('Please provide all the necessary information!×');
  });

  // ทดสอบ: ฟังก์ชันปุ่มล้างข้อมูล
  test('should reset the form when clear button is clicked', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/bmi');
    
    // กรอกข้อมูลที่ถูกต้อง
    await page.selectOption('#gender', 'Female');
    await page.fill('#weight', '70');
    await page.fill('#height', '175');
    
    // คลิกปุ่มส่งข้อมูล
    await page.click('.btn-primary');
    
    // ตรวจสอบว่าแสดงผลลัพธ์
    await expect(page.locator('#divResult')).toBeVisible();
    
    // คลิกปุ่มล้างข้อมูล
    await page.click('.btn-secondary');
    
    // ตรวจสอบว่าแสดงผลลัพธ์หายไป
    await expect(page.locator('#divResult')).toBeHidden();
  });

  // ทดสอบ: แสดงข้อผิดพลาดเมื่อกรอกน้ำหนักหรือส่วนสูงเป็นศูนย์
  test('should show an error when weight or height is zero', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/bmi');
    
    // เลือกเพศและกรอกน้ำหนักเป็น 0
    await page.selectOption('#gender', 'Female');
    await page.fill('#weight', '0');
    await page.fill('#height', '175');
    
    // คลิกปุ่มส่งข้อมูล
    await page.click('.btn-primary');
    
    // ตรวจสอบข้อความผิดพลาด
    const alertBox = page.locator('.alert-box');
    await expect(alertBox).toBeVisible();
    await expect(alertBox).toContainText('Please provide all the necessary information!×');
  });
});
