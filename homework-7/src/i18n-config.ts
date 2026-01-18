import { initI18n } from '@homework-7/i18n';
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

// Initialize i18n with our resources
const i18n = initI18n(resources);

export default i18n;