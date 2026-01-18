import { useTranslation, Trans } from "react-i18next";
import { NavLink } from "react-router-dom";
import "./index.css";
import { LanguageSwitcher } from "@homework-7/i18n";
import { useCartStore, useCartSidebar } from "@homework-7/hooks";
import ThemeSwitcher from "../ThemeSwitcher";

export const Header = () => {
  const { t } = useTranslation(["common"]);
  const { toggleCart } = useCartSidebar();
  const { items } = useCartStore();
  
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>{t("appTitle")}</h1>
        <nav>
          <NavLink to="/products">{t("nav_products")}</NavLink>
        </nav>
        <div className="flex-spacer"></div>
        <button onClick={toggleCart} className="cart-button">
          🛒 Cart ({totalItems})
        </button>
        <ThemeSwitcher />
        <LanguageSwitcher />
        <p className="footer-text"><Trans i18nKey="powered_by" ns="common" /></p>
      </div>
    </header>
  );
};
export default Header;