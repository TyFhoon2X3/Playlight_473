import { test, expect } from '@playwright/test';

    test("add item successfully", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/tracalorie");

        const array = [
            { name: "somtum", calories: 130 },
            { name: "pad thai", calories: 250 },
            { name: "green curry", calories: 200 },
            { name: "fried rice", calories: 300 },
            { name: "spring rolls", calories: 150 }
        ];

        for (const item of array) {
            await page.fill("#item-name", item.name);
            await page.fill("#item-calories", item.calories.toString());
            await page.click(".add-btn");
            await expect(page.locator(".collection")).toContainText(item.name);
            await expect(page.locator(".collection")).toContainText(item.calories.toString());
        }
        await expect(page.locator(".total-calories")).toHaveText("1030");
    });

    test("delete item successfully", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/tracalorie");
        await page.fill("#item-name", "Pad Thai");
        await page.fill("#item-calories", "400");
        await page.click(".add-btn");
        await page.click(".edit-item");
        await page.waitForTimeout(1000);
        await page.click(".delete-btn");
        await expect(page.locator(".center-align")).toContainText("Total Calories: 0");
    });

    test("only input meal and calories", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/tracalorie");
    
        // กรอกเฉพาะชื่ออาหาร โดยไม่ใส่แคลอรี่
        await page.fill("#item-name", "egg");
        await page.click(".add-btn");
        await expect(page.locator(".total-calories")).not.toContainText("egg");
        await page.fill("#item-name", ""); 
    
        // กรอกเฉพาะแคลอรี่ โดยไม่ใส่ชื่ออาหาร
        await page.fill("#item-calories", "200"); //string
        await page.click(".add-btn");
        await expect(page.locator(".total-calories")).not.toContainText("200"); // string
        await page.fill("#item-calories", ""); 
    });
    

    test("F5 to delete", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/tracalorie");

        const array = [
            { name: "somtum", calories: 130 },
            { name: "pad thai", calories: 250 },
            { name: "green curry", calories: 200 },
            { name: "fried rice", calories: 300 },
            { name: "spring rolls", calories: 150 }
        ];

        for (const item of array) {
            await page.fill("#item-name", item.name);
            await page.fill("#item-calories", item.calories.toString());
            await page.click(".add-btn");
            await expect(page.locator(".collection")).toContainText(item.name);
            await expect(page.locator(".collection")).toContainText(item.calories.toString());
        }
        await page.reload();
        await expect(page.locator(".center-align")).toHaveText("Total Calories: 1030");
    });

    test("iphone-6", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/tracalorie");
        await page.setViewportSize({ width: 375, height: 667 });
    });

    test("CAN'T INPUT TEXT IN CAL", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/tracalorie");
        await page.fill("#item-name", "Pad Thai");
    
        // ลองพิมพ์ค่าที่เป็นตัวอักษรใน input[type=number]
        await page.locator("#item-calories").evaluate(input => input.value = "Pad Thai");
    
        // ตรวจสอบว่า value ไม่ได้ถูกตั้งเป็น "Pad Thai"
        const value = await page.locator("#item-calories").inputValue();
        expect(value).not.toBe("Pad Thai");
    });

