import styles from './Header.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useLanguageQuery, useTranslation, LinkWithLocale, LanguageSwitcher } from 'next-export-i18n';
import Icon from '@mdi/react';
import { mdiTriangleSmallDown, mdiWhatsapp, mdiClose } from '@mdi/js';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { contactInfo } from '@/lib/constants';
import { headerScheme } from '@/lib/seo';

export function Header() {
  const { t } = useTranslation();
  const router = useRouter();
  const [query] = useLanguageQuery();
  const lang = (query?.lang as 'ru' | 'en') || 'ru';

  const [isContactsMenuOpen, setIsContactsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const contactsMenuRef = useRef<HTMLDivElement>(null);

  const changeLanguage = () => {
    setIsLanguageMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isBurgerMenuOpen ? 'hidden' : 'auto';
  }, [isBurgerMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contactsMenuRef.current && !contactsMenuRef.current.contains(event.target as Node)) {
        setIsContactsMenuOpen(false);
      }

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
      href: '/offer',
      text: t('header.customOffers'),
      active: router.pathname.startsWith('/offer'),
    },
    {
      href: '/contacts',
      text: t('header.contacts'),
      active: router.pathname.startsWith('/contacts'),
    },
    {
      href: '/blog',
      text: t('header.blog'),
      active: router.pathname.startsWith('/blog'),
    },
  ];

  return (
    <>
      <Head>
        {lang === 'ru' && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(headerScheme(t('header.home'), navLinks)),
            }}
          />
        )}
      </Head>
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

              <address className={styles.contacts}>
                <p>{t('header.workhours')}</p>

                <span className={styles.phoneMail}>
                  <a href={`tel:+${contactInfo.phone.replace(/\D/g, '')}`}>{contactInfo.phone}</a>
                  <a href={`mailto:${contactInfo.email}`} target="_blank" rel="noopener noreferrer">
                    {contactInfo.email}
                  </a>
                </span>
                <span className={styles.network}>
                  <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer">
                    <Icon path={mdiWhatsapp} size={2} />
                  </a>
                  <a href={contactInfo.telegram} target="_blank" rel="noopener noreferrer">
                    <img src="/assets/icons/TelegramIconHeader.svg" alt="Telegram" className={styles.telegramIcon} />
                  </a>
                </span>
              </address>
              <div className={styles.mobileLangSwitcher}>
                <LanguageSwitcher lang="en">
                  <button className={`${styles.mobileLangButton} ${lang === 'en' ? styles.active : ''}`}>
                    English
                  </button>
                </LanguageSwitcher>
                <LanguageSwitcher lang="ru">
                  <button className={`${styles.mobileLangButton} ${lang === 'ru' ? styles.active : ''}`}>
                    Русский
                  </button>
                </LanguageSwitcher>
              </div>
            </div>
          </div>
        </nav>
        <div className={styles.buttons}>
          <div ref={contactsMenuRef} className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
            <button className={styles.button} onClick={() => setIsContactsMenuOpen(!isContactsMenuOpen)}>
              {contactInfo.phone}
              <Icon
                path={mdiTriangleSmallDown}
                size={1}
                style={{
                  transform: isContactsMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.5s ease',
                }}
              />
            </button>
            {isContactsMenuOpen && (
              <address className={styles.dropdownMenu}>
                <p className={`${styles.contactMenuItem} ${styles.workhours}`}>{t('header.workhours')}</p>
                <a
                  className={styles.telegramContact}
                  href={contactInfo.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/assets/icons/TelegramIconContacts.svg" alt="Telegram" className={styles.telegramIcon} />
                  <span className={`${styles.contactMenuItem} ${styles.telegram}`}>Telegram</span>
                </a>
                <a
                  className={styles.whatsappContact}
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon path={mdiWhatsapp} color="green" />
                  <span className={`${styles.contactMenuItem} ${styles.whatsapp}`}>WhatsApp</span>
                </a>
              </address>
            )}
          </div>
          <div ref={langMenuRef} className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
            <button className={styles.button} onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}>
              {lang === 'en' ? 'English' : 'Русский'}
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
                    className={`${styles.menuItem} ${lang === 'en' ? styles.active : ''}`}
                    onClick={changeLanguage}
                  >
                    English
                  </button>
                </LanguageSwitcher>
                <LanguageSwitcher lang="ru">
                  <button
                    className={`${styles.menuItem} ${lang === 'ru' ? styles.active : ''}`}
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
    </>
  );
}
