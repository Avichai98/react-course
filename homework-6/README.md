# React Forms Homework - Advanced 3

A comprehensive React form implementation using React Hook Form and Zod validation, featuring accessibility, custom components, and professional UX patterns.

## 🚀 Features

### Form Controls
- **Text inputs**: First name, last name, email, phone, username, bio
- **Password fields**: Password and confirm password with validation
- **Date input**: Date of birth with age validation
- **Select dropdown**: Country selection
- **Custom radio buttons**: Gender and experience level selection
- **Custom checkboxes**: Interests selection and agreements
- **Range slider**: Skill rating (1-10)
- **Textarea**: Bio field with character limit

### Validation & UX
- **Real-time validation** using Zod schema with onBlur mode
- **Password strength requirements** (uppercase, lowercase, number, special character)
- **Email format validation**
- **Age validation** (13-120 years old)
- **Password confirmation matching**
- **Required field indicators**
- **Animated error messages** that don't cause layout shifts
- **Form state persistence** in localStorage (excluding sensitive data)
- **Submit button disabled** when form is invalid
- **Async submission simulation** with loading state

### Accessibility (a11y)
- **ARIA labels and descriptions** for all form controls
- **Proper fieldset and legend** structure
- **Focus management** with visible focus indicators
- **Screen reader friendly** error announcements
- **Keyboard navigation** support
- **Custom controls** maintain accessibility
- **Semantic HTML** structure
- **Color contrast** compliance

### Custom Components
- **CustomCheckbox**: Visually hidden native input with custom styling
- **CustomRadio**: Accessible radio buttons with custom appearance
- **FormField**: Reusable field wrapper with error handling
- **Responsive design** for mobile and desktop

## 🛠 Technical Implementation

### Libraries Used
- **React 18.3.1** - UI framework
- **React Hook Form 7.48.2** - Form state management
- **Zod 3.22.4** - Schema validation
- **@hookform/resolvers** - Zod integration
- **TypeScript** - Type safety
- **Vite** - Build tool

### Key Features
- **Type-safe forms** with TypeScript and Zod
- **Performance optimized** with React Hook Form
- **Debounced localStorage** saves (500ms delay)
- **Security conscious** - passwords not stored locally
- **Professional styling** with CSS custom properties
- **Dark mode support** via CSS media queries

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                           # Reusable UI components
│   │   ├── CustomCheckbox.tsx/css    # Custom checkbox component
│   │   ├── CustomRadio.tsx/css       # Custom radio component
│   │   ├── FormField.tsx/css         # Form field wrapper
│   │   └── index.ts                  # UI components exports
│   ├── forms/                        # Form-specific components
│   │   ├── UserRegistrationForm.tsx/css # Main form component
│   │   └── index.ts                  # Form components exports
│   └── index.ts                      # All components exports
├── schemas/
│   └── userRegistrationSchema.ts     # Zod validation schema
├── utils/
│   └── localStorage.ts               # Storage utilities
├── App.tsx/css                       # Main app component
├── main.tsx                          # App entry point
└── index.css                         # Global styles
```

## 🎯 Form Fields

1. **First Name** - Required, 2-50 characters, letters only
2. **Last Name** - Required, 2-50 characters, letters only
3. **Email** - Required, valid email format
4. **Phone** - Optional, valid phone number format
5. **Date of Birth** - Required, age 13-120
6. **Username** - Required, 3-20 characters, alphanumeric + underscore
7. **Password** - Required, 8+ chars with complexity requirements
8. **Confirm Password** - Required, must match password
9. **Gender** - Required radio selection (Male/Female/Other/Prefer not to say)
10. **Country** - Required dropdown selection
11. **Interests** - Required checkboxes (min 1 selection)
12. **Experience Level** - Required radio (Beginner/Intermediate/Advanced)
13. **Skill Rating** - Required range slider (1-10)
14. **Bio** - Optional textarea (max 500 characters)
15. **Terms Agreement** - Required checkbox
16. **Newsletter** - Optional checkbox

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Run linting**:
   ```bash
   npm run lint
   ```

## 🎨 Bonus Features Implemented

### ⭐ Custom Styled Controls
- Custom radio buttons and checkboxes
- Native controls visually hidden but accessible
- Keyboard navigation preserved
- Screen reader compatibility maintained

### ⭐⭐ Animated Error Messages
- Smooth slide-down animation for error appearance
- No layout shifts during error display/hide
- Stable form layout maintained
- CSS-only animations for performance

## 🔧 Development Notes

### Accessibility Considerations
- All interactive elements have proper focus styles
- Error messages announced to screen readers
- Form structure uses semantic HTML
- Custom controls maintain keyboard accessibility
- ARIA attributes used appropriately

### Performance Optimizations
- Debounced localStorage saves
- React Hook Form's optimized re-renders
- CSS animations over JavaScript
- Efficient form validation with Zod

### Security Features
- Sensitive data (passwords) excluded from localStorage
- Client-side validation (server validation still needed)
- XSS prevention through proper input handling

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Dark mode support
- Accessibility features across all supported browsers

## 🎯 Submission Requirements Met

✅ 10-15 form fields with various input types  
✅ Password and confirm password validation  
✅ Email field with validation  
✅ React Hook Form + Zod implementation  
✅ onBlur validation preferred  
✅ Error display to users  
✅ Submit button disabled when invalid  
✅ Full accessibility compliance  
✅ Visible focus styles without layout shifts  
✅ Async submission simulation  
✅ Console logging of form data  
✅ localStorage caching (non-sensitive data only)  
✅ **Bonus**: Custom styled radio/checkbox controls  
✅ **Advanced Bonus**: Animated error messages without layout shifts