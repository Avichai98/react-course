import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "./index.css";
import LanguageSwitcher from "./LanguageSwitcher";

export const Header = () => {
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
      </div>
    </header>
  );
};
export default Header;