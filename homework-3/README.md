# Homework 3: Global Client State + Persistence + Notifications

This document contains the notes and deliverables for the homework assignment.

---

## Step 1 — State Inventory

The state inventory for this project can be found in the [State-Inventory.md](./State-Inventory.md) file.

---

## Step 2 — Context-Based Sidebar (Global UI State)

### Context Design

*   **Context Fields:** The context provides a boolean field `isCartOpen`.
*   **Context Actions:** It exposes three functions to control the state: `openCart()`, `closeCart()`, and `toggleCart()`.

### Implementation Screenshot

*(Here you would add a screenshot or GIF of the sidebar opening and closing)*

---

## Step 3 — Persist Sidebar with a Custom localStorage Hook

### Custom Hook Description

The `useLocalStorage` custom hook works like `useState` but initializes its value by reading from `localStorage` and uses an `useEffect` to write any changes back to `localStorage`. This ensures the state persists across page refreshes. It is used inside the `CartSidebarProvider` to manage the `isCartOpen` state.

### Persistence Test Results

*   “Opened sidebar, refreshed → still open”
*   “Closed sidebar, refreshed → still closed”

---

## Step 4 — Global Toast Store (Zustand)

### Library Choice

*   **Library:** Zustand
*   **Reason:** I chose Zustand because it is a very lightweight and simple state management library. It uses a hook-based API that doesn't require wrapping the application in a context provider, which makes it ideal for managing global state that is not directly tied to a specific component subtree, like notifications.
*   **Store Location:** `src/stores/notifications.ts`

### Store Design

*   **Notification Shape:** A notification object includes an `id` (number), `type` ('success' | 'error' | 'info'), and a `message` (string).
*   **Store API:** The store exposes the list of `notifications` and provides actions to `addNotification(notification)`, `removeNotification(id)`, and `clearAll()`.

### Implementation Screenshot

![success](image.png)
![error](image-1.png)

---

## Step 5 — Connect Toasts to Real Events

### Success Toasts

The `useMutation` hook from TanStack Query provides an `onSuccess` callback. This callback is used to trigger our Zustand `addNotification` action, showing a "success" toast when the mock API call resolves successfully.

### Error Toasts

Similarly, the `onError` callback in `useMutation` is used to show an "error" toast when the API call fails. In addition to the global toast, the component also uses the `isError` and `error` properties from the mutation to render an inline error message directly in the UI, providing immediate, contextual feedback to the user.

---

## Step 6 — Optional Bonuses

### Bonus A — Theme Toggle

A global theme (light/dark) has been implemented using a Zustand store (`src/stores/theme.ts`). The state is persisted to `localStorage` using Zustand's `persist` middleware. A `ThemeToggleButton` in the header allows the user to switch themes, and a custom hook (`useThemeEffect`) applies a `.dark` class to the `<html>` element to activate the dark mode styles defined in `index.css`.

### Bonus B — Global Loading Indicator

A `GlobalLoadingIndicator` component has been added. It uses the `useIsFetching` and `useIsMutating` hooks from TanStack Query to determine if any network requests are in flight. When a query or mutation is active, it displays a thin loading bar at the top of the page, providing global feedback to the user that something is happening in the background.

---

## Step 9 — Reflection

*   **TanStack Query** is used exclusively for **server state**. This includes fetching the product list with `useQuery` and managing the "add to cart" API call with `useMutation`. The global loading indicator also hooks into TanStack Query to know when any network requests are active.

*   **React Context** is used for simple, low-frequency **global UI state**. The `CartSidebarContext` which manages the `isCartOpen` boolean is a perfect example. It's needed by both the `Header` and the `CartSidebar`, but it doesn't change often.

*   **Zustand** is used for more complex or frequently updated **global client state**. The list of active toast notifications, the contents of the shopping cart (`items`), and the application's theme (`light`/`dark`) are all managed in separate Zustand stores.

*   **Local `useState`** would be used for ephemeral UI state that only affects a single component. For example, if we had a search input to filter products, the text value of that input should be kept in local state within the filter component to prevent unnecessary re-renders of the entire application on each keystroke.

*   A clear example of **correct global state** was the theme. It needs to be accessed by components across the entire app (the header button, the root `<html>` element) and persisted, making it a perfect candidate for a global store like Zustand with persistence middleware.

*   An example where **local state was intentionally not made global** is the loading state of an individual "Add to Cart" button. While the mutation itself is global, the `isPending` state specific to *one product* is used directly in the `renderProducts` function to disable only the button that was clicked, which is more efficient and precise than a global "is adding item" flag.

*   **Summary of Learning:** The key takeaway is that modern React applications use a mix of state management tools, each for its specific purpose. There is no single "best" solution. By categorizing state into server state (TanStack Query), global client state (Zustand/Context), and local UI state (`useState`), we can build applications that are more performant, scalable, and easier to maintain.
