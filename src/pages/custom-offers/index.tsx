import styles from "./index.module.scss";
import Image from "next/image";
import Head from "next/head";
import { useTranslation, useLanguageQuery } from "next-export-i18n";

import Icon from "@mdi/react";
import { mdiPhone, mdiEmail, mdiWhatsapp } from "@mdi/js";

import { ContactUs, CustomOffersSchema } from "@/lib/components";
import { getImageUrl } from "@/lib/utils";

export default function CustomOffers() {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const locale = (query?.lang as string) || "ru";

  const contactInfo = {
    phone: "+39 209-954‑59-49",
    email: "karayaka@gmail.com",
    telegram: "https://t.me/karayaka_real",
    whatsapp: "+39 209-954‑59-49"
  };

  return (
    <>
      <Head>
        <title>{t('custom-offers.meta.title')}</title>
        <meta name="description" content={t('custom-offers.meta.description')} />
        <meta name="keywords" content={t('custom-offers.meta.keywords')} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        
        {/* Yandex метаданные */}
        <meta name="yandex-verification" content="48e2a3db9fca6f0e" />
        <meta name="yandex:display_title" content={t('custom-offers.meta.title')} />
        
        {/* Open Graph для VK и других соцсетей */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karayaka.ru/custom-offers" />
        <meta property="og:title" content={t('custom-offers.meta.title')} />
        <meta property="og:description" content={t('custom-offers.meta.description')} />
        <meta property="og:image" content="https://karayaka.ru/og-image.png" />
        <meta property="og:image:alt" content="Karayaka Custom Offers" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={locale === 'ru' ? 'ru_RU' : 'en_US'} />
        
        {/* VK Open Graph */}
        <meta property="vk:image" content="https://karayaka.ru/og-image.png" />
      </Head>

      <CustomOffersSchema
        url="https://karayaka.ru/custom-offers"
        description={t('custom-offers.meta.description')}
        contacts={contactInfo}
      />

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <ContactUs />
          <div className={styles.formImg}>
            <Image
              src={getImageUrl("/images/form.jpg")}
              fill={true}
              alt="form image"
              draggable="false"
              sizes="100%"
              style={{
                objectFit: "cover",
                borderRadius: "0px 15px 15px 0px",
              }}
              loading="eager"
              priority
            />
          </div>
        </div>

        <address className={styles.contacts}>
          <div className={styles.contactsTraditional}>
            <div>
              <a href="tel:+392099545949">
                <Icon path={mdiPhone} size={1.5} />
              </a>
              <a href="tel:+392099545949">{contactInfo.phone}</a>
            </div>
            <div>
              <a href="mailto:karayaka@gmail.com">
                <Icon path={mdiEmail} size={1.5} />
              </a>
              <a href="mailto:karayaka@gmail.com">{contactInfo.email}</a>
            </div>
          </div>
          <div className={styles.contactsSocial}>
            <div>
              <a href={contactInfo.telegram} target="_blank" rel="noopener noreferrer">
                <svg
                  className={styles.telegramIcon}
                  fill="#002F6C"
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
              <a href={contactInfo.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
            </div>
            <div>
              <a href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                <Icon path={mdiWhatsapp} size={1.5} />
              </a>
              <a href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">Whatsapp</a>
            </div>
          </div>
        </address>
      </main>
    </>
  );
}