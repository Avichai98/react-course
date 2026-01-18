# Playwright E2E Testing for React Store App

This document describes the Playwright testing setup for the homework-4 React TypeScript store application with i18n and PrimeReact.

## Test Overview

**Total Tests**: 5 test files covering critical functionality of the store application.

### Test Files

1. **`tests/store-functionality.spec.ts`** - Core store features
   - Products list display with PrimeReact DataTable
   - Product navigation and routing
   - DataTable sorting functionality

2. **`tests/i18n-functionality.spec.ts`** - Internationalization
   - Language switcher functionality
   - Language persistence after page reload
   - Pluralization verification

3. **`tests/theme-switcher.spec.ts`** - PrimeReact theming
   - Theme switching functionality
   - Theme persistence in localStorage
   - PrimeReact component theme reflection

4. **`tests/accessibility.spec.ts`** - Accessibility compliance
   - Proper heading structure
   - Keyboard navigation
   - Image alt text validation
   - Color contrast checks
   - Form label associations

5. **`tests/error-handling.spec.ts`** - Error scenarios
   - Network error handling
   - Invalid product ID handling
   - Console error monitoring
   - Application recovery from failures

## Running Tests

```bash
# Install dependencies (if not already installed)
npm install

# Run all tests
npm test

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests in headed mode (visible browser)
npm run test:headed

# Debug tests step by step
npm run test:debug
```

## Test Configuration

- **Base URL**: `http://localhost:5173`
- **Browsers**: Chromium, Firefox, WebKit
- **Auto-start dev server**: Yes
- **Parallel execution**: Enabled
- **Retries on CI**: 2 attempts

## Key Features Tested

### Store Functionality
- ✅ Products list loads with DataTable
- ✅ Product detail navigation works
- ✅ DataTable sorting is functional
- ✅ Product images and data display correctly

### Internationalization (i18n)
- ✅ Language switcher changes UI language
- ✅ RTL support for Hebrew language
- ✅ Language preference persists after reload
- ✅ Pluralization works correctly

### PrimeReact Theming
- ✅ Theme switcher changes application appearance
- ✅ Theme preference persists in localStorage
- ✅ PrimeReact components reflect theme changes

### Accessibility
- ✅ Proper heading structure (h1, h2, etc.)
- ✅ Keyboard navigation support
- ✅ Images have descriptive alt text
- ✅ Sufficient color contrast
- ✅ Form elements have proper labels

### Error Handling
- ✅ Graceful handling of network failures
- ✅ Invalid URLs don't crash the app
- ✅ No unhandled JavaScript errors
- ✅ Application recovers from temporary failures

## Test Data Requirements

The tests expect:
- Products API endpoint returning product data
- At least one product with image, title, price, and category
- Language switcher with English and Hebrew options
- Theme switcher with multiple theme options
- Proper routing for `/products` and `/products/:id`

## Continuous Integration

Tests are configured to run in CI environments with:
- Automatic browser installation
- Retry logic for flaky tests
- HTML report generation
- Artifact collection for failed tests

## Troubleshooting

### Common Issues

1. **Tests timeout waiting for products**
   - Ensure API endpoint is accessible
   - Check network connectivity
   - Verify TanStack Query configuration

2. **Language switcher not found**
   - Ensure `data-testid="language-switcher"` is added to component
   - Or tests will fallback to button text matching

3. **Theme switcher not working**
   - Verify theme switcher has proper test ID
   - Check localStorage persistence implementation

4. **DataTable not loading**
   - Ensure `data-testid="products-table"` is added
   - Verify PrimeReact DataTable is properly configured

### Adding Test IDs

For better test reliability, add these data-testid attributes:

```tsx
// Language switcher
<button data-testid="language-switcher">EN</button>

// Theme switcher
<select data-testid="theme-switcher">...</select>

// Products table
<DataTable data-testid="products-table">...</DataTable>

// Product count
<span data-testid="product-count">{count} products</span>
```

## Best Practices

1. **Wait for network requests**: Tests wait for `networkidle` state
2. **Graceful fallbacks**: Tests use multiple selectors as fallbacks
3. **Error filtering**: Network errors are filtered from console error checks
4. **Cross-browser testing**: All tests run on Chromium, Firefox, and WebKit
5. **Accessibility focus**: Comprehensive a11y testing included

This testing suite ensures your React store application works correctly across different browsers, languages, themes, and error scenarios.