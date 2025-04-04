import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import styles from "./index.module.scss";
import SimpleSlider from "./simpleSlider/simpleSlider";
import ContactUs from "@components/form/form";

import { getSortedPostsData } from "@/lib/utils/blog";
import { getImageUrl } from "@/lib/utils/imageHelper";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
}

export default function Home({
  allBlogData,
  locale,
}: {
  allBlogData: BlogPost[];
  locale: "en" | "ru";
}) {
  const { t } = useTranslation("common");
  const [isBuy, setIsBuy] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const encodedQuery = encodeURIComponent(searchQuery.trim());
    router.push(
      `/search?type=${isBuy ? "sale" : "rent"}&address=${encodedQuery}`
    );
  };

  return (
    <>
      <Head>
        <title>Karayaka</title>
        <meta name="description" content="Real estate in Turkey and Russia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.mainImageContainer}>
          {locale === "ru" ? (
            <video
              className={styles.video}
              src={getImageUrl("/videos/new.webm")}
              loop
              autoPlay
              muted
              preload="auto"
              height={680}
              width={1600}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Image
              src={getImageUrl("/images/moscow3.jpg")}
              alt="views of moscow"
              sizes="100vw"
              quality={100}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          )}

          <div className={styles.searchBlock}>
            <input
              id="search"
              type="text"
              placeholder={t("home.searchPlaceholder")}
              aria-label="search"
              autoComplete="off"
              spellCheck="false"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {locale === "ru" ? (
              <button
                className={`${styles.toggleButton} ${styles.toggleButtonRu} ${
                  isBuy ? styles.toggleButtonActiveRu : ""
                }`}
                onClick={() => setIsBuy(!isBuy)}
              >
                <span>{t("home.rentBtn")}</span>
                <span>{t("home.buyBtn")}</span>
              </button>
            ) : (
              <button
                className={`${styles.toggleButton} ${
                  isBuy ? styles.toggleButtonActive : ""
                }`}
                onClick={() => setIsBuy(!isBuy)}
              >
                <span>{t("home.rentBtn")}</span>
                <span>{t("home.buyBtn")}</span>
              </button>
            )}
            <button className={styles.searchButton} onClick={handleSearch}>
              {t("home.searchBtn")}
            </button>
          </div>
        </div>

        <SimpleSlider
          type="rent"
          country={locale === "en" ? "Russia" : "Turkey"}
          locale={locale}
        />

        <SimpleSlider
          type="sale"
          country={locale === "en" ? "Russia" : "Turkey"}
          locale={locale}
        />

        <div className={styles.articleBlock}>
          <h1 className={styles.header}>{t("home.articles")}</h1>
          {allBlogData.slice(0, 2).map(({ id, title, excerpt }) => (
            <div key={id} className={styles.articleLink}>
              <Link href={`/blog/${id}`} locale={locale}>
                <Image
                  className={styles.articleImage}
                  src={getImageUrl(`/images/${id}.jpg`)}
                  width={500}
                  height={500}
                  alt={title}
                  draggable="false"
                />
                <div className={styles.articleDescription}>
                  <h2 className={styles.articleTitle}>{title}</h2>
                  {excerpt && (
                    <div className={styles.articleText}>
                      <p>{excerpt}</p>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.contactBlock}>
          <ContactUs />
        </div>
      </main>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: "en" | "ru" }) {
  const allBlogData = await getSortedPostsData(locale);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      allBlogData,
      locale,
    },
  };
}
