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