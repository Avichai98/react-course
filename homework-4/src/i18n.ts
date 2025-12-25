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

i18n.use(initReactI18next).init({
  lng: "en", // default language
  fallbackLng: "en",
  ns: ["common", "products"],
  defaultNS: "common",
  resources,
  interpolation: {
    escapeValue: false, // React already protects from XSS
  },
});

export default i18n;