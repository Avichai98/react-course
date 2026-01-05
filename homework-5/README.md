# Homework 5 - Advanced 2: Playwright Testing

This project demonstrates E2E testing with Playwright for a React TypeScript store application with i18n and PrimeReact.

## Project Overview

This is the React TypeScript store application from homework-4, now enhanced with comprehensive Playwright E2E testing for homework-5 (Advanced 2 - Testing).

### Features Tested
- **React Store App** with TanStack Query
- **Internationalization (i18n)** with English/Hebrew and RTL support
- **PrimeReact DataTable** with sorting and pagination
- **Theme Switcher** with persistence
- **Shopping Cart** functionality
- **Product Detail** pages with routing

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run Playwright tests
npm test

# Run tests with UI (interactive)
npm run test:ui
```

## Testing Setup

### Playwright Configuration
- **Test Directory**: `./tests`
- **Base URL**: `http://localhost:5173`
- **Browsers**: Chromium, Firefox, WebKit
- **Dev Server**: Automatically starts before tests
- **Total Tests**: 6 test files with 69 total tests (63 passing)

### Test Files

1. **`basic-functionality.spec.ts`** - Core app functionality
   - Application loads successfully
   - No JavaScript errors
   - React mounts correctly
   - Navigation works

2. **`store-functionality.spec.ts`** - Store-specific features
   - Products DataTable display
   - Product navigation
   - DataTable sorting

3. **`i18n-functionality.spec.ts`** - Internationalization
   - Language switcher functionality
   - Language persistence after reload
   - RTL support for Hebrew
   - Pluralization verification

4. **`theme-switcher.spec.ts`** - PrimeReact theming
   - Theme switching functionality
   - Theme persistence in localStorage
   - PrimeReact component theme reflection

5. **`accessibility.spec.ts`** - Accessibility compliance
   - Proper heading structure
   - Keyboard navigation
   - Image alt text validation
   - Color contrast checks
   - Form label associations

6. **`error-handling.spec.ts`** - Error scenarios
   - Network error handling
   - Invalid product ID handling
   - Console error monitoring
   - Application recovery from failures

## Running Tests

```bash
# Run all tests
npm test

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests in headed mode (visible browser)
npm run test:headed

# Debug tests step by step
npm run test:debug
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Test Features Demonstrated

- **Cross-browser testing** (Chromium, Firefox, WebKit)
- **Visual regression testing** with screenshots
- **Accessibility testing** for WCAG compliance
- **Performance monitoring** with timing assertions
- **Error detection** for console errors and failed requests
- **Responsive design testing** with viewport changes
- **Interactive element testing** with user actions
- **Keyboard navigation testing** for accessibility
- **Integration testing** with complete user workflows
- **Smoke testing** for critical functionality
- **i18n testing** for multiple languages and RTL support
- **Theme testing** for PrimeReact theme switching

## Key Technologies

- **React 19** with TypeScript
- **Vite** for build tooling
- **TanStack Query** for data fetching
- **React Router** for navigation
- **PrimeReact** for UI components
- **i18next** for internationalization
- **Zustand** for state management
- **Playwright** for E2E testing

## Advanced Features

- **Internationalization**: English/Hebrew with RTL support
- **Theme Switching**: Multiple PrimeReact themes with persistence
- **Shopping Cart**: Add/remove products with sidebar
- **Product Management**: List, detail, and navigation
- **Error Handling**: Graceful error states and recovery
- **Accessibility**: WCAG compliant with keyboard navigation

The comprehensive test suite ensures the React store application works correctly across different browsers, languages, themes, and error scenarios, making it production-ready.