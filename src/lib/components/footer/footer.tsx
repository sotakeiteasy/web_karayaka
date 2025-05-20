import React from 'react';
import { useTranslation, LinkWithLocale } from 'next-export-i18n';
import styles from './Footer.module.scss';
import Icon from '@mdi/react';
import { mdiWhatsapp } from '@mdi/js';
import { contactInfo } from '@/lib/constants/contactInfo';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/', label: t('footer.home') },
    { href: 'search/?type=rent', label: t('header.rent') },
    { href: 'search/?type=sale', label: t('header.buy') },
    { href: '/about-us', label: t('header.aboutUs') },
    { href: '/custom-offers', label: t('header.customOffers') },
    { href: '/blog/', label: t('header.blog') },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <div className={styles.logoSection}>
            <h2 className={styles.logoText}>{t('header.home')}</h2>
            <p className={styles.tagline}>{t('footer.tagline')}</p>
          </div>
          <div className={styles.address}>
            <h3>{t('footer.officeAddress')}</h3>
            <p>
              {t('footer.russia')}, {contactInfo.address}
            </p>
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
          <div className={styles.contactInfo}>
            <p>
              <strong>Email:</strong> {contactInfo.email}
            </p>
            <p>
              <strong>{t('footer.phone')}:</strong> {contactInfo.phone}
            </p>
          </div>
          <div className={styles.socialLinks}>
            <a href={contactInfo.telegram} target="_blank" rel="noopener noreferrer">
              <img src="/assets/icons/TelegramIconFooter.svg" alt="Telegram" className={styles.telegramIcon} />
            </a>
            <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <Icon path={mdiWhatsapp} size={1} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomFooter}>
        <p className={styles.copyright}>
          © {currentYear} {t('footer.allRightsReserved')}
        </p>
        <div className={styles.legalLinks}>
          <a
            href="/privacyPolicy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{t('footer.privacyPolicy')}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
