import { expect } from '@playwright/test';

export class FormsPage {

    // Constructor + Locators
    constructor(page) {
        this.page = page;

        // Navigation locators 
        this.formsMenu = page.getByRole('link', { name: 'Forms' });
        this.formLayoutsSubmenu = page.getByRole('link', { name: 'Form Layouts' });

        // Inline form
        this.inlineFormHeader = page.getByText('Inline form', { exact: true });
        this.inlineFormContainer = this.inlineFormHeader.locator('..').locator('..');
        this.nameInput = page.getByPlaceholder('Jane Doe');
        this.emailInput = page.getByPlaceholder('Email').first();
        this.rememberMeCheckbox = page.getByLabel('Remember me').first();
        this.submitButton = page.getByRole('button', { name: 'Submit' }).first();

        // Using the Grid Form
        this.usingGridCard = page.locator('nb-card:has(nb-card-header:has-text("Using the Grid"))');
        this.gridEmailInput = this.usingGridCard.getByPlaceholder('Email');
        this.gridPasswordInput = this.usingGridCard.getByPlaceholder('Password');
        this.gridRadioOption = this.usingGridCard.getByLabel('Option 2');  // change to Option 1 if needed
        this.gridSignInButton = this.usingGridCard.getByRole('button', { name: 'Sign in' });

        // Form without labels
        this.noLabelsCard = page.locator('nb-card:has(nb-card-header:has-text("Form without labels"))');
        this.recipientsInput = this.noLabelsCard.getByPlaceholder('Recipients');
        this.subjectInput = this.noLabelsCard.getByPlaceholder('Subject');
        this.messageInput = this.noLabelsCard.getByPlaceholder('Message');
        this.sendButton = this.noLabelsCard.getByRole('button', { name: 'Send' });
        this.noLabelsForm = this.noLabelsCard.locator('form');
    }
    // Navigation
    async navigateToFormsLayouts() {
        await this.formsMenu.click();
        await this.formLayoutsSubmenu.click();
    }

    // Actions
    async submitInlineForm(name, email, checkRememberMe = true) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        if (checkRememberMe) {
            await this.rememberMeCheckbox.check({ force: true });
        }
        await this.submitButton.click();
    }

    async submitUsingGridForm(email, password, radioLabel = 'Option 2') {
        await this.gridEmailInput.fill(email);
        await this.gridPasswordInput.fill(password);
        await this.usingGridCard.getByLabel(radioLabel).check({ force: true });
        await this.gridSignInButton.click();
    }

    async submitFormWithoutLabels(recipients, subject, message) {
        await this.recipientsInput.fill(recipients);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
        await this.sendButton.click();
    }

    // Assertions
    async assertInlineFormIsVisible() {
        await expect(this.inlineFormContainer).toBeVisible();
    }

    async assertUsingGridFormIsVisible() {
        await expect(this.usingGridCard).toBeVisible();
    }

    async assertNoLabelsFormIsVisible() {
        await expect(this.noLabelsCard).toBeVisible();
    }

    async assertNoLabelsFormWasSubmitted() {
        await expect(this.noLabelsForm).toHaveClass(/ng-submitted/);
    }
}