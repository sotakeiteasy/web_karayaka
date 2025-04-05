import styles from "./header.module.scss";
import { useRouter } from "next/router";
import { useTranslation, LinkWithLocale, LanguageSwitcher} from "next-export-i18n";
import { useLanguageQuery } from "next-export-i18n";
import Icon from "@mdi/react";
import { mdiTriangleSmallDown } from "@mdi/js";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const { t } = useTranslation();
  const router = useRouter();
  const [query] = useLanguageQuery();
  // Получаем язык из next-export-i18n вместо router.locale
  const currentLang = (query?.lang as string) || "ru";

  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const changeLanguage = () => {
    setIsLanguageMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    {
      href: "/search?type=rent",
      text: t("header.rent"),
      active:
        router.pathname.startsWith("/search") && router.query.type === "rent",
    },
    {
      href: "/search?type=sale",
      text: t("header.buy"),
      active:
        router.pathname.startsWith("/search") && router.query.type === "sale",
    },
    {
      href: "/about-us",
      text: t("header.aboutUs"),
      active: router.pathname.startsWith("/about-us"),
    },
    {
      href: "/custom-offers",
      text: t("header.customOffers"),
      active: router.pathname.startsWith("/custom-offers"),
    },
    {
      href: "/blog",
      text: t("header.blog"),
      active: router.pathname.startsWith("/blog"),
    },
  ];

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${styles.fill}`}>
        <div className={styles.logo}>
          <LinkWithLocale href="/">
            {t("header.home")}
          </LinkWithLocale>
        </div>
        {navLinks.map((link, index) => (
          <div 
            key={index} 
            className={`${styles.navLink} ${link.active ? styles.active : ""}`}
          >
            <LinkWithLocale href={link.href}>
              {link.text}
            </LinkWithLocale>
          </div>
        ))}
      </nav>
      <div className={styles.buttons}>
        <div
          ref={langMenuRef}
          className={styles.dropdown}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className={styles.button}
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
          >
            {currentLang === "en" ? "English" : "Русский"}
            <Icon
              path={mdiTriangleSmallDown}
              size={1}
              style={{
                transform: isLanguageMenuOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "transform 0.5s ease",
              }}
            />
          </button>
          {isLanguageMenuOpen && (
            <div className={styles.dropdownMenu}>
              <LanguageSwitcher lang="en">
                <button
                  className={`${styles.menuItem} ${
                    currentLang === "en" ? styles.active : ""
                  }`}
                  onClick={changeLanguage}
                >
                  English
                </button>
              </LanguageSwitcher>
              <LanguageSwitcher lang="ru">
                <button
                  className={`${styles.menuItem} ${
                    currentLang === "ru" ? styles.active : ""
                  }`}
                  onClick={changeLanguage}
                >
                  Русский
                </button>
              </LanguageSwitcher>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}