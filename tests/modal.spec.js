const { test, expect } = require('@playwright/test');

test.describe('Modal and Footer logic (modal.js)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a page that includes modal.js and the related HTML elements.
    // Index.html contains them.
    await page.goto('http://localhost:8000/index.html');
  });

  test('Modal opens when contact button is clicked and sets focus to close button', async ({ page }) => {
    const contactBtn = page.locator('#contactBtn');
    const modal = page.locator('#contactModal');
    const overlay = page.locator('#modalOverlay');
    const closeModalBtn = page.locator('#closeModal');

    // Initially modal and overlay should be hidden (hidden attribute is present)
    await expect(modal).toBeHidden();
    await expect(overlay).toBeHidden();

    // Click to open modal
    await contactBtn.click();

    // Now they should be visible
    await expect(modal).toBeVisible();
    await expect(overlay).toBeVisible();
    await expect(modal).not.toHaveAttribute('hidden', '');
    await expect(overlay).not.toHaveAttribute('hidden', '');

    // Focus should be set on the close button
    await expect(closeModalBtn).toBeFocused();
  });

  test('Modal closes when close button is clicked and returns focus to contact button', async ({ page }) => {
    const contactBtn = page.locator('#contactBtn');
    const modal = page.locator('#contactModal');
    const overlay = page.locator('#modalOverlay');
    const closeModalBtn = page.locator('#closeModal');

    // Open first
    await contactBtn.click();
    await expect(modal).toBeVisible();

    // Click close button
    await closeModalBtn.click();

    // Should be hidden again
    await expect(modal).toBeHidden();
    await expect(overlay).toBeHidden();

    // Focus returns to open button
    await expect(contactBtn).toBeFocused();
  });

  test('Modal closes when overlay is clicked and returns focus to contact button', async ({ page }) => {
    const contactBtn = page.locator('#contactBtn');
    const modal = page.locator('#contactModal');
    const overlay = page.locator('#modalOverlay');

    // Open first
    await contactBtn.click();
    await expect(modal).toBeVisible();

    // Click overlay
    // Use position or force click since overlay might be underneath something else or we want to hit the overlay specifically
    await overlay.click({ position: { x: 10, y: 10 } });

    // Should be hidden again
    await expect(modal).toBeHidden();
    await expect(overlay).toBeHidden();

    // Focus returns to open button
    await expect(contactBtn).toBeFocused();
  });

  test('Copyright year is updated automatically', async ({ page }) => {
    const copyrightYear = page.locator('#copyright-year');

    // Get the current year as a string
    const currentYear = new Date().getFullYear().toString();

    // Check if the text matches the current year
    await expect(copyrightYear).toHaveText(currentYear);
  });
});
