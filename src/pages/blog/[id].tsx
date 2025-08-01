import styles from './id.module.scss';
import { LanguageSwitcher, LinkWithLocale, useTranslation } from 'next-export-i18n';
import { useLanguageQuery } from 'next-export-i18n';
import Head from 'next/head';
import { createExcerpt, getImageUrl } from '@/lib/utils';
import { getAllPostIds, getPostData, getSortedPostsData } from '@/lib/server/blogServer';
import { MetaTags, LocalizedPostData, PostData } from '@/lib/types';

import { parseISO, format } from 'date-fns';
import { ArticleCard, Breadcrumbs, ContainerWrapper } from '@/lib/components';
import { articleScheme } from '@/lib/seo';

function Date({ dateString }: { dateString: string }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}

export default function Post({
  postData,
  allBlogData,
  metaTags,
}: {
  postData: LocalizedPostData;
  allBlogData: Record<string, PostData[]>;
  metaTags: MetaTags;
}) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  const lang = (query?.lang as 'ru' | 'en') || 'ru';
  const localizedPostData = postData[lang]!;
  const meta = metaTags[lang];

  const posts = allBlogData[lang];
  const number = Number(localizedPostData.id.match(/\d+/)?.[0])!;
  const id1 = number + 1 < Object.keys(posts).length ? number + 1 : Object.keys(posts).length - 1;
  const id2 = number + 2 < Object.keys(posts).length ? number + 2 : Object.keys(posts).length - 2;
  const FirstRecomendation = posts[id1];
  const SecondRecomendation = posts[id2];

  if (!localizedPostData) {
    return <div>Loading...</div>;
  }

  const pageUrl = `https://karayaka.ru/blog/${localizedPostData.id}`;
  const imageUrl = getImageUrl(`/images/articles/${localizedPostData.id}.jpg`);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />

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
        {lang === 'ru' && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleScheme(localizedPostData, pageUrl, imageUrl)) }}
          />
        )}
      </Head>
      <main className={styles.main}>
        <ContainerWrapper width="standard" withMarginBottom={true}>
          <Breadcrumbs
            items={[
              { href: '/blog', t: 'header.blog' },
              { href: '/custom-offers', title: localizedPostData.title },
            ]}
          />
          <article className={styles.article}>
            <h1>{localizedPostData.title}</h1>
            <Date dateString={localizedPostData.date} />
            <div className={styles.languageSwitcher}>
              <LanguageSwitcher lang="ru">RU</LanguageSwitcher>
              <LanguageSwitcher lang="en">EN</LanguageSwitcher>
            </div>
            {localizedPostData.contentHtml && (
              <div
                dangerouslySetInnerHTML={{
                  __html: localizedPostData.contentHtml
                    .replace(/<h3(.*?)>(.*?)<\/h3>/g, '<h2$1>$2</h2>')
                    .replace(
                      /<img ([^>]*?)alt="[^"]*"([^>]*?)>/g,
                      `<img $1alt="${localizedPostData.title}" title="${localizedPostData.title}"$2>`
                    )
                    .replace(
                      /<img ((?!alt=)[^>])*?>/g,
                      `<img alt="${localizedPostData.title}" title="${localizedPostData.title}" $1>`
                    ),
                }}
              />
            )}
          </article>
          <p className={styles.recomendationsHeader}>
            {' '}
            <LinkWithLocale href={`/blog/`}>{t('blog.anotherArticles')}</LinkWithLocale>
          </p>
          <div className={styles.recomendations}>
            <ArticleCard
              id={FirstRecomendation.id}
              title={FirstRecomendation.title}
              date={FirstRecomendation.date}
              excerpt={FirstRecomendation.excerpt}
              direction="column"
            ></ArticleCard>
            <ArticleCard
              id={SecondRecomendation.id}
              title={SecondRecomendation.title}
              date={SecondRecomendation.date}
              excerpt={SecondRecomendation.excerpt}
              direction="column"
            ></ArticleCard>
          </div>
        </ContainerWrapper>
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

export async function getStaticProps({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);

  const languages = ['en', 'ru'];
  const allBlogData: { [key: string]: PostData[] } = {};

  for (const lang of languages) {
    allBlogData[lang] = await getSortedPostsData(lang);
  }
  const ruExcerpt = postData.ru && postData.ru.contentHtml ? createExcerpt(postData.ru.contentHtml) : null;
  const enExcerpt = postData.en && postData.en.contentHtml ? createExcerpt(postData.en.contentHtml) : null;

  const metaTags = {
    ru: {
      title: `${postData.ru!.title} - Блог Караяка`,
      description: ruExcerpt,
      keywords: 'блог о недвижимости, статьи о недвижимости, недвижимость в Турции, недвижимость в России',
    },
    en: {
      title: `${postData.en!.title} - Karayaka Blog`,
      description: enExcerpt,
      keywords: 'real estate blog, real estate articles, property in Turkey, property in Russia',
    },
  };

  return {
    props: {
      allBlogData,
      postData,
      metaTags,
    },
  };
}
