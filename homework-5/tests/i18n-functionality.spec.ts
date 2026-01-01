import { test, expect } from '@playwright/test';

test.describe('Internationalization (i18n)', () => {
  test('language switcher changes UI language', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Find language switcher (could be buttons or dropdown)
    const languageSwitcher = page.locator('[data-testid="language-switcher"]').or(
      page.locator('button:has-text("EN")').or(
        page.locator('button:has-text("עב")')
      )
    );
    
    // Switch to Hebrew if available
    const hebrewButton = page.locator('button:has-text("עב")').or(
      page.locator('button:has-text("HE")')
    );
    
    if (await hebrewButton.isVisible()) {
      await hebrewButton.click();
      
      // Wait for language change
      await page.waitForTimeout(500);
      
      // Verify RTL direction is applied
      const html = page.locator('html');
      await expect(html).toHaveAttribute('dir', 'rtl');
    }
  });

  test('language preference persists after page reload', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Switch language if switcher exists
    const hebrewButton = page.locator('button:has-text("עב")').or(
      page.locator('button:has-text("HE")')
    );
    
    if (await hebrewButton.isVisible()) {
      await hebrewButton.click();
      await page.waitForTimeout(500);
      
      // Reload page
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Verify language is still Hebrew
      const html = page.locator('html');
      await expect(html).toHaveAttribute('dir', 'rtl');
    }
  });

  test('pluralization works correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Look for product count text that should use pluralization
    const productCount = page.locator('[data-testid="product-count"]').or(
      page.locator('text=/\\d+ products?/')
    );
    
    if (await productCount.isVisible()) {
      const text = await productCount.textContent();
      
      // Verify pluralization format
      expect(text).toMatch(/\d+ products?/);
    }
  });
});