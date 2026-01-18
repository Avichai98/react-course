import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation("common");

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang && storedLang !== i18n.language) {
      i18n.changeLanguage(storedLang);
    }
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <div className="language-switcher">
      <span>{t("language")}: </span>
      <button onClick={() => changeLanguage("en")} disabled={i18n.language === "en"}>EN</button>
      <button onClick={() => changeLanguage("he")} disabled={i18n.language === "he"}>HE</button>
    </div>
  );
};

export default LanguageSwitcher;