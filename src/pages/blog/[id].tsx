import styles from "./id.module.scss";
import { useTranslation, LanguageSwitcher } from "next-export-i18n";
import { useLanguageQuery } from "next-export-i18n";
import Head from "next/head";

import { Date } from "@/lib/components";
import { LocalizedPostData } from "@/lib/utils";
import { getAllPostIds, getPostData } from "@/lib/utils/blogServer";
import { BlogPostSchema } from "@/lib/components/SEO/JsonLd";
import { getImageUrl } from "@/lib/utils/imageHelper";

interface PostParams {
  id: string;
}

export default function Post({ postData }: { postData: LocalizedPostData }) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  // Use string type assertion to ensure lang is a string
  const lang = (query?.lang as string) || "ru";
  const localizedPostData = postData[lang] || postData["ru"] || postData["en"];

  if (!localizedPostData) {
    return <div>Loading...</div>;
  }

  const pageUrl = `https://karayaka.ru/blog/${localizedPostData.id}`;
  const imageUrl = getImageUrl(`/images/${localizedPostData.id}.jpg`);

  return (
    <>
      <Head>
        <title>{localizedPostData.title}</title>
        <meta name="description" content={localizedPostData.excerpt || ''} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        
        {/* Yandex метаданные */}
        <meta name="yandex:display_title" content={localizedPostData.title} />
        
        {/* Open Graph для VK и других соцсетей */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={localizedPostData.title} />
        <meta property="og:description" content={localizedPostData.excerpt || ''} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content={localizedPostData.title} />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={lang === 'ru' ? 'ru_RU' : 'en_US'} />
        <meta property="article:published_time" content={localizedPostData.date} />
        
        {/* VK Open Graph */}
        <meta property="vk:image" content={imageUrl} />
      </Head>

      <BlogPostSchema
        title={localizedPostData.title}
        datePublished={localizedPostData.date}
        description={localizedPostData.excerpt || ''}
        imageUrl={imageUrl}
        articleUrl={pageUrl}
        authorName="Karayaka"
      />

      <main className={styles.main}>
        <section className={styles.article}>
          <h1>{localizedPostData.title}</h1>
          <br />
          <Date dateString={localizedPostData.date} />
          <br />
          <div className={styles.languageSwitcher}>
            <div className={lang === "ru" ? styles.activeLocale : ""}>
              <LanguageSwitcher lang="ru">
                RU
              </LanguageSwitcher>
            </div>
            <div className={lang === "en" ? styles.activeLocale : ""}>
              <LanguageSwitcher lang="en">
                EN
              </LanguageSwitcher>
            </div>
          </div>
          <br />
          {localizedPostData.contentHtml && (
            <div dangerouslySetInnerHTML={{ __html: localizedPostData.contentHtml }} />
          )}
        </section>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: PostParams }) {
  try {
    const postData = await getPostData(params.id);
    return {
      props: {
        postData,
      },
    };
  } catch (error) {
    console.error(`Error fetching post ${params.id}:`, error);
    return {
      notFound: true,
    };
  }
}