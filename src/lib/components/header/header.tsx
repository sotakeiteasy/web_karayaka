import styles from './header.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation, LinkWithLocale, LanguageSwitcher } from 'next-export-i18n';
import { useLanguageQuery } from 'next-export-i18n';
import Icon from '@mdi/react';
import { mdiTriangleSmallDown, mdiWhatsapp, mdiClose } from '@mdi/js';
import { useState, useEffect, useRef } from 'react';
import { contactInfo } from '@/lib/constants/contactInfo';

export default function Header() {
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
      href: '/search?type=rent',
      text: t('header.rent'),
      active: router.pathname.startsWith('/search') && router.query.type === 'rent',
    },
    {
      href: '/search?type=sale',
      text: t('header.buy'),
      active: router.pathname.startsWith('/search') && router.query.type === 'sale',
    },
    {
      href: '/about-us',
      text: t('header.aboutUs'),
      active: router.pathname.startsWith('/about-us'),
    },
    {
      href: '/custom-offers/',
      text: t('header.customOffers'),
      active: router.pathname.startsWith('/custom-offers'),
    },
    {
      href: '/blog/',
      text: t('header.blog'),
      active: router.pathname.startsWith('/blog/'),
    },
  ];

  return (
    <header className={styles.header}>
      {/* Overlay для затемнения фона */}
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

            {/* <div className={styles.langDivider}></div> */}
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
                <svg
                  className={styles.telegramIcon}
                  fill="#002F6C"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>telegram</title>
                    <path d="M22.122 10.040c0.006-0 0.014-0 0.022-0 0.209 0 0.403 0.065 0.562 0.177l-0.003-0.002c0.116 0.101 0.194 0.243 0.213 0.403l0 0.003c0.020 0.122 0.031 0.262 0.031 0.405 0 0.065-0.002 0.129-0.007 0.193l0-0.009c-0.225 2.369-1.201 8.114-1.697 10.766-0.21 1.123-0.623 1.499-1.023 1.535-0.869 0.081-1.529-0.574-2.371-1.126-1.318-0.865-2.063-1.403-3.342-2.246-1.479-0.973-0.52-1.51 0.322-2.384 0.221-0.23 4.052-3.715 4.127-4.031 0.004-0.019 0.006-0.040 0.006-0.062 0-0.078-0.029-0.149-0.076-0.203l0 0c-0.052-0.034-0.117-0.053-0.185-0.053-0.045 0-0.088 0.009-0.128 0.024l0.002-0.001q-0.198 0.045-6.316 4.174c-0.445 0.351-1.007 0.573-1.619 0.599l-0.006 0c-0.867-0.105-1.654-0.298-2.401-0.573l0.074 0.024c-0.938-0.306-1.683-0.467-1.619-0.985q0.051-0.404 1.114-0.827 6.548-2.853 8.733-3.761c1.607-0.853 3.47-1.555 5.429-2.010l0.157-0.031zM15.93 1.025c-8.302 0.020-15.025 6.755-15.025 15.060 0 8.317 6.742 15.060 15.060 15.060s15.060-6.742 15.060-15.060c0-8.305-6.723-15.040-15.023-15.060h-0.002q-0.035-0-0.070 0z"></path>{' '}
                  </g>
                </svg>
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
