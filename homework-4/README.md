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