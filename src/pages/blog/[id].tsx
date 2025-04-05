import { useTranslation, LinkWithLocale, LanguageSwitcher } from "next-export-i18n";
import { useLanguageQuery } from "next-export-i18n";
import Date from "@components/date/date";
import styles from "./id.module.scss";
import { getAllPostIds, getPostData } from "../../lib/utils/blog";

interface PostData {
  id: string;
  title: string;
  date: string;
  contentHtml?: string;
  excerpt?: string;
}

interface LocalizedPostData {
  [key: string]: PostData | undefined;
}

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

  return (
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
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  console.log("Generated paths:", paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: PostParams }) {
  try {
    const postData = await getPostData(params.id);
    console.log(`Data for post ${params.id}:`, postData);

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