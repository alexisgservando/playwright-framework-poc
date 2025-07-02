import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage.js';
import { FormsPage } from '../pages/FormsPage.js';

let dashboardPage;
let formsPage;

test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    formsPage = new FormsPage(page);
    await dashboardPage.goto();
});

test('Navigate to Form Layouts', async ({page}) => {
    await formsPage.navigateToFormsLayouts();
    await formsPage.assertInlineFormIsVisible();
    await formsPage.submitInlineForm('Alexis Servando', 'alexis@example.com');
});

test('Submit "Using the Grid" form', async ({ page }) => {
    await formsPage.navigateToFormsLayouts();
    await formsPage.assertUsingGridFormIsVisible();
    await formsPage.submitUsingGridForm('alexis@example.com', 'mySecurePassword123');
});

test('Submit "Form without labels" form', async ({ page }) => {
    await formsPage.navigateToFormsLayouts();
    await formsPage.submitFormWithoutLabels('alexis@example.com', 'password', 'This is a test message');
    await formsPage.assertNoLabelsFormWasSubmitted();
});