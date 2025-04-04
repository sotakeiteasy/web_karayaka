import styles from "./header.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Icon from "@mdi/react";
import { mdiTriangleSmallDown } from "@mdi/js";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Функция переключения языка
  const changeLanguage = (newLocale: string) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
    setIsLanguageMenuOpen(false);
  };

  // Закрытие меню при клике вне его области
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
        <Link className={styles.logo} href="/">
          {t("header.home")}
        </Link>
        {navLinks.map((link, index) => (
          <Link
            key={index}
            className={`${styles.navLink} ${link.active ? styles.active : ""}`}
            href={link.href}
          >
            {link.text}
          </Link>
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
            {locale === "en" ? "English" : "Русский"}
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
              <button
                className={`${styles.menuItem} ${
                  locale === "en" ? styles.active : ""
                }`}
                onClick={() => changeLanguage("en")}
              >
                English
              </button>
              <button
                className={`${styles.menuItem} ${
                  locale === "ru" ? styles.active : ""
                }`}
                onClick={() => changeLanguage("ru")}
              >
                Русский
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
