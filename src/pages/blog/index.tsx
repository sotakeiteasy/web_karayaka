import { useTranslation, LinkWithLocale } from "next-export-i18n";
import { useLanguageQuery } from "next-export-i18n";
import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.scss";

import { PostData, getImageUrl } from "@/lib/utils";
import { getSortedPostsData } from "@/lib/utils/blogServer";

interface BlogPageProps {
  allBlogData: { [key: string]: PostData[] };
  metaTags: {
    ru: {
      title: string;
      description: string;
      keywords: string;
    };
    en: {
      title: string;
      description: string;
      keywords: string;
    };
  };
}

export default function Blog({ allBlogData, metaTags }: BlogPageProps) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  const lang = (query?.lang as 'ru' | 'en') || "ru";
  const meta = metaTags[lang];
  const posts = allBlogData[lang];

  if (!posts || !posts.length) {
    return <div>{t("blog.noPosts")}</div>;
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karayaka.ru/blog" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://karayaka.ru/og-image.png" />
        <meta property="og:image:alt" content="Karayaka Blog" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={lang === 'ru' ? 'ru_RU' : 'en_US'} />
      </Head>

      <main className={styles.main}>
        {posts.map(({ id, title, excerpt }: PostData) => (
          <div key={id} className={styles.articleCard}>
            <LinkWithLocale href={`/blog/${id}`}>
              <div className={styles.articleImage}>
                <Image
                  src={getImageUrl(`/images/${id}.jpg`)}
                  fill={true}
                  alt=" "
                  sizes="100%"
                  style={{
                    objectFit: "cover",
                    borderRadius: "15px 0px 0px 15px",
                  }}
                  loading="eager"
                  priority
                />
              </div>
              <section className={styles.articlePreview}>
                <h2 className={styles.articleTitle}>{title}</h2>
                {excerpt && (
                  <div className={styles.articleText}>
                    <p>{excerpt}</p>
                  </div>
                )}
              </section>
            </LinkWithLocale>
          </div>
        ))}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const languages = ["en", "ru"];
  const allBlogData: { [key: string]: PostData[] } = {};

  for (const lang of languages) {
    allBlogData[lang] = await getSortedPostsData(lang);
  }

  // Предварительно загружаем переводы для мета-тегов
  const metaTags = {
    ru: {
      title: "Блог - Караяка | Статьи о недвижимости в Турции и России",
      description: "Полезные статьи и информация о недвижимости и инвестициях в Турции и России. Советы экспертов, анализ рынка, правовые аспекты.",
      keywords: "блог о недвижимости, недвижимость в Турции, недвижимость в России, инвестиции в недвижимость"
    },
    en: {
      title: "Blog - Karayaka | Articles about Real Estate in Turkey and Russia",
      description: "Useful articles and information about real estate and investments in Turkey and Russia. Expert advice, market analysis, legal aspects.",
      keywords: "real estate blog, real estate in Turkey, real estate in Russia, property investment"
    }
  };

  return {
    props: {
      allBlogData,
      metaTags
    },
  };
}
