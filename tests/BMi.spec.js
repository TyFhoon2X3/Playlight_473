import { test, expect } from "@playwright/test";

test.describe("BMI Calculator Tests", () => {

    test("calculate BMI correctly", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/bmi");

        // ใส่ข้อมูลน้ำหนักและส่วนสูง
        await page.selectOption("#gender", "Female");
        await page.fill("#weight", "70");
        await page.fill("#height", "175");

        // คลิกปุ่ม Calculate
        await page.getByRole("button", { name: "Calculate" }).click();

        // รอให้ค่า BMI ปรากฏ
        await page.waitForSelector("#bmi");

        // ตรวจสอบค่า BMI
        const bmiText = await page.locator("#bmi").innerText();
        console.log("Calculated BMI:", bmiText);
        expect(parseFloat(bmiText)).toBeCloseTo(22.86, 2); // เปรียบเทียบทศนิยม 2 ตำแหน่ง
    });

    test("change gender multiple times", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/bmi");

        // เปลี่ยนค่าเพศหลายครั้ง
        await page.selectOption("#gender", "Female");
        await page.selectOption("#gender", "Male");
        await page.selectOption("#gender", "Female");
        await page.selectOption("#gender", "Male");
    });

    test("should show an error message when weight and height are empty", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/bmi");

        // เลือกเพศแต่ไม่ใส่ข้อมูล
        await page.selectOption("#gender", "Female");
        await page.fill("#weight", "");
        await page.fill("#height", "");
        await page.getByRole("button", { name: "Calculate" }).click();

        // ตรวจสอบว่ามีข้อความแจ้งเตือน
        await expect(page.locator(".alert-box")).toBeVisible();
        await expect(page.locator(".alert-box")).toContainText("Please provide all the necessary information!");
    });

    test("should show an error when weight or height is zero", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/bmi");

        // กรอกค่าน้ำหนักเป็น 0
        await page.selectOption("#gender", "Female");
        await page.fill("#weight", "0");
        await page.fill("#height", "175");
        await page.getByRole("button", { name: "Calculate" }).click();

        // ตรวจสอบว่ามีข้อความแจ้งเตือน
        await expect(page.locator(".alert-box")).toBeVisible();
        await expect(page.locator(".alert-box")).toContainText("Please provide all the necessary information!");
    });

    test("clear results after calculation", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/bmi");

        // ใส่ข้อมูลและคำนวณ BMI
        await page.selectOption("#gender", "Female");
        await page.fill("#weight", "70");
        await page.fill("#height", "175");
        await page.getByRole("button", { name: "Calculate" }).click();

        // ตรวจสอบว่าผลลัพธ์แสดง
        await expect(page.locator("#divResult")).toBeVisible();

        // คลิกปุ่ม Clear และตรวจสอบว่าผลลัพธ์ถูกล้าง
        await page.getByRole("button", { name: "Clear" }).click();
        await expect(page.locator("#divResult")).not.toBeVisible();
    });

    test("Calculate button should be disabled when inputs are empty", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/bmi");

        // ตรวจสอบว่าปุ่ม Calculate ไม่สามารถกดได้เมื่อไม่มีข้อมูล
        await expect(page.locator(".btn-primary")).toBeDisabled();
    });

    test("calculate BMI correctly using getByText", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/bmi");
    
        // ใส่ข้อมูลน้ำหนักและส่วนสูง
        await page.selectOption("#gender", "Female");
        await page.fill("#weight", "70");
        await page.fill("#height", "175");
    
        // คลิกปุ่ม Calculate
        await page.getByRole("button", { name: "Calculate" }).click();
    
        // รอให้ผลลัพธ์ BMI ปรากฏ
        await page.waitForSelector("#bmi");
    
        // ดึงข้อความที่มี "BMI ="
        const bmiText = await page.getByText("BMI =").innerText();
        console.log("BMI Result:", bmiText);
    
        // ดึงตัวเลขจากข้อความ "BMI = 22.86"
        const bmiValue = parseFloat(bmiText.replace("BMI =", "").trim());
    
        // ตรวจสอบว่าค่า BMI คำนวณถูกต้อง (ใกล้เคียง 22.86)
        expect(bmiValue).toBeCloseTo(22.86, 2);
    });
    

});
