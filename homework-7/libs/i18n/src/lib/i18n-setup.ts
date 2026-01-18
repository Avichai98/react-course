import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import type { Resource } from "i18next";

// Helper function to check if language is RTL
export const isRtlLang = (lang: string): boolean => {
  return lang === 'he' || lang === 'ar';
};

// Initialize i18n with resources
export const initI18n = (resources: Resource) => {
  // Get saved language from localStorage or default to 'en'
  const savedLanguage = localStorage.getItem('language') || 'en';

  i18n.use(initReactI18next).init({
    lng: savedLanguage,
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
    if (isRtlLang(lng)) {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = lng;
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lng;
    }
  });

  // Set initial direction and language
  if (isRtlLang(savedLanguage)) {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = savedLanguage;
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = savedLanguage;
  }

  return i18n;
};

export default i18n;