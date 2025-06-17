import React from 'react';
import { useTranslation, LinkWithLocale, useLanguageQuery } from 'next-export-i18n';
import styles from './Footer.module.scss';
import Icon from '@mdi/react';
import { mdiWhatsapp } from '@mdi/js';
import { contactInfo } from '@/lib/constants';
import Head from 'next/head';
import { footerScheme } from '@/lib/seo';

export function Footer() {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const lang = (query?.lang as 'ru' | 'en') || 'ru';

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/', label: t('footer.home') },
    { href: '/rent', label: t('header.rent') },
    { href: '/buy', label: t('header.buy') },
    { href: '/about-us', label: t('header.aboutUs') },
    { href: '/offer', label: t('header.customOffers') },
    { href: '/contacts', label: t('header.contacts') },
    { href: '/blog', label: t('header.blog') },
  ];

  return (
    <>
      <Head>
        {lang === 'ru' && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(footerScheme(navLinks)) }}
          />
        )}
      </Head>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerSection}>
            <div className={styles.logoSection}>
              <h2 className={styles.logoText}>{t('header.home')}</h2>
              <p className={styles.tagline}>{t('footer.tagline')}</p>
            </div>
            <div className={styles.address}>
              <h3>{t('footer.officeAddress')}</h3>
              <p>{lang === 'ru' ? contactInfo.addressShort : contactInfo.addressShortEn}</p>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h3>{t('footer.navigation')}</h3>
            <nav className={styles.footerNav}>
              {navLinks.map((link) => (
                <LinkWithLocale key={link.href} href={link.href}>
                  <span>{link.label}</span>
                </LinkWithLocale>
              ))}
            </nav>
          </div>

          <div className={styles.footerSection}>
            <h3>{t('footer.contactUs')}</h3>
            <address className={styles.contactInfo}>
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${contactInfo.email}`} target="_blank" rel="noopener noreferrer">
                  {contactInfo.email}
                </a>
              </p>
              <p>
                <strong>{t('footer.phone')}:</strong>{' '}
                <a href={`tel:+${contactInfo.phone.replace(/\D/g, '')}`}>{contactInfo.phone}</a>
              </p>
            </address>
            <address className={styles.socialLinks}>
              <a href={contactInfo.telegram} target="_blank" rel="noopener noreferrer">
                <img src="/assets/icons/TelegramIconFooter.svg" alt="Telegram" className={styles.telegramIcon} />
              </a>
              <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <Icon path={mdiWhatsapp} size={1} />
              </a>
            </address>
          </div>
        </div>

        <div className={styles.bottomFooter}>
          <p className={styles.copyright}>
            © {currentYear} {t('footer.allRightsReserved')}
          </p>
          <div className={styles.legalLinks}>
            <LinkWithLocale href="/privacy-policy">
              <span>{t('footer.privacyPolicy')}</span>
            </LinkWithLocale>
            <LinkWithLocale href="/sitemap">
              <span>{t('sitemap.header')}</span>
            </LinkWithLocale>
          </div>
        </div>
      </footer>
    </>
  );
}
