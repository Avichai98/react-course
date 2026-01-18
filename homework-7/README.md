# Nx Monorepo - React E-commerce App

## 🚀 How to Run

```bash
npx nx serve homework-5    # Development
npx nx build homework-5    # Build
npx nx lint homework-5     # Lint
npx nx e2e homework-5      # Test (E2E)
```

## 📁 Workspace Structure

**Apps:**
- `homework-5` - React e-commerce app with product catalog, cart, i18n

**Libs:**
- `libs/ui` - Reusable UI components (ToastHost, GlobalLoadingIndicator, AppCard)
- `libs/hooks` - TanStack Query hooks (useProducts, useCart, useLocalStorage)
- `libs/i18n` - Internationalization setup and LanguageSwitcher

## 🏗 Architecture Rules (Module Boundaries)

```
type:ui → type:hooks, type:i18n
type:hooks → (none)
type:i18n → (none)
apps → type:ui, type:hooks, type:i18n
```

## 📊 Affected Demo

**Change:** Modified UI lib AppCard component border-radius from 12px to 16px

```bash
$ npx nx show projects --affected
homework-5
hooks
i18n
ui

$ npx nx affected --graph -t build
NX   Affected criteria defaulted to --base=main --head=HEAD
NX   Project graph started at http://127.0.0.1:4211/tasks?targets=build&projects=homework-5

$ npx nx affected -t build
NX   Running target build for project homework-5 and 3 tasks it depends on:
> nx run ui:"vite:build"
> nx run hooks:"vite:build"  
> nx run i18n:"vite:build"
> nx run homework-5:"vite:build"
NX   Successfully ran target build for project homework-5 (12s)
```

## 🎯 Stretch Task: Nx Speed + Caching

```bash
npm run lint:all       # nx run-many -t lint --all
npm run check:affected # nx affected -t lint,test,build
npm run ci            # nx affected --base=origin/main --head=HEAD

# Caching demo:
$ npm run lint:all
   √  nx run homework-5:lint (5s)    # First run
$ npm run lint:all  
   √  nx run homework-5:lint (3s)    # Cached - 40% faster!
```
i18n
ui

# Run affected build
$ npx nx affected -t build
 NX   Affected criteria defaulted to --base=main --head=HEAD

   √  nx run homework-5:build (7s)
                                                                                        
——————————————————————————————————————————————————————————————————————————————————————— 
                                                                                        
 NX   Successfully ran target build for project homework-5 (7s)
```

**Result**: Only the main app needed to rebuild because it depends on the UI lib. Nx intelligently skipped unchanged projects, demonstrating dependency-aware build optimization.

## 🎯 Nx Features Demonstrated

- ✅ Project graph visualization (`npx nx graph`)
- ✅ Module boundary enforcement with @nx/enforce-module-boundaries
- ✅ Affected command optimization (`npx nx affected`)
- ✅ Buildable libraries with proper npm-scoped aliases (@homework-7/*)
- ✅ Integrated linting, building, and testing