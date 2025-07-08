import { expect } from '@playwright/test';

export class DashboardPage {
  // Constructor + Locators
  constructor(page) {
    this.page = page;
    this.themeToggle = page.locator('button.select-button').first();
  }

  // Navigation
  async goto() {
    await this.page.goto('https://m26zq4zl-4200.use.devtunnels.ms/pages/iot-dashboard');
  }

  // Actions
  async toggleTheme(optionText) {
    await this.themeToggle.click();
    const option = this.page.locator('nb-option').filter({ hasText: optionText });
    await option.click();
  }

  async toggleCard(cardName) {
    const card = this.page.locator('nb-card').filter({ hasText: cardName });
    await card.click();
    const status = card.locator('.status');
    return status;
  }

  async selectTemperatureTab() {
    const tempCard = this.page.locator('nb-card', { hasText: 'Temperature' });
    await tempCard.click();
  }

  async dragTemperatureSliderToMax() {
    const tempBox = this.page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded();

    const box = await tempBox.boundingBox();
    if (!box) throw new Error('Temperature box not found.');

    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;

    await this.page.mouse.move(x, y);
    await this.page.mouse.down();
    await this.page.mouse.move(x + 100, y);
    await this.page.mouse.move(x + 100, y + 100);
    await this.page.mouse.up();
  }

  // Getters
  async getSidebarMenuItems() {
    const items = this.page.locator('nb-sidebar li.menu-item > a .menu-title');
    const count = await items.count();

    const itemTexts = [];
    for (let i = 0; i < count; i++) {
      const text = await items.nth(i).innerText();
      itemTexts.push(text.trim());
    }

    return itemTexts;
  }

  async getTemperatureValue() {
    const valueLocator = this.page.locator('div.temperature');
    await valueLocator.waitFor({ state: 'visible' });
    const text = await valueLocator.textContent();
    return text.trim().split('°')[0];
  }

  // Assertions
  async expectedThemeSelected(themeText) {
    await expect(this.themeToggle).toHaveText(new RegExp(themeText, 'i'));
  }
}
