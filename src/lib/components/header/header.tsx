import styles from './Header.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation, LinkWithLocale, LanguageSwitcher } from 'next-export-i18n';
import { useLanguageQuery } from 'next-export-i18n';
import Icon from '@mdi/react';
import { mdiTriangleSmallDown, mdiWhatsapp, mdiClose } from '@mdi/js';
import { useState, useEffect, useRef } from 'react';
import { contactInfo } from '@/lib/constants/contactInfo';

export function Header() {
  const { t } = useTranslation();
  const router = useRouter();
  const [query] = useLanguageQuery();
  const currentLang = (query?.lang as 'ru' | 'en') || 'ru';

  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const changeLanguage = () => {
    setIsLanguageMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isBurgerMenuOpen ? 'hidden' : 'auto';
  }, [isBurgerMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    {
      href: '/rent',
      text: t('header.rent'),
      active: router.pathname.startsWith('/rent'),
    },
    {
      href: '/buy',
      text: t('header.buy'),
      active: router.pathname.startsWith('/buy'),
    },
    {
      href: '/about-us',
      text: t('header.aboutUs'),
      active: router.pathname.startsWith('/about-us'),
    },
    {
      href: '/custom-offers',
      text: t('header.customOffers'),
      active: router.pathname.startsWith('/custom-offers'),
    },
    {
      href: '/blog',
      text: t('header.blog'),
      active: router.pathname.startsWith('/blog'),
    },
  ];

  return (
    <header className={styles.header}>
      <div
        className={`${styles.overlay} ${isBurgerMenuOpen ? styles.active : ''}`}
        onClick={() => setIsBurgerMenuOpen(false)}
      ></div>

      <nav className={`${styles.nav} ${styles.fill}`}>
        <div className={styles.logo}>
          <LinkWithLocale href="/">{t('header.home')}</LinkWithLocale>
        </div>
        <div className={styles.burgerButton} onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`${styles.burgerMenu} ${isBurgerMenuOpen ? styles.open : ''}`}>
          <button className={styles.closeButton} onClick={() => setIsBurgerMenuOpen(false)}>
            <Icon path={mdiClose} size={1.5}></Icon>
          </button>
          <div className={styles.navLinks}>
            <div className={styles.title}>
              <div className={styles.logo}>
                <LinkWithLocale href="/" onClick={() => setIsBurgerMenuOpen(false)}>
                  <Image src="/logo.png" alt="Logo" width={100} height={100} />
                </LinkWithLocale>
              </div>
            </div>

            <div className={`${styles.navLink} ${styles.homeBurger} ${router.pathname === '/' ? styles.active : ''}`}>
              <LinkWithLocale href="/" onClick={() => setIsBurgerMenuOpen(false)}>
                {t('header.homeBurger')}
              </LinkWithLocale>
            </div>
            {navLinks.map((link, index) => (
              <div key={index} className={`${styles.navLink} ${link.active ? styles.active : ''}`}>
                <LinkWithLocale href={link.href} onClick={() => setIsBurgerMenuOpen(false)}>
                  {link.text}
                </LinkWithLocale>
              </div>
            ))}

            <div className={styles.mobileLangSwitcher}>
              <LanguageSwitcher lang="en">
                <button className={`${styles.mobileLangButton} ${currentLang === 'en' ? styles.active : ''}`}>
                  English
                </button>
              </LanguageSwitcher>
              <LanguageSwitcher lang="ru">
                <button className={`${styles.mobileLangButton} ${currentLang === 'ru' ? styles.active : ''}`}>
                  Русский
                </button>
              </LanguageSwitcher>
            </div>
            <div className={styles.contacts}>
              <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer">
                <Icon path={mdiWhatsapp} size={2} />
              </a>
              <a href={contactInfo.telegram} target="_blank" rel="noopener noreferrer">
                <img src="/assets/icons/TelegramIconHeader.svg" alt="Telegram" className={styles.telegramIcon} />
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className={styles.buttons}>
        <div ref={langMenuRef} className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
          <button className={styles.button} onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}>
            {currentLang === 'en' ? 'English' : 'Русский'}
            <Icon
              path={mdiTriangleSmallDown}
              size={1}
              style={{
                transform: isLanguageMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.5s ease',
              }}
            />
          </button>
          {isLanguageMenuOpen && (
            <div className={styles.dropdownMenu}>
              <LanguageSwitcher lang="en">
                <button
                  className={`${styles.menuItem} ${currentLang === 'en' ? styles.active : ''}`}
                  onClick={changeLanguage}
                >
                  English
                </button>
              </LanguageSwitcher>
              <LanguageSwitcher lang="ru">
                <button
                  className={`${styles.menuItem} ${currentLang === 'ru' ? styles.active : ''}`}
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
