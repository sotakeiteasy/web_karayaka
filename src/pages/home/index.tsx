import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTranslation, LinkWithLocale } from "next-export-i18n";
import { useLanguageQuery } from "next-export-i18n";

import styles from "./index.module.scss";
import SimpleSlider from "./simpleSlider/simpleSlider";
import { ContactUs, OrganizationSchema } from "@/lib/components";

// типы из клиентского файла, но функции из серверного
import { PostData } from "@/lib/utils/blogClient";
import { getSortedPostsData } from "@/lib/utils/blogServer";
import { getImageUrl } from "@/lib/utils/imageHelper";

type BlogPost = PostData;
interface BlogData {
  [key: string]: BlogPost[];
}

export default function Home({
  allBlogData,
}: {
  allBlogData: BlogData;
}) {
  const router = useRouter();

  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const lang = (query?.lang as "ru" || "en") || "ru";

  const posts = allBlogData[lang] || [];
  const [isBuy, setIsBuy] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const encodedQuery = encodeURIComponent(searchQuery.trim());
    router.push(
      `/search?type=${isBuy ? "sale" : "rent"}&address=${encodedQuery}&lang=${lang}`
    );
  };

  return (
    <>
      <Head>
        <title>{t("home.meta.title")}</title>
        <meta name="description" content={t("home.meta.description")} />
        <meta name="keywords" content={t("home.meta.keywords")} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        
        {/* Yandex метаданные */}
        <meta name="yandex-verification" content="48e2a3db9fca6f0e" />
        <meta name="yandex:display_title" content={t("home.meta.title")} />
        
        {/* Open Graph для VK и других соцсетей */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karayaka.ru/" />
        <meta property="og:title" content={t("home.meta.title")} />
        <meta property="og:description" content={t("home.meta.description")} />
        <meta property="og:image" content="https://karayaka.ru/og-image.jpg" />
        <meta property="og:image:alt" content="Karayaka" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content="ru_RU" />
        
        {/* VK Open Graph */}
        <meta property="vk:image" content="https://karayaka.ru/og-image.jpg" />
      </Head>

      <OrganizationSchema
        name="Karayaka"
        description={t("home.meta.description")}
        logo="https://karayaka.ru/logo.png"
        url="https://karayaka.ru"
      />

      <main className={styles.main}>
        <div className={styles.mainImageContainer}>
          {lang === "ru" ? (
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
            {lang === "ru" ? (
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
          country={lang === "ru" ? "Russia" : "Turkey"}
          locale={lang}
        />

        <SimpleSlider
          type="sale"
          country={lang === "ru" ? "Russia" : "Turkey"}
          locale={lang}
        />

        <div className={styles.articleBlock}>
          <h1 className={styles.header}>{t("home.articles")}</h1>
          {posts.slice(0, 2).map(({ id, title, excerpt }: BlogPost) => (
            <div key={id} className={styles.articleLink}>
              <LinkWithLocale href={`/blog/${id}`}>
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
              </LinkWithLocale>
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

export async function getStaticProps() {
  const languages = ["en", "ru"];
  const allBlogData: BlogData = {};

  for (const lang of languages) {
    allBlogData[lang] = await getSortedPostsData(lang);
  }

  return {
    props: {
      allBlogData,
    },
  };
}
