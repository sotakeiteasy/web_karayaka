import styles from './Header.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useLanguageQuery, useTranslation, LinkWithLocale, LanguageSwitcher } from 'next-export-i18n';
import Icon from '@mdi/react';
import { mdiTriangleSmallDown, mdiWhatsapp, mdiClose, mdiChevronDown, mdiMenu } from '@mdi/js';
import { useState, useEffect, useRef, Fragment } from 'react';
import Head from 'next/head';
import { contactInfo } from '@/lib/constants';
import { headerScheme } from '@/lib/seo';
import Link from 'next/link';

export function Header() {
  const { t } = useTranslation();
  const router = useRouter();
  const [query] = useLanguageQuery();
  const lang = (query?.lang as 'ru' | 'en') || 'ru';

  const [isContactsMenuOpen, setIsContactsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isBuyMenuOpen, setIsBuyMenuOpen] = useState(false);
  const [isRentMenuOpen, setIsRentMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const contactsMenuRef = useRef<HTMLDivElement>(null);
  const buyMenuRef = useRef<HTMLDivElement>(null);
  const rentMenuRef = useRef<HTMLDivElement>(null);

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

      if (!isOfTabletWidth && rentMenuRef.current && !rentMenuRef.current.contains(event.target as Node)) {
        setIsRentMenuOpen(false);
      }
      if (!isOfTabletWidth && buyMenuRef.current && !buyMenuRef.current.contains(event.target as Node)) {
        setIsBuyMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [isOfTabletWidth, setIsOfTabletWidth] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsOfTabletWidth(window.innerWidth <= 990);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    {
      href: '/rent/',
      text: t('header.rent'),
      active: router.pathname.startsWith('/rent'),
      subsections: [
        {
          href: 'flat-turkey/',
          text: t('rentApartment.CEOText.navTitle'),
          active: router.pathname.includes('flat-turkey'),
        },
        {
          href: 'flat-antalya/',
          text: t('antalyaRent.CEOText.navTitle'),
          active: router.pathname.includes('flat-antalya'),
        },

        {
          href: 'rent-istanbul/',
          text: t('rentIstanbul.CEOText.navTitle'),
          active: router.pathname.includes('rent-istanbul'),
        },
        {
          href: 'villa-turkey/',
          text: t('rentVilla.CEOText.navTitle'),
          active: router.pathname.includes('villa-turkey'),
        },
        {
          href: 'villa-antalya/',
          text: t('villaAntalya.CEOText.navTitle'),
          active: router.pathname.includes('villa-antalya'),
        },
      ],
    },
    {
      href: '/buy/',
      text: t('header.buy'),
      active: router.pathname.startsWith('/buy'),
      subsections: [
        {
          href: 'flat-turkey/',
          text: t('buyFlat.CEOText.navTitle'),
          active: router.pathname.includes('flat-turkey'),
        },
        {
          href: 'flats-alanya/',
          text: t('flatsAlanya.CEOText.navTitle'),
          active: router.pathname.includes('flats-alanya'),
        },
        {
          href: 'flat-for-residence/',
          text: t('flatForResidence.CEOText.navTitle'),
          active: router.pathname.includes('flat-for-residence'),
        },
        {
          href: 'property-for-residence/',
          text: t('propertyForResidence.CEOText.navTitle'),
          active: router.pathname.includes('property-for-residence'),
        },

        {
          href: 'property-antalya/',
          text: t('antalya.CEOText.navTitle'),
          active: router.pathname.includes('property-antalya'),
        },

        {
          href: 'property-istanbul/',
          text: t('istanbul.CEOText.navTitle'),
          active: router.pathname.includes('property-istanbul'),
        },
        {
          href: 'land-investments/',
          text: t('landInvestments.CEOText.navTitle'),
          active: router.pathname.includes('land-investments'),
        },
        {
          href: 'real-estate-lawyer/',
          text: t('realEstateLawyer.CEOText.navTitle'),
          active: router.pathname.includes('real-estate-lawyer'),
        },
      ],
    },
    {
      href: '/about-us/',
      text: t('header.aboutUs'),
      active: router.pathname.startsWith('/about-us'),
    },
    {
      href: '/offer/',
      text: t('header.customOffers'),
      active: router.pathname.startsWith('/offer'),
    },
    {
      href: '/contacts/',
      text: t('header.contacts'),
      active: router.pathname.startsWith('/contacts'),
    },
    {
      href: '/discounts/',
      text: t('header.discounts'),
      active: router.pathname.startsWith('/discounts'),
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
          className={`${styles.overlay} ${isBurgerMenuOpen && isOfTabletWidth ? styles.active : ''}`}
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
            <button
              className={styles.closeButton}
              onClick={() => setIsBurgerMenuOpen(false)}
              aria-label={t('header.closeBtn')}
            >
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
                <div
                  key={index}
                  className={styles.dropdown}
                  ref={link.href.includes('rent') ? rentMenuRef : link.href.includes('buy') ? buyMenuRef : null}
                >
                  {(link.href.includes('buy') || link.href.includes('rent')) && (
                    <button
                      key={index}
                      className={`${styles.navLink} ${link.active ? styles.active : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (link.href.includes('rent')) setIsRentMenuOpen(!isRentMenuOpen);
                        if (link.href.includes('buy')) setIsBuyMenuOpen(!isBuyMenuOpen);
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsBurgerMenuOpen(false);
                        }}
                      >
                        {link.text}
                      </Link>

                      {lang === 'ru' && (
                        <Icon
                          key={index}
                          className={styles.mobileBurgerMenuIcon}
                          path={isOfTabletWidth ? mdiChevronDown : mdiMenu}
                          size={isOfTabletWidth ? 1.4 : 0.9}
                          style={{
                            cursor: 'pointer',
                            transform:
                              (link.href.includes('buy') && isBuyMenuOpen) ||
                              (link.href.includes('rent') && isRentMenuOpen)
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)',
                            transition: 'transform 0.5s ease',
                          }}
                          aria-label={lang === 'ru' ? 'Открыть меню' : 'Toggle menu'}
                        />
                      )}
                    </button>
                  )}
                  {!link.subsections && !link.subsections && (
                    <div className={`${styles.navLink} ${link.active ? styles.active : ''}`}>
                      <LinkWithLocale
                        href={link.href}
                        onClick={() => {
                          setIsBurgerMenuOpen(false);
                        }}
                      >
                        {link.text}
                      </LinkWithLocale>
                    </div>
                  )}
                  {lang === 'ru' && link.subsections && (
                    <ul
                      key={link.href}
                      className={`${styles.subLinksMobile} ${
                        (link.href.includes('buy') && isBuyMenuOpen) || (link.href.includes('rent') && isRentMenuOpen)
                          ? styles.open
                          : ''
                      }`}
                    >
                      <li key={-1} className={styles.subLinkMobile}>
                        <Link
                          key={-1}
                          href={link.href}
                          onClick={() => {
                            setIsBurgerMenuOpen(false);
                            setIsBuyMenuOpen(false);
                            setIsRentMenuOpen(false);
                          }}
                        >
                          Все объявления
                        </Link>
                      </li>
                      {link.subsections?.map((subsectionLink, subIndex) => (
                        <li key={subIndex} className={styles.subLinkMobile}>
                          <LinkWithLocale
                            key={subIndex}
                            href={link.href + subsectionLink.href}
                            onClick={() => {
                              setIsBurgerMenuOpen(false);
                              if (!isOfTabletWidth) {
                                setIsBuyMenuOpen(false);
                                setIsRentMenuOpen(false);
                              }
                            }}
                          >
                            {t(subsectionLink.text)}
                          </LinkWithLocale>
                        </li>
                      ))}
                    </ul>
                  )}
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
                  <a href={contactInfo.whatsapp} target="_blank" aria-label="WhatsApp" rel="noopener noreferrer">
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
                  aria-label="WhatsApp"
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
