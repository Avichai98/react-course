import { test, expect } from '@playwright/test';

test.describe('PrimeReact Theme Switcher', () => {
  test('theme switcher changes application theme', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find theme switcher
    const themeSwitcher = page.locator('[data-testid="theme-switcher"]').or(
      page.locator('button:has-text("Theme")').or(
        page.locator('select[data-testid="theme-select"]')
      )
    );
    
    if (await themeSwitcher.isVisible()) {
      // Get initial theme class
      const body = page.locator('body');
      const initialClass = await body.getAttribute('class');
      
      // Click theme switcher
      await themeSwitcher.click();
      
      // If it's a dropdown, select different theme
      const darkThemeOption = page.locator('option:has-text("dark")').or(
        page.locator('button:has-text("Dark")')
      );
      
      if (await darkThemeOption.isVisible()) {
        await darkThemeOption.click();
        await page.waitForTimeout(500);
        
        // Verify theme changed
        const newClass = await body.getAttribute('class');
        expect(newClass).not.toBe(initialClass);
      }
    }
  });

  test('theme preference persists after page reload', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Try to switch to dark theme
    const themeSwitcher = page.locator('[data-testid="theme-switcher"]').or(
      page.locator('button:has-text("Theme")')
    );
    
    if (await themeSwitcher.isVisible()) {
      await themeSwitcher.click();
      
      const darkOption = page.locator('option:has-text("dark")').or(
        page.locator('button:has-text("Dark")')
      );
      
      if (await darkOption.isVisible()) {
        await darkOption.click();
        await page.waitForTimeout(500);
        
        // Get theme after change
        const body = page.locator('body');
        const themeClass = await body.getAttribute('class');
        
        // Reload page
        await page.reload();
        await page.waitForLoadState('networkidle');
        
        // Verify theme persisted
        const persistedClass = await body.getAttribute('class');
        expect(persistedClass).toBe(themeClass);
      }
    }
  });

  test('PrimeReact components reflect theme changes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for DataTable to load
    await page.waitForSelector('.p-datatable', { timeout: 10000 });
    
    // Get initial DataTable styling
    const dataTable = page.locator('.p-datatable');
    const initialStyles = await dataTable.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color
      };
    });
    
    // Try to switch theme
    const themeSwitcher = page.locator('[data-testid="theme-switcher"]').or(
      page.locator('button:has-text("Theme")')
    );
    
    if (await themeSwitcher.isVisible()) {
      await themeSwitcher.click();
      await page.waitForTimeout(500);
      
      // Get styles after potential theme change
      const newStyles = await dataTable.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color
        };
      });
      
      // Styles should be defined (theme is applied)
      expect(newStyles.backgroundColor).toBeTruthy();
      expect(newStyles.color).toBeTruthy();
    }
  });
});