import styles from "./id.module.scss";
import { useTranslation, LanguageSwitcher } from "next-export-i18n";
import { useLanguageQuery } from "next-export-i18n";
import Head from "next/head";

import { Date, BlogPostSchema } from "@/lib/components";
import { LocalizedPostData, getImageUrl } from "@/lib/utils";
import { getAllPostIds, getPostData } from "@/lib/utils/blogServer";

interface PostParams {
  id: string;
}

interface PostProps {
  postData: LocalizedPostData;
  baseTags: {
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

export default function Post({ postData, baseTags }: PostProps) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  const lang = (query?.lang as 'ru' | 'en') || "ru";
  const localizedPostData = postData[lang];
  const baseMeta = baseTags[lang];

  if (!localizedPostData) {
    return <div>Loading...</div>;
  }

  const pageUrl = `https://karayaka.ru/blog/${localizedPostData.id}`;
  const imageUrl = getImageUrl(`/images/${localizedPostData.id}.jpg`);

  const meta = {
    title: `${localizedPostData.title} - ${baseMeta.title}`,
    description: localizedPostData.excerpt || baseMeta.description,
    keywords: baseMeta.keywords
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content={localizedPostData.title} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={lang === 'ru' ? 'ru_RU' : 'en_US'} />
        <meta property="article:published_time" content={localizedPostData.date} />
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
            <button className={lang === "ru" ? styles.activeLocale : ""}>
              <LanguageSwitcher lang="ru">
                RU
              </LanguageSwitcher>
            </button>
            <button className={lang === "en" ? styles.activeLocale : ""}>
              <LanguageSwitcher lang="en">
                EN
              </LanguageSwitcher>
            </button>
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
    
    // Базовые мета-теги для страницы блога
    const baseTags = {
      ru: {
        title: "Блог Караяка",
        description: "Статьи и новости о недвижимости в Турции и России",
        keywords: "блог о недвижимости, статьи о недвижимости, недвижимость в Турции, недвижимость в России"
      },
      en: {
        title: "Karayaka Blog",
        description: "Articles and news about real estate in Turkey and Russia",
        keywords: "real estate blog, real estate articles, property in Turkey, property in Russia"
      }
    };
    
    return {
      props: {
        postData,
        baseTags
      },
    };
  } catch (error) {
    console.error(`Error fetching post ${params.id}:`, error);
    return {
      notFound: true,
    };
  }
}