# React Advanced Homework 4 - i18n + PrimeReact Store App

### Step 0: Preparation

Starting Advanced 1 from commit `fc52823`. API used: FakeStore API (`https://fakestoreapi.com`).

**API Structure**: All API calls and interfaces are properly organized in `/src/api/` folder:
- `products.ts` - Product fetching and Product interface
- `cart.ts` - Cart operations

### Step 1: i18n Setup

*   **Locales Used**: English (`en`), Hebrew (`he`) for RTL practice.
*   **Namespaces Used**: `common` (for general UI text), `products` (for product-related text).

### Step 2: Using i18n Features

*   **Interpolation**: Used on the products list page: `showing_products_other` key shows `"Showing {{count}} products"`.
*   **Pluralization**: Used the `showing_products` key which automatically handles singular vs. plural based on the `count` variable.
*   **`<Trans />` Usage**: Used in the header for the "Made with ❤️..." text to demonstrate embedding HTML elements within a translation.

### Step 3: Language Switcher + Persistence

I added a language switcher to the header. When a language is selected, the choice is saved to `localStorage` under the key `language`. When the application loads, it checks for this key in `localStorage` and applies the saved language. If no language is found in storage, it defaults to English.

### Step 4: RTL Mode

When Hebrew (RTL language) is active, the `dir="rtl"` and `lang` attributes are set on the `<html>` element.

*   **RTL Issue 1 -> Fix**: The header elements (logo, nav, switcher) did not reverse their order in RTL mode. This was fixed by applying `flex-direction: row-reverse;` to the main header container when `dir="rtl"`.
*   **RTL Issue 2 -> Fix**: The "Language:" label in the language switcher remained on the left in RTL. This was also fixed using `flex-direction: row-reverse;` on the switcher's container to correctly position the label to the right of the buttons.

### Step 5: PrimeReact Setup + DataTable Conversion

The product list page was converted from a basic HTML list to a PrimeReact `DataTable`, driven by the data from TanStack Query.

*   **DataTable Features Implemented**:
    1.  **Sorting**: Users can sort the table by Title, Price, and Category.
    2.  **Pagination**: The table is paginated, showing 5 products per page.

### Step 6: PrimeReact Theme Switch + Persistence

A theme switcher has been added to the header, allowing users to select from multiple PrimeReact themes.
*   **`localStorage` key**: `primereact-theme`
*   **Default Theme**: `Saga Blue (Light)`

### Current Implementation Status

✅ **Completed Requirements:**
- Routing setup with `/products` (list) and `/products/:id` (detail) pages
- i18n with English and Hebrew (RTL) support
- Namespaces: `common` and `products`
- Interpolation, pluralization, and `<Trans />` usage
- Language switcher with localStorage persistence
- RTL mode with layout fixes
- PrimeReact DataTable with sorting and pagination
- Theme switcher with persistence
- All translations properly implemented

🎉 **Bonus Tasks Completed:**

**Bonus A: Locale-aware Price Formatting**
- Implemented `Intl.NumberFormat` for currency formatting based on current locale
- Prices display correctly in both English ($10.99) and Hebrew (10.99 $) formats
- Applied to both ProductList DataTable and ProductDetail pages

**Bonus B: Complete Translation Coverage**
- All UI text is now translated (no hardcoded English strings)
- Cart sidebar fully translated including notifications
- Error messages, loading states, and empty states all use i18n
- Added interpolation for dynamic content like product names in notifications

🔧 **Technical Implementation:**
- Uses TanStack Query for data fetching (no duplicate server state)
- PrimeReact themes loaded via CDN
- Automatic RTL detection and DOM updates
- Proper TypeScript types throughout
- Locale-aware number formatting with Intl API