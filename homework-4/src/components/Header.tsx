import { useTranslation, Trans } from "react-i18next";
import { NavLink } from "react-router-dom";
import "./Header.css";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation(["common"]);

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>{t("appTitle")}</h1>
        <nav>
          <NavLink to="/products">{t("nav_products")}</NavLink>
        </nav>
        <div className="flex-spacer"></div>
        <LanguageSwitcher />
        <p className="footer-text"><Trans i18nKey="made_with_love" ns="common" /></p>
      </div>
    </header>
  );
};
export default Header;