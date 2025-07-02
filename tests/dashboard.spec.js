import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage.js';

let dashboardPage;

// Setup the test environment
test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
});

test('Toggle theme on the dashboard', async () => {
    const optionTheme = 'Corporate'; // Change this to 'Light', 'Dark', 'Cosmic' or 'Corporate' as needed
    await dashboardPage.toggleTheme(optionTheme);
    await dashboardPage.expectedThemeSelected(optionTheme);
});

test('Light card toggle switches to OFF', async () => {
    const status = await dashboardPage.toggleCard('Light');
    await expect(status).toHaveText(/off/i);
});

test('Roller Shades card toggle switches to OFF', async () => {
    const status = await dashboardPage.toggleCard('Roller Shades');
    await expect(status).toHaveText(/off/i);
});

test('Wireless Audio card toggle switches to OFF', async () => {
    const status = await dashboardPage.toggleCard('Wireless Audio');
    await expect(status).toHaveText(/off/i);
});

test('Coffee Maker card toggle switches to OFF', async () => {
    const status = await dashboardPage.toggleCard('Coffee Maker');
    await expect(status).toHaveText(/off/i);
});

test('Sidebar contains expected menu items', async () => {
    const expectedItems = [
        'Forms',
        'Modal & Overlays',
        'Extra Components',
        'Charts',
        'Tables & Data',
        'Auth'
    ];

    const actualItems = await dashboardPage.getSidebarMenuItems();

    for (const item of expectedItems) {
        expect(actualItems).toContain(item);
        console.log(item);
    }
});

test('Drag temperature slider to max (30°C)', async () => {
  await dashboardPage.selectTemperatureTab();
  await dashboardPage.dragTemperatureSliderToMax();

  const value = await dashboardPage.getTemperatureValue();
  console.log('Temperature after drag:', value);

  expect(value).toContain('30');
});



