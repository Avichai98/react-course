# React Advanced Homework 4

### Step 0: Preparation

This project starts from commit `fc52823` and uses the FakeStore API (`https://fakestoreapi.com`) as its data source.

### Step 1: i18n Setup

*   **Locales Used**: English (`en`), Hebrew (`he`).
*   **Namespaces Used**: `common` (for general UI text), `products` (for product-related text).

### Step 2: Using i18n Features

*   **Interpolation**: Used on the products list page: `showing_products_other` key shows `"Showing {{count}} products"`.
*   **Pluralization**: Used the same key (`showing_products`) which automatically handles singular vs. plural based on the `count` variable.
*   **`<Trans />` Usage**: Used in the header for the "Made with <3..." text to demonstrate embedding HTML elements within a translation.

### Step 3: Language Switcher + Persistence

I added a language switcher to the header. When a language is selected, the choice is saved to `localStorage` under the key `language`. When the application loads, it checks for this key in `localStorage` and applies the saved language. If no language is found in storage, it defaults to English.

### Step 4: RTL Mode

When an RTL language is active, the `dir="rtl"` and `lang` attributes are set on the `<html>` element.

*   **RTL Issue 1 -> Fix**: The header elements (logo, nav, switcher) did not reverse their order in RTL mode. This was fixed by applying `flex-direction: row-reverse;` to the main header container when `dir="rtl"`.
*   **RTL Issue 2 -> Fix**: The "Language:" label in the language switcher remained on the left in RTL. This was also fixed using `flex-direction: row-reverse;` on the switcher's container to correctly position the label to the right of the buttons.

### Step 5: PrimeReact Setup + DataTable Conversion

The product list page was converted from a basic HTML list to a PrimeReact `DataTable`, driven by the data from TanStack Query.

*   **DataTable Features Implemented**:
    1.  **Sorting**: Users can sort the table by Title, Price, and Category.
    2.  **Pagination**: The table is paginated, showing 5 products per page.