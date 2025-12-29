# Advanced 1 - Requirements Implementation Guide

## Step 0 - Prep (Choose A or B)

### ✅ Path A - Continue from existing app
**Location**: `homework-4/` folder
**Implementation**: 
- Built on existing Vite React + TypeScript app
- Uses TanStack Query for data fetching
- Routes: `/products` (list) and `/products/:id` (detail)
- API: FakeStore API (`https://fakestoreapi.com`)

**Files to check**:
- `src/App.tsx` - Main routing setup
- `src/api/products.ts` - API integration
- `package.json` - Dependencies

---

## Step 1 - i18n Setup (Namespaces + 2 languages)

### ✅ Install + initialize
**Location**: `src/i18n.ts`
**Implementation**: 
- Installed `i18next` and `react-i18next`
- Initialized in `src/i18n.ts` and loaded in `src/main.tsx`

### ✅ Namespaces (required)
**Location**: `src/locales/`
**Implementation**:
- `common` namespace: `src/locales/en/common.json` & `src/locales/he/common.json`
- `products` namespace: `src/locales/en/products.json` & `src/locales/he/products.json`

### ✅ Two languages (required)
**Languages**: English (`en`) + Hebrew (`he`)
**Files to check**:
- `src/locales/en/` - English translations
- `src/locales/he/` - Hebrew translations

---

## Step 2 - Use i18n for real (required features)

### ✅ Interpolation
**Location**: `src/components/ProductList/index.tsx` (line ~95)
**Example**: `t("showing_products", { count: data.length })`
**Translation**: `"Showing {{count}} products"`

### ✅ Pluralization
**Location**: Same as above
**Implementation**: Uses `showing_products_one` and `showing_products_other` keys
**Files**: `src/locales/*/products.json`

### ✅ One <Trans /> usage
**Location**: `src/components/Header/index.tsx` (line ~25)
**Example**: `<Trans i18nKey="powered_by" ns="common" />`
**Translation**: `"Powered by <1>React</1> & <2>PrimeReact</2>"`

**Where to find translations**:
- `src/components/ProductList/index.tsx` - Product list page
- `src/components/ProductDetail/index.tsx` - Product detail page
- `src/components/Header/index.tsx` - Header/navigation
- `src/components/Cart/index.tsx` - Cart sidebar

---

## Step 3 - Language Switcher + Persistence

### ✅ Language switcher in header
**Location**: `src/components/Header/LanguageSwitcher.tsx`
**Implementation**: Buttons for EN/HE in header

### ✅ Switching updates UI immediately
**Location**: `src/components/Header/LanguageSwitcher.tsx` (line ~15)
**Function**: `changeLanguage(lng: string)`

### ✅ Persist in localStorage
**Location**: `src/i18n.ts` (lines 18-20, 25-27)
**Key**: `'language'`
**Implementation**: Saves on change, restores on load

---

## Step 4 - RTL Mode (Hebrew)

### ✅ RTL language detection
**Location**: `src/i18n.ts` (lines 25-35)
**Implementation**: Sets `document.documentElement.dir = "rtl"` for Hebrew

### ✅ Layout fixes
**Location**: `src/App.css` (lines 150+)
**Fixes implemented**:
1. Header elements reverse order: `[dir="rtl"] .header-content { flex-direction: row-reverse; }`
2. Language switcher alignment: `[dir="rtl"] .language-switcher { flex-direction: row-reverse; }`

---

## Step 5 - PrimeReact Setup + DataTable Conversion

### ✅ Install PrimeReact
**Location**: `package.json`
**Dependencies**: `primereact`, `primeicons`
**CSS**: Loaded via CDN in `index.html`

### ✅ DataTable with required columns
**Location**: `src/components/ProductList/index.tsx` (lines 85-95)
**Columns**:
- Title (sortable)
- Price (sortable, with custom template)
- Category (sortable)
- Image (custom template)
- Action (View Details + Add to Cart buttons)

### ✅ DataTable features (2 required)
**Location**: Same file
**Features implemented**:
1. **Sorting**: `sortMode="multiple"` on Title, Price, Category
2. **Pagination**: `paginator rows={5}` - shows 5 products per page

---

## Step 6 - PrimeReact Theme Switch + Persistence

### ✅ Theme switcher in header
**Location**: `src/components/ThemeSwitcher/index.tsx`
**Implementation**: PrimeReact Dropdown component

### ✅ Multiple themes
**Location**: Same file (lines 10-14)
**Themes**: Saga Blue (Light), Vela Blue (Dark), Arya Orange (Dark)

### ✅ Persistence
**Location**: Same file (lines 16, 30-35)
**Key**: `'primereact-theme'`
**Implementation**: Saves theme file name, loads CSS dynamically

---

## Bonus Tasks

### ✅ Bonus A: Locale-aware price formatting
**Location**: 
- `src/components/ProductList/index.tsx` (lines 65-72)
- `src/components/ProductDetail/index.tsx` (lines 20-27)
- `src/components/Cart/index.tsx` (lines 15-22)

**Implementation**: `Intl.NumberFormat(i18n.language, { style: 'currency', currency: 'USD' })`

### ✅ Bonus B: Complete translation coverage
**Files to check**:
- All UI text uses `t()` function
- No hardcoded English strings
- Error messages, loading states, notifications all translated
- Cart sidebar fully translated

---

## Demo Script

### 1. Show Language Switching
1. Open app at `http://localhost:5174/products`
2. Click EN/HE buttons in header
3. Show RTL layout change
4. Refresh page - language persists

### 2. Show i18n Features
1. Point to product count: "Showing X products" (interpolation)
2. Change language to see pluralization
3. Point to footer: "Powered by React & PrimeReact" (Trans component)

### 3. Show DataTable Features
1. Click column headers to sort
2. Use pagination at bottom
3. Show responsive design

### 4. Show Theme Switching
1. Use theme dropdown in header
2. Show visual changes
3. Refresh page - theme persists

### 5. Show Cart Functionality
1. Add items to cart
2. Open cart sidebar
3. Show notifications
4. Show locale-aware pricing

---

## File Structure for Review

```
homework-4/
├── src/
│   ├── api/
│   │   ├── products.ts          # API calls & Product interface
│   │   └── cart.ts              # Cart API
│   ├── components/
│   │   ├── Header/
│   │   │   ├── index.tsx        # Header with switchers
│   │   │   └── LanguageSwitcher.tsx  # Language buttons
│   │   ├── ProductList/
│   │   │   └── index.tsx        # DataTable implementation
│   │   ├── ProductDetail/
│   │   │   └── index.tsx        # Product detail page
│   │   ├── ThemeSwitcher/
│   │   │   └── index.tsx        # Theme dropdown
│   │   └── Cart/
│   │       └── index.tsx        # Cart sidebar
│   ├── locales/
│   │   ├── en/                  # English translations
│   │   └── he/                  # Hebrew translations
│   ├── stores/                  # Zustand state management
│   ├── App.tsx                  # Main routing
│   ├── i18n.ts                  # i18n configuration
│   └── main.tsx                 # App entry point
├── index.html                   # PrimeReact CSS loading
└── package.json                 # Dependencies
```