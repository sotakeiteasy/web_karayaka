import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTranslation, LinkWithLocale } from "next-export-i18n";
import { useLanguageQuery } from "next-export-i18n";

import styles from "./index.module.scss";
import SimpleSlider from "./simpleSlider/simpleSlider";
import { ContactUs } from "@/lib/components";

// Используем типы из клиентского файла, но функции из серверного
import { PostData } from "@/lib/utils/blogClient";
import { getSortedPostsData } from "@/lib/utils/blogServer";
import { getImageUrl } from "@/lib/utils/imageHelper";

// Определяем alias типа для совместимости
type BlogPost = PostData;

interface BlogData {
  [key: string]: BlogPost[];
}

type SupportedLanguage = "ru" | "en";

export default function Home({
  allBlogData,
}: {
  allBlogData: BlogData;
}) {
  const router = useRouter();

  const { t } = useTranslation();
  const queryLang = router.query.lang as string | undefined;
  const lang = (queryLang === "en" ? "en" : "ru") as SupportedLanguage;

  const posts = allBlogData[lang] || [];
  const [isBuy, setIsBuy] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
          country={lang === "en" ? "Russia" : "Turkey"}
          locale={lang}
        />

        <SimpleSlider
          type="sale"
          country={lang === "en" ? "Russia" : "Turkey"}
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
