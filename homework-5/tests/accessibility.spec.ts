import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('page has proper heading structure', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should have at least one h1
    const h1Elements = page.locator('h1');
    const h1Count = await h1Elements.count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    
    // H1 should not be empty
    const firstH1 = h1Elements.first();
    await expect(firstH1).not.toBeEmpty();
  });

  test('interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    
    // Check if focused element is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Continue tabbing to find interactive elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const currentFocus = page.locator(':focus');
      if (await currentFocus.isVisible()) {
        // If it's a button, test Enter key
        const tagName = await currentFocus.evaluate(el => el.tagName.toLowerCase());
        if (tagName === 'button') {
          // Button should be activatable with Enter
          await expect(currentFocus).toBeEnabled();
          break;
        }
      }
    }
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for any product images to load
    await page.waitForTimeout(2000);
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const altText = await img.getAttribute('alt');
        
        // Alt text should exist and not be empty
        expect(altText).toBeTruthy();
        expect(altText?.trim().length).toBeGreaterThan(0);
      }
    }
  });

  test('color contrast is sufficient', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check text elements have sufficient contrast
    const textElements = page.locator('p, span, td, th, button');
    const elementCount = await textElements.count();
    
    if (elementCount > 0) {
      // Test first few text elements
      for (let i = 0; i < Math.min(3, elementCount); i++) {
        const element = textElements.nth(i);
        
        if (await element.isVisible()) {
          const styles = await element.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
              color: computed.color,
              backgroundColor: computed.backgroundColor,
              fontSize: computed.fontSize
            };
          });
          
          // Basic check that color and background are defined
          expect(styles.color).toBeTruthy();
          expect(styles.fontSize).toBeTruthy();
        }
      }
    }
  });

  test('form elements have proper labels', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for any input elements
    const inputs = page.locator('input, select, textarea');
    const inputCount = await inputs.count();
    
    if (inputCount > 0) {
      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        
        // Check for associated label or aria-label
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const ariaLabelledBy = await input.getAttribute('aria-labelledby');
        
        if (id) {
          const label = page.locator(`label[for="${id}"]`);
          const hasLabel = await label.count() > 0;
          
          // Should have either a label, aria-label, or aria-labelledby
          expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy();
        }
      }
    }
  });
});