import Head from 'next/head';
import {
  // useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTranslation, LinkWithLocale, useLanguageQuery } from 'next-export-i18n';
import Icon from '@mdi/react';
import { mdiMagnify, mdiCheckCircle, mdiEarth, mdiHomeCity, mdiPiggyBank, mdiGavel } from '@mdi/js';

import styles from './HomePage.module.scss';
import {
  ContainerWrapper,
  // Skeleton
} from '@/lib/components';
import { getImageUrl } from '@/lib/utils';
import { PostData, MetaTags } from '@/lib/types';
import { Divider } from 'antd';

import dynamic from 'next/dynamic';

import VideoPlayer from './MainVideo/MainVideo';
import SimpleSlider from './SimpleSlider/SimpleSlider';

const ContactUs = dynamic(() => import('@/lib/components/ContactUs/ContactUs').then((mod) => mod.ContactUs), {
  ssr: false,
  loading: () => (
    <div
      className={styles.contactUsSkeleton}
      style={{
        height: 650,
        width: '100%',
        backgroundColor: '#f0f0f0',
        background: 'linear-gradient(110deg, #f0f0f0 30%, #e0e0e0 50%, #f0f0f0 70%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    ></div>
  ),
});

export function Home({ blogData, metaTags }: { blogData: Record<string, PostData[]>; metaTags: MetaTags }) {
  const router = useRouter();

  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const lang = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[lang];
  const posts = blogData[lang];

  const [isBuy, setIsBuy] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const encodedQuery = encodeURIComponent(searchQuery.trim());
    router.push(`/${isBuy ? 'buy/' : 'rent/'}&address=${encodedQuery}&lang=${lang}`);
  };

  // const [videoLoaded, setVideoLoaded] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setVideoLoaded(true);
  //   }, 300);

  //   return () => clearTimeout(timer);
  // }, []);

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
        <meta property="og:url" content="https://karayaka.ru/" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://karayaka.ru/og-image.png" />
        <meta property="og:image:alt" content="Karayaka" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content="ru_RU" />
      </Head>

      <main className={styles.main}>
        <div className={styles.mainImageContainer}>
          <VideoPlayer lang={lang} />
          <div className={styles.searchBlock}>
            <div className={styles.inputContainer}>
              <input
                id="search"
                type="text"
                placeholder={t('home.searchPlaceholder')}
                aria-label="search"
                autoComplete="off"
                spellCheck="false"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                className={styles.searchButton}
                onClick={handleSearch}
                aria-label={t('home.searchBtn')}
                title={t('home.searchBtn')}
              >
                <Icon path={mdiMagnify} size={1.5} />
              </button>
            </div>
            <div className={styles.buttonsContainer}>
              {lang === 'ru' ? (
                <button
                  className={`${styles.toggleButton} ${styles.toggleButtonRu} ${
                    isBuy ? styles.toggleButtonActiveRu : ''
                  }`}
                  onClick={() => setIsBuy(!isBuy)}
                >
                  <span>{t('home.rentBtn')}</span>
                  <span>{t('home.buyBtn')}</span>
                </button>
              ) : (
                <button
                  className={`${styles.toggleButton} ${isBuy ? styles.toggleButtonActive : ''}`}
                  onClick={() => setIsBuy(!isBuy)}
                >
                  <span>{t('home.rentBtn')}</span>
                  <span>{t('home.buyBtn')}</span>
                </button>
              )}
              <div role="button" className={styles.moreButton}>
                <LinkWithLocale href={`/${isBuy ? 'buy' : 'rent'}/`}>{t('home.seeAll')}</LinkWithLocale>
              </div>
            </div>
          </div>
        </div>
        <p className={styles.slogan}>{t('home.slogan')}</p>

        <ContainerWrapper width="1100px" withMarginBottom>
          <SimpleSlider type="discounts" country={lang === 'en' ? 'Russia' : 'Turkey'} locale={lang} />

          {/* {!videoLoaded ? (
            <Skeleton height="550px" width="100%" marginTop="50px" marginBottom="50px" />
          ) : ( */}
          <SimpleSlider type="buy" country={lang === 'en' ? 'Russia' : 'Turkey'} locale={lang} />
          {/* )} */}

          {/* {!videoLoaded ? (
            <Skeleton height="550px" width="100%" marginTop="50px" marginBottom="50px" />
          ) : ( */}
          <SimpleSlider type="rent" country={lang === 'en' ? 'Russia' : 'Turkey'} locale={lang} />
          {/* )} */}

          {/* {!videoLoaded ? (
            <Skeleton height="100%" />
          ) : ( */}
          <div className={styles.advantagesBlock}>
            <h2 className={styles.header}>{t('home.advantages.title')}</h2>
            <div className={styles.advantages}>
              <div className={styles.advantage}>
                <Icon className={styles.image} path={mdiGavel} size={2.5} />
                <section>
                  <h3>{t('home.advantages.items.0.title')}</h3>
                  <p>{t('home.advantages.items.0.description')}</p>
                </section>
              </div>
              <div className={styles.advantage}>
                <Icon className={styles.image} path={mdiPiggyBank} size={2.5} />
                <section>
                  <h3>{t('home.advantages.items.1.title')}</h3>
                  <p>{t('home.advantages.items.1.description')}</p>
                </section>
              </div>
              <div className={styles.advantage}>
                <Icon className={styles.image} path={mdiHomeCity} size={2.5} />
                <section>
                  <h3>{t('home.advantages.items.2.title')}</h3>
                  <p>{t('home.advantages.items.2.description')}</p>
                </section>
              </div>
              <div className={styles.advantage}>
                <Icon className={styles.image} path={mdiEarth} size={2.5} />
                <section>
                  <h3>{t('home.advantages.items.3.title')}</h3>
                  <p>{t('home.advantages.items.3.description')}</p>
                </section>
              </div>
              <div className={styles.advantage}>
                <Icon className={styles.image} path={mdiCheckCircle} size={2.5} />
                <section>
                  <h3>{t('home.advantages.items.4.title')}</h3>
                  <p>{t('home.advantages.items.4.description')}</p>
                </section>
              </div>
            </div>
          </div>
          {/* )} */}
          <div className={styles.articleBlock}>
            <h2 className={styles.header}>{t('home.articles')}</h2>
            {posts.map(({ id, title, excerpt }: PostData) => (
              <div key={id} className={styles.articleLink}>
                <LinkWithLocale href={`/blog/${id}/`}>
                  <div className={styles.articleImage}>
                    <Image
                      src={getImageUrl(`assets/images/articles/${id}.jpg`)}
                      fill={true}
                      alt={title}
                      title={title}
                      draggable="false"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
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
          <Divider />
          <ContactUs />
        </ContainerWrapper>
      </main>
    </>
  );
}
