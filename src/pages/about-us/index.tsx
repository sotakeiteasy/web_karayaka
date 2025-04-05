import styles from "./index.module.scss";
import Image from "next/image";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import Head from "next/head";
import { useLanguageQuery } from "next-export-i18n";

import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";

import { getImageUrl } from "@/lib/utils/imageHelper";
import { OrganizationSchema, FAQPageSchema } from "@/lib/components/SEO/JsonLd";

export default function AboutUs() {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const lang = (query?.lang as string) || "ru";

  type FAQKey =
    | "location"
    | "period"
    | "tour"
    | "contact"
    | "area"
    | "personnel";

  const questionsFAQ: Record<FAQKey, string> = {
    location: t("aboutUs.faq.questions.location"),
    period: t("aboutUs.faq.questions.period"),
    tour: t("aboutUs.faq.questions.tour"),
    contact: t("aboutUs.faq.questions.contact"),
    area: t("aboutUs.faq.questions.area"),
    personnel: t("aboutUs.faq.questions.personnel"),
  };

  const answersFAQ: Record<FAQKey, string> = {
    location: t("aboutUs.faq.answers.location"),
    period: t("aboutUs.faq.answers.period"),
    tour: t("aboutUs.faq.answers.tour"),
    contact: t("aboutUs.faq.answers.contact"),
    area: t("aboutUs.faq.answers.area"),
    personnel: t("aboutUs.faq.answers.personnel"),
  };

  const [activeKey, setActiveKey] = useState<FAQKey>("location");

  function toggleAnswers(key: FAQKey) {
    setActiveKey(key);
  }

  // Создаем массив вопросов-ответов для JSON-LD схемы
  const faqItems = Object.keys(questionsFAQ).map((key) => ({
    question: questionsFAQ[key as FAQKey],
    answer: answersFAQ[key as FAQKey],
  }));

  return (
    <>
      <Head>
        <title>{t("aboutUs.meta.title")}</title>
        <meta name="description" content={t("aboutUs.meta.description")} />
        <meta name="keywords" content={t("aboutUs.meta.keywords")} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        
        {/* Yandex метаданные */}
        <meta name="yandex:display_title" content={t("aboutUs.meta.title")} />
        
        {/* Open Graph для VK и других соцсетей */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karayaka.ru/about-us" />
        <meta property="og:title" content={t("aboutUs.meta.title")} />
        <meta property="og:description" content={t("aboutUs.meta.description")} />
        <meta property="og:image" content="https://karayaka.ru/og-image.png" />
        <meta property="og:image:alt" content="Karayaka About Us" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={lang === 'ru' ? 'ru_RU' : 'en_US'} />
        
        {/* VK Open Graph */}
        <meta property="vk:image" content="https://karayaka.ru/og-image.png" />
      </Head>

      <OrganizationSchema
        name="Karayaka"
        description={t("aboutUs.meta.description")}
        logo="https://karayaka.ru/logo.png"
        url="https://karayaka.ru/about-us"
      />

      <FAQPageSchema
        questions={faqItems}
        pageUrl="https://karayaka.ru/about-us"
      />

      <main className={styles.main}>
        <div className={styles.sloganBlock}>
          <Image
            src={getImageUrl("/images/line1.jpg")}
            alt=""
            fill={true}
            style={{
              objectFit: "cover",
            }}
            loading="eager"
            draggable="false"
          />

          <div className={styles.slogan}>
            <p>dream</p>
            <p>find</p>
            <p>buy</p>
            <p>live</p>
          </div>
        </div>

        <header>
          <h1>{t("aboutUs.header")}</h1>
          <p>{t("aboutUs.description")}</p>
        </header>

        <div className={styles.banner}>
          <Image
            src={getImageUrl("/images/line2.jpg")}
            alt=""
            fill={true}
            style={{
              objectFit: "cover",
            }}
            loading="eager"
            draggable="false"
          />
        </div>

        <div className={styles.stats}>
          <section>
            <h2>{t("aboutUs.stats.forSale")}</h2>
            <p>{t("aboutUs.stats.forSaleLabel")}</p>
          </section>

          <section>
            <h2>{t("aboutUs.stats.regions")}</h2>
            <p>{t("aboutUs.stats.regionsLabel")}</p>
          </section>

          <section>
            <h2>{t("aboutUs.stats.forRent")}</h2>
            <p>{t("aboutUs.stats.forRentLabel")}</p>
          </section>
        </div>

        <div className={styles.infoBlock}>
          <section className={styles.faq}>
            <h2>{t("aboutUs.faq.title")}</h2>

            {(Object.keys(questionsFAQ) as FAQKey[]).map((key) => (
              <div className={styles.faqRow} key={key}>
                <Icon
                  path={mdiChevronRight}
                  size={1.5}
                  style={{
                    opacity: 0,
                  }}
                  className={activeKey === key ? styles.activeIcon : ""}
                />
                <button
                  className={activeKey === key ? styles.activeButton : ""}
                  onClick={() => toggleAnswers(key)}
                >
                  {questionsFAQ[key]}
                </button>
              </div>
            ))}
          </section>

          <section className={styles.answerBlock}>
            <h2>{questionsFAQ[activeKey]}</h2>
            <p>{answersFAQ[activeKey]}</p>
          </section>
        </div>
      </main>
    </>
  );
}