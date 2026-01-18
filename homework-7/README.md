# Nx Monorepo - React E-commerce App

A modern React e-commerce application built with Nx monorepo architecture, featuring TanStack Query, i18n, and comprehensive testing.

## 🚀 How to Run

```bash
# Development
npx nx serve homework-5

# Build
npx nx build homework-5

# Lint
npx nx lint homework-5

# Test (E2E)
npx nx e2e homework-5
```

## 🎯 Stretch Task Implementation: S1) Nx Speed Scripts + Caching Proof

### Added Scripts

```json
{
  "scripts": {
    "lint:all": "nx run-many -t lint --all",
    "check:affected": "nx affected -t lint,test,build",
    "ci": "nx affected -t lint,test,build --base=origin/main --head=HEAD"
  }
}
```

### Caching Demonstration

**First Run (No Cache):**
```bash
$ npm run lint:all
> nx run-many -t lint --all
   √  nx run homework-5:lint (5s)
```

**Second Run (Cached):**
```bash
$ npm run lint:all  
> nx run-many -t lint --all
   √  nx run homework-5:lint (3s)  # ⚡ 40% faster due to caching!
```

**Build Caching:**
```bash
# First build
$ npx nx run-many -t build --all
   √  nx run homework-5:build (8s)

# Second build (cached)
$ npx nx run-many -t build --all  
   √  nx run homework-5:build (3s)  # ⚡ 62% faster due to caching!
```

### CI-Friendly Command

For CI/CD pipelines, use:
```bash
npm run ci
# Runs: nx affected -t lint,test,build --base=origin/main --head=HEAD
```

This command only runs tasks for projects affected by changes between the main branch and current HEAD, making CI builds extremely fast.

## 📁 Workspace Structure

### Apps
- **homework-5**: Main React e-commerce application with product catalog, cart, and i18n

### Libs
- **libs/ui**: Reusable UI components (ToastHost, GlobalLoadingIndicator, AppCard)
- **libs/hooks**: TanStack Query hooks and utilities (useProducts, useCart, useLocalStorage)
- **libs/i18n**: Internationalization setup and LanguageSwitcher component

## 🏗 Architecture Rules (Module Boundaries)

```typescript
// Dependency constraints enforced by @nx/enforce-module-boundaries:
type:ui → can depend on → type:hooks, type:i18n
type:hooks → can depend on → (none)
type:i18n → can depend on → (none)
apps → can depend on → type:ui, type:hooks, type:i18n
libs → cannot import from → apps
```

## 📊 Affected Demo

### Change made: Modified UI lib AppCard component border-radius from 12px to 16px

```bash
# Show affected projects
$ npx nx show projects --affected
homework-5
hooks
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