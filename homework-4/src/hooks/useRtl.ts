import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const rtlLanguages = ["he", "ar"];

export const useRtl = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isRtl = rtlLanguages.includes(i18n.language);
    // Set document direction and language for accessibility and styling
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
};