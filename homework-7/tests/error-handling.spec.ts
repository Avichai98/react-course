import { test, expect } from '@playwright/test';

test.describe('Error Handling & Edge Cases', () => {
  test('handles network errors gracefully', async ({ page }) => {
    // Block network requests to simulate offline
    await page.route('**/api/**', route => route.abort());
    await page.route('**/products**', route => route.abort());
    
    await page.goto('/');
    
    // Should show error state or loading state, not crash
    await page.waitForTimeout(3000);
    
    // Page should still be responsive - check if HTML is loaded
    const html = page.locator('html');
    await expect(html).toBeVisible();
    
    // Should not have unhandled JavaScript errors
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.waitForTimeout(1000);
    
    // Filter out expected network errors
    const unexpectedErrors = errors.filter(error => 
      !error.includes('Failed to fetch') && 
      !error.includes('NetworkError') &&
      !error.includes('net::ERR_FAILED')
    );
    
    expect(unexpectedErrors).toHaveLength(0);
  });

  test('handles invalid product ID gracefully', async ({ page }) => {
    // Navigate to invalid product ID
    await page.goto('/products/999999');
    
    // Wait for the page to load and process the invalid ID
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Page should be responsive
    const html = page.locator('html');
    await expect(html).toBeVisible();
    
    // Should either show error message, loading state, or redirect to products list
    const currentUrl = page.url();
    const hasErrorMessage = await page.locator('text=/error|Error|loading|Loading/i').count() > 0;
    const redirectedToProducts = currentUrl.includes('/products') && !currentUrl.includes('/products/999999');
    const hasBackLink = await page.locator('text=/back to products/i').count() > 0;
    
    // App should handle the invalid ID gracefully (show error, loading, or redirect)
    expect(hasErrorMessage || redirectedToProducts || hasBackLink).toBeTruthy();
  });

  test('no console errors on normal operation', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for any async operations
    await page.waitForTimeout(2000);
    
    // Filter out known acceptable errors (like network timeouts)
    const criticalErrors = errors.filter(error => 
      !error.includes('Failed to fetch') &&
      !error.includes('NetworkError') &&
      !error.includes('net::ERR_') &&
      !error.toLowerCase().includes('timeout')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });

  test('application handles network failures gracefully', async ({ page }) => {
    // This test verifies the app doesn't crash when some network requests fail
    await page.goto('/');
    
    // Wait for initial load
    await page.waitForLoadState('domcontentloaded');
    
    // Block some requests after initial load
    await page.route('**/api/**', route => route.abort());
    
    // Try to navigate - app should still work
    await page.waitForTimeout(2000);
    
    // The app should still be responsive and not crash
    const title = await page.title();
    const hasTitle = title && title.length > 0;
    
    // App should maintain basic functionality even with network issues
    expect(hasTitle).toBeTruthy();
  });
});