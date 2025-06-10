import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTranslation, LinkWithLocale, useLanguageQuery } from 'next-export-i18n';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';

import styles from './index.module.scss';
import SimpleSlider from './SimpleSlider/SimpleSlider';
import { ContactUs } from '@/lib/components';
import { getImageUrl } from '@/lib/utils';
import { PostData } from '@/lib/types';
import { MetaTags } from '@/lib/types';

export function Home({ allBlogData, metaTags }: { allBlogData: Record<string, PostData[]>; metaTags: MetaTags }) {
  const router = useRouter();

  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const lang = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[lang];
  const posts = allBlogData[lang];

  const [isBuy, setIsBuy] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const encodedQuery = encodeURIComponent(searchQuery.trim());
    router.push(`/${isBuy ? 'buy' : 'rent'}&address=${encodedQuery}&lang=${lang}`);
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
          {lang === 'ru' ? (
            <video
              className={styles.video}
              loop
              autoPlay
              muted
              preload="auto"
              height={680}
              width={1600}
              style={{ objectFit: 'cover' }}
              playsInline
              /* eslint-disable react/no-unknown-property */
              webkit-playsinline="true"
              controls={false}
            >
              <source src={getImageUrl('/videos/new.webm')} type="video/webm" />
              {/* Fallback source - MP4 for iOS */}
              <source src={getImageUrl('/videos/new.mp4')} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={getImageUrl('/images/moscow3.jpg')}
              alt="views of moscow"
              sizes="100vw"
              quality={100}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          )}

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
              <button className={styles.searchButton} onClick={handleSearch}>
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
                <LinkWithLocale href={`/${isBuy ? 'buy' : 'rent'}`}>{t('home.seeAll')}</LinkWithLocale>
              </div>
            </div>
          </div>
        </div>

        <SimpleSlider type="buy" country={lang === 'en' ? 'Russia' : 'Turkey'} locale={lang} />

        <SimpleSlider type="rent" country={lang === 'en' ? 'Russia' : 'Turkey'} locale={lang} />

        <div className={styles.articleBlock}>
          <h1 className={styles.header}>{t('home.articles')}</h1>
          {posts.slice(0, 2).map(({ id, title, excerpt }: PostData) => (
            <div key={id} className={styles.articleLink}>
              <LinkWithLocale href={`/blog/${id}`}>
                <div className={styles.articleImage}>
                  <Image
                    src={getImageUrl(`/images/${id}.jpg`)}
                    fill={true}
                    alt={title}
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

        <div className={styles.contactBlock}>
          <ContactUs />
        </div>
      </main>
    </>
  );
}
