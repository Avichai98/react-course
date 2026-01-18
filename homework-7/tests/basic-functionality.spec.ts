import { test, expect } from '@playwright/test';

test.describe('Basic App Functionality', () => {
  test('application loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Basic check that the app loaded
    const html = page.locator('html');
    await expect(html).toBeVisible();
    
    // Should have some content
    const body = page.locator('body');
    await expect(body).not.toBeEmpty();
  });

  test('no JavaScript errors on page load', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Filter out network-related errors which are expected in some cases
    const criticalErrors = errors.filter(error => 
      !error.includes('Failed to fetch') &&
      !error.includes('NetworkError') &&
      !error.includes('net::ERR_') &&
      !error.toLowerCase().includes('timeout')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });

  test('page has proper document structure', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for basic HTML structure
    await expect(page.locator('html')).toHaveAttribute('lang');
    await expect(page.locator('head title')).not.toBeEmpty();
    await expect(page.locator('body')).toBeVisible();
  });

  test('React app mounts correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Look for React root element
    const root = page.locator('#root');
    await expect(root).toBeVisible();
    await expect(root).not.toBeEmpty();
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if we can navigate (look for any links or navigation)
    const links = page.locator('a[href]');
    const linkCount = await links.count();
    
    if (linkCount > 0) {
      // Try clicking the first internal link
      const firstLink = links.first();
      const href = await firstLink.getAttribute('href');
      
      if (href && !href.startsWith('http')) {
        await firstLink.click();
        await page.waitForLoadState('networkidle');
        
        // Should still be on the same domain
        expect(page.url()).toContain('localhost');
      }
    }
  });
});