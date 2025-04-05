import React from "react";
import { useTranslation, LinkWithLocale } from "next-export-i18n";
import styles from "./footer.module.scss";
import Icon from "@mdi/react";
import { mdiSendCircle, mdiWhatsapp } from "@mdi/js";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <div className={styles.logoSection}>
            <h2 className={styles.logoText}>{t("header.home")}</h2>
            <p className={styles.tagline}>{t("footer.tagline")}</p>
          </div>
          <div className={styles.address}>
            <h3>{t("footer.officeAddress")}</h3>
            <p>
              {t("footer.russia")}, Г.МОСКВА, ВН.ТЕР.Г. МУНИЦИПАЛЬНЫЙ ОКРУГ
              НАГОРНЫЙ, УЛ БОЛОТНИКОВСКАЯ, Д. 7 К. 1, ПОМЕЩ. 3Ц
            </p>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3>{t("footer.navigation")}</h3>
          <nav className={styles.footerNav}>
            <LinkWithLocale href="/">
              <span>{t("footer.home")}</span>
            </LinkWithLocale>
            <LinkWithLocale href="search/?type=rent">
              <span>{t("header.rent")}</span>
            </LinkWithLocale>
            <LinkWithLocale href="search/?type=sale">
              <span>{t("header.buy")}</span>
            </LinkWithLocale>
            <LinkWithLocale href="/about-us">
              <span>{t("header.aboutUs")}</span>
            </LinkWithLocale>
            <LinkWithLocale href="/custom-offers">
              <span>{t("header.customOffers")}</span>
            </LinkWithLocale>
            <LinkWithLocale href="/blog">
              <span>{t("header.blog")}</span>
            </LinkWithLocale>
          </nav>
        </div>

        <div className={styles.footerSection}>
          <h3>{t("footer.contactUs")}</h3>
          <div className={styles.contactInfo}>
            <p>
              <strong>Email:</strong> info@karayaka.com
            </p>
            <p>
              <strong>{t("footer.phone")}:</strong> +7 (495) 123-45-67
            </p>
          </div>
          <div className={styles.socialLinks}>
            <a
              href="https://t.me/karayaka_real"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <Icon path={mdiSendCircle} size={1} rotate={-30} />
            </a>
            <a
              href="https://wa.me/74951234567"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <Icon path={mdiWhatsapp} size={1} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomFooter}>
        <p className={styles.copyright}>
          © {currentYear} {t("footer.allRightsReserved")}
        </p>
        <div className={styles.legalLinks}>
          <a href="https://www.privacypolicies.com/live/e54ec666-247c-4bdd-acea-6c07b6ca4738" target="_blank" rel="noopener noreferrer">
            <span>{t("footer.privacyPolicy")}</span>
          </a>
          {/* <Link href="/terms-of-service">
            <span>{t('footer.termsOfService')}</span>
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
