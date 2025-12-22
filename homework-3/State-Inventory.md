# State Inventory

Here is a list of all the pieces of state in my project, categorized by whether they originate from the server or are exclusive to the client UI.

### Server State
*This data comes from the backend, is asynchronous, and is shared globally. It belongs in TanStack Query.*

- **Products List**: The list of all available products.
- **Product Detail**: The data for a single selected product.
- **User Profile**: Information about the currently logged-in user.
- **Cart Contents**: The items in the shopping cart (often a server concern to ensure it persists across devices).
- **Order History**: A list of the user's past orders.

### Client/UI State
*This data lives only in the frontend. It can be global (shared across many components) or local (used in only one).*

- **Search/Filter Text**: The current text typed into a search bar.
- **Sidebar Open/Closed**: A boolean `true/false` to show or hide a sidebar.
- **Cart Drawer Open**: A boolean to show or hide the mini-cart drawer.
- **Theme (light/dark)**: The selected theme for the entire application.
- **Notification Toasts**: A list of active success/error messages to show the user.
- **Form Input State**: The current values of a form that has not yet been submitted.

---

### Conclusion

The pieces of state that clearly belong only in **TanStack Query** are the core server data like the products list, user profile, and order history, as it handles caching, refetching, and server synchronization.

Several pieces make sense as **global client state**. The sidebar's open/closed status and the current theme are good candidates for React Context because they are low-frequency updates. The list of active notification toasts is a better fit for a library like Zustand or Jotai because it can change more frequently.

Finally, temporary state like the current value of a search input or form fields should remain as **local UI state** inside their respective components using `useState`. This prevents unnecessary re-renders of the entire application when a user is just typing into an input field.