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
              <strong>Email:</strong> info@karayaka.ru
            </p>
            <p>
              <strong>{t("footer.phone")}:</strong> +7 919 107 9917
            </p>
          </div>
          <div className={styles.socialLinks}>
          <a href={'https://t.me/yselimmm'} target="_blank" rel="noopener noreferrer">
          <svg
                  className={styles.telegramIcon}
                  fill="white"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>telegram</title>
                    <path d="M22.122 10.040c0.006-0 0.014-0 0.022-0 0.209 0 0.403 0.065 0.562 0.177l-0.003-0.002c0.116 0.101 0.194 0.243 0.213 0.403l0 0.003c0.020 0.122 0.031 0.262 0.031 0.405 0 0.065-0.002 0.129-0.007 0.193l0-0.009c-0.225 2.369-1.201 8.114-1.697 10.766-0.21 1.123-0.623 1.499-1.023 1.535-0.869 0.081-1.529-0.574-2.371-1.126-1.318-0.865-2.063-1.403-3.342-2.246-1.479-0.973-0.52-1.51 0.322-2.384 0.221-0.23 4.052-3.715 4.127-4.031 0.004-0.019 0.006-0.040 0.006-0.062 0-0.078-0.029-0.149-0.076-0.203l0 0c-0.052-0.034-0.117-0.053-0.185-0.053-0.045 0-0.088 0.009-0.128 0.024l0.002-0.001q-0.198 0.045-6.316 4.174c-0.445 0.351-1.007 0.573-1.619 0.599l-0.006 0c-0.867-0.105-1.654-0.298-2.401-0.573l0.074 0.024c-0.938-0.306-1.683-0.467-1.619-0.985q0.051-0.404 1.114-0.827 6.548-2.853 8.733-3.761c1.607-0.853 3.47-1.555 5.429-2.010l0.157-0.031zM15.93 1.025c-8.302 0.020-15.025 6.755-15.025 15.060 0 8.317 6.742 15.060 15.060 15.060s15.060-6.742 15.060-15.060c0-8.305-6.723-15.040-15.023-15.060h-0.002q-0.035-0-0.070 0z"></path>{" "}
                  </g>
                </svg>
              </a>
            <a
              href="https://wa.me/+905320671890"
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
          <a href="https://www.privacypolicies.com/live/63ae38e1-d9a6-4d30-9a80-b8aa1a2e729c" target="_blank" rel="noopener noreferrer">
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
