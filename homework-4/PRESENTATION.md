# Advanced 1 - i18n + PrimeReact Store App

## Overview
A React store application demonstrating internationalization (i18n) with Hebrew RTL support and PrimeReact UI components.

## Live Demo Features

### 1. Multi-Language Support
- **Languages**: English and Hebrew
- **RTL Support**: Automatic right-to-left layout for Hebrew
- **Language Switcher**: Toggle between languages in header
- **Persistence**: Selected language saved in localStorage

### 2. Product Catalog
- **Product List**: DataTable with sorting and pagination
- **Product Details**: Individual product pages
- **Search & Filter**: Built-in DataTable functionality
- **Responsive Design**: Works on all screen sizes

### 3. Shopping Cart
- **Add to Cart**: From product list or detail page
- **Cart Sidebar**: Slide-out cart with item management
- **Notifications**: Success/error messages for actions
- **Persistence**: Cart items saved in localStorage

### 4. Theme System
- **Multiple Themes**: Light and dark PrimeReact themes
- **Theme Switcher**: Dropdown in header
- **Persistence**: Selected theme saved in localStorage

## Technical Implementation

### i18n Features Demonstrated
- **Namespaces**: Separate translation files for different sections
- **Interpolation**: Dynamic content in translations (`{{count}} products`)
- **Pluralization**: Automatic singular/plural handling
- **Trans Component**: HTML formatting within translations
- **Locale-aware Formatting**: Currency formatting per locale

### PrimeReact Integration
- **DataTable**: Sortable columns, pagination, filtering
- **Buttons**: Various styles and states
- **Dropdown**: Theme and language selection
- **Icons**: PrimeIcons throughout the interface

### Architecture
- **Clean API Layer**: Separated data fetching from UI components
- **Type Safety**: Full TypeScript implementation
- **State Management**: Zustand for cart and notifications
- **Routing**: React Router for navigation

## How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Key Files Structure

```
src/
├── api/                 # API calls and interfaces
├── components/          # React components
├── locales/            # Translation files
│   ├── en/             # English translations
│   └── he/             # Hebrew translations
├── stores/             # Zustand state management
└── i18n.ts             # i18n configuration
```

## Demo Flow

1. **Language Toggle**: Switch between English/Hebrew to see RTL layout
2. **Product Browsing**: Sort and paginate through products
3. **Add to Cart**: Add items and see notifications
4. **Cart Management**: Open cart sidebar, remove items
5. **Theme Switching**: Change between light/dark themes
6. **Navigation**: Browse product details and return to list

## Bonus Features Implemented

- **Locale-aware Price Formatting**: Prices display correctly per locale
- **Complete Translation Coverage**: No hardcoded English strings
- **RTL Layout Fixes**: Proper Hebrew interface layout
- **Persistent Preferences**: All user choices saved and restored

## Technologies Used

- React 19 with TypeScript
- React Router for navigation
- TanStack Query for data fetching
- PrimeReact UI components
- i18next for internationalization
- Zustand for state management
- Vite for build tooling