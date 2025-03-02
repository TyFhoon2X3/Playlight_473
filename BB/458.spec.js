import { test, expect } from '@playwright/test';


    test("add item successfully", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/bmi");

        await page.selectOption("#gender", "Female");
        await page.fill("#weight", "70");
        await page.fill("#height", "175");

        await page.click(".btn-primary");

        await expect(page.locator("#divResult")).toBeVisible();
    });

    test("change Gender", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/bmi");

        await page.selectOption("#gender", "Female");
        await page.selectOption("#gender", "Male");
        await page.selectOption("#gender", "Female");
        await page.selectOption("#gender", "Male");
    });

    test("should show an error message when weight and height are not provided", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/bmi");

        await page.selectOption("#gender", "Female");
        await page.fill("#weight", "");
        await page.fill("#height", "");
        await page.click(".btn-primary");

        await expect(page.locator(".alert-box")).toBeVisible();
        await expect(page.locator(".alert-box")).toContainText("Please provide all the necessary information!");
    });

    test("clear", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/bmi");

        await page.selectOption("#gender", "Female");
        await page.fill("#weight", "70");
        await page.fill("#height", "175");
        await page.click(".btn-primary");

        await expect(page.locator("#divResult")).toBeVisible();
        await page.click(".btn-secondary");
        await expect(page.locator("#divResult")).not.toBeVisible();
    });

    test("should show an error when weight or height is zero", async ({ page }) => {
        await page.goto("https://practice.expandtesting.com/bmi");

        await page.selectOption("#gender", "Female");
        await page.fill("#weight", "0");
        await page.fill("#height", "175");
        await page.click(".btn-primary");

        await expect(page.locator(".alert-box")).toBeVisible();
        await expect(page.locator(".alert-box")).toContainText("Please provide all the necessary information!");
    });
