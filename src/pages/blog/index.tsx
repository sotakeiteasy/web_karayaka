import { useTranslation } from 'next-export-i18n';
import { useLanguageQuery } from 'next-export-i18n';
import Head from 'next/head';
import styles from './index.module.scss';

import { getSortedPostsData } from '@/lib/server/blogServer';
import { MetaTags, PostData } from '@/lib/types';
import { ArticleCard } from '@/lib/components/Blog/ArticleCard';
import { Breadcrumbs } from '@/lib/components/Breadcrumbs/Breadcrumbs';
import { ContainerWrapper } from '@/lib/components/ContainerWrapper/ContainerWrapper';
import { blogScheme } from '@/lib/seo';

export default function Blog({
  allBlogData,
  metaTags,
}: {
  allBlogData: Record<string, PostData[]>;
  metaTags: MetaTags;
}) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  const lang = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[lang];
  const posts = allBlogData[lang];

  if (!posts || !posts.length) {
    return <div>{t('blog.noPosts')}</div>;
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />

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
        {lang === 'ru' && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(blogScheme(lang, meta.title, posts)) }}
          />
        )}
      </Head>

      <main className={styles.main}>
        <ContainerWrapper width="standard" withMarginBottom={true}>
          <Breadcrumbs items={[{ href: '/blog', t: 'header.blog' }]} />
          <div className={styles.articles}>
            {posts.map(({ id, title, excerpt, date }: PostData) => (
              <ArticleCard key={id} id={id} title={title} date={date} excerpt={excerpt}></ArticleCard>
            ))}
          </div>
        </ContainerWrapper>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const languages = ['en', 'ru'];
  const allBlogData: { [key: string]: PostData[] } = {};

  for (const lang of languages) {
    allBlogData[lang] = await getSortedPostsData(lang);
  }

  const metaTags = {
    ru: {
      title: 'Блог - Караяка | Статьи о недвижимости в Турции и России',
      description:
        'Полезные статьи и информация о недвижимости и инвестициях в Турции и России. Советы экспертов, анализ рынка, правовые аспекты.',
      keywords: 'блог о недвижимости, недвижимость в Турции, недвижимость в России, инвестиции в недвижимость',
    },
    en: {
      title: 'Blog - Karayaka | Articles about Real Estate in Turkey and Russia',
      description:
        'Useful articles and information about real estate and investments in Turkey and Russia. Expert advice, market analysis, legal aspects.',
      keywords: 'real estate blog, real estate in Turkey, real estate in Russia, property investment',
    },
  };

  return {
    props: {
      allBlogData,
      metaTags,
    },
  };
}
