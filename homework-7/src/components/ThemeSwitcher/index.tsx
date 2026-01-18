import { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import type { DropdownChangeEvent } from "primereact/dropdown";
import { useTranslation } from "react-i18next";

interface Theme {
  name: string;
  file: string;
}

const themes: Theme[] = [
  { name: "Saga Blue (Light)", file: "saga-blue" },
  { name: "Vela Blue (Dark)", file: "vela-blue" },
  { name: "Arya Orange (Dark)", file: "arya-orange" },
];

const THEME_STORAGE_KEY = "primereact-theme";

const ThemeSwitcher = () => {
  const { t } = useTranslation("common");

  // get initial theme from localStorage
  const storedThemeFile = localStorage.getItem(THEME_STORAGE_KEY);
  const initialTheme =
    themes.find((t) => t.file === storedThemeFile) || themes[0];

  const [selectedTheme, setSelectedTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const themeLink = document.getElementById(
      "primereact-theme"
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `https://cdn.jsdelivr.net/npm/primereact@10.9.7/resources/themes/${selectedTheme.file}/theme.css`;
      localStorage.setItem(THEME_STORAGE_KEY, selectedTheme.file);
    }
  }, [selectedTheme]);

  return (
    <Dropdown
      value={selectedTheme}
      options={themes}
      onChange={(e: DropdownChangeEvent) => setSelectedTheme(e.value)}
      optionLabel="name"
      placeholder={t("theme") ?? "Select a Theme"}
      style={{ width: "12rem" }}
    />
  );
};

export default ThemeSwitcher;