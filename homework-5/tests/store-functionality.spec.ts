import { test, expect } from '@playwright/test';

test.describe('Store App Functionality', () => {
  test('displays products list with DataTable', async ({ page }) => {
    await page.goto('/');
    
    // Wait for products to load - look for PrimeReact DataTable
    await page.waitForSelector('.p-datatable', { timeout: 10000 });
    
    // Verify DataTable is visible
    const dataTable = page.locator('.p-datatable');
    await expect(dataTable).toBeVisible();
    
    // Check that products are loaded
    const rows = page.locator('.p-datatable-tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('product navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Wait for products to load
    await page.waitForSelector('.p-datatable', { timeout: 10000 });
    
    // Click on first product's "View Details" button or row
    const viewButton = page.locator('button').filter({ hasText: /view|details/i }).first();
    
    if (await viewButton.isVisible()) {
      await viewButton.click();
      
      // Should navigate to product detail page
      await expect(page).toHaveURL(/\/products\/\d+/);
    }
  });

  test('DataTable sorting functionality', async ({ page }) => {
    await page.goto('/');
    
    // Wait for products to load
    await page.waitForSelector('.p-datatable', { timeout: 10000 });
    
    // Look for sortable column headers
    const sortableHeaders = page.locator('.p-sortable-column');
    const headerCount = await sortableHeaders.count();
    
    if (headerCount > 0) {
      // Click on first sortable header
      await sortableHeaders.first().click();
      
      // Wait for sorting to complete
      await page.waitForTimeout(500);
      
      // Verify sorting indicator is visible
      const sortIcon = page.locator('.p-sortable-column-icon');
      await expect(sortIcon.first()).toBeVisible();
    }
  });
});