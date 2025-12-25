import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonEn from "./locales/en/common.json";
import productsEn from "./locales/en/products.json";
import commonHe from "./locales/he/common.json";
import productsHe from "./locales/he/products.json";

export const resources = {
  en: {
    common: commonEn,
    products: productsEn,
  },
  he: {
    common: commonHe,
    products: productsHe,
  },
} as const;

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem('language') || 'en';

i18n.use(initReactI18next).init({
  lng: savedLanguage, // use saved language
  fallbackLng: "en",
  ns: ["common", "products"],
  defaultNS: "common",
  resources,
  interpolation: {
    escapeValue: false, // React already protects from XSS
  },
});

// Save language changes to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
  
  // Set RTL for Hebrew
  if (lng === 'he') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'he';
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lng;
  }
});

// Set initial direction and language
if (savedLanguage === 'he') {
  document.documentElement.dir = 'rtl';
  document.documentElement.lang = 'he';
} else {
  document.documentElement.dir = 'ltr';
  document.documentElement.lang = savedLanguage;
}

export default i18n;