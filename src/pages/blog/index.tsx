import { useTranslation, LinkWithLocale } from "next-export-i18n";
import { useLanguageQuery } from "next-export-i18n";
import Image from "next/image";
import styles from "./index.module.scss";

import { PostData, getImageUrl } from "@/lib/utils";
import { getSortedPostsData } from "@/lib/utils/blogServer";

export default function Blog({ allBlogData }: { allBlogData: { [key: string]: PostData[] } }) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  const lang = (query?.lang as string) || "ru";
  const posts = allBlogData[lang] || allBlogData["ru"] || [];

  if (!posts || !posts.length) {
    return <div>{t("blog.noPosts")}</div>;
  }

  return (
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
  );
}

export async function getStaticProps() {
  const languages = ["en", "ru"];
  const allBlogData: { [key: string]: PostData[] } = {};

  for (const lang of languages) {
    allBlogData[lang] = await getSortedPostsData(lang);
    console.log(`Posts for ${lang}:`, allBlogData[lang]);
  }

  return {
    props: {
      allBlogData,
    },
  };
}
