import Head from "next/head";
// import Image from "next/image";
import styles from "@/styles/Home.module.scss";

import Link from "next/link";
import { useTranslation } from 'next-i18next';

import Image from 'next/image'
import imageView from '@assets/images/turkey-view.jpg'
import SimpleSlider from '@components/carousel/carousel'
import ContactUs from '@components/form/form';

import { getSortedPostsData } from "@/lib/blog";
import { useState } from "react";
// import videoView from '/videos/video-views.mp4'
import { useRouter } from "next/router";


export default function Home({allBlogData, locale}: {allBlogData: any, locale: string}) {
  const { t } = useTranslation('common');
  const [isRent, setIsRent] = useState(false)
  const [input, setInput] = useState('')
  const router = useRouter()

  
  const search = (query: string) => {
    if (!query) {
      return;
    }
  
    const encodedQuery = encodeURIComponent(query);

    router.push(`/search?type=${isRent ? "sale" : 'rent'}&address=${encodedQuery}`)
  }

  return (
    <>
      <Head>
        <title>Karayaka</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.mainImageContainer}>
          {/* <Image 
            src={imageView}
            alt='views of turkey'
            sizes="100vw"
            quality={100}
            fill
            style={{
              objectFit: 'cover',
            }}
            priority 
          /> */}
          {locale === 'ru' ? (
            <video className={styles.video}
              src='/videos/videoAI.mp4'
              loop
              autoPlay
              muted
              preload="auto"  
              height={700} 
              width={1600}
              style={{
              objectFit: 'cover',
              }}
            />
          ) : (
            <Image 
              src='/images/moscow3.jpg'
              alt='views of turkey'
              sizes="100vw"
              // width={100}
              // height={100}
              quality={100}
              fill
              style={{
                objectFit: 'cover',
              }}
              priority 
            /> 
          )
        }
          
          {/* <p className={styles.previewText}>{t('home.hero')}</p> */}
          <div className={styles.searchBlock}>
            <label htmlFor="search"></label>
            <input 
              id="search" 
              type="text" 
              placeholder={t('home.searchPlaceholder')}
              aria-label="search"
              autoComplete="off"
              spellCheck="false"
              value={input}
              onChange={((e) => setInput(e.target.value))}
              />
              {locale === 'ru' ? (
                <button 
                  className={`${styles.toggleButton} ${styles.toggleButtonRu} ${isRent ? styles.toggleButtonActiveRu : ""}`} 
                  onClick={() => setIsRent(!isRent)}
                >
                  <span>{t('home.rentBtn')}</span>
                  <span>{t('home.buyBtn')}</span>
                </button>
              ) : (
                <button 
                  className={`${styles.toggleButton} ${isRent ? styles.toggleButtonActive : ""}`} 
                  onClick={() => setIsRent(!isRent)}
                >
                  <span>{t('home.rentBtn')}</span>
                  <span>{t('home.buyBtn')}</span>
                </button>
              )}
              <button className={styles.searchButton} onClick={() => search(input)}>{t('home.searchBtn')}</button>
          </div>
        </div>
        <div className={styles.carouselBlock}>
            <h1 className={styles.header}>{t('home.rent')}</h1>
            <div className={styles.carousel}>
              <SimpleSlider type='rent' country={locale === 'en' ? 'Russia' : 'Turkey'} locale={locale as "tr" | "en" | "ru"}/>
            </div>
            <button className={styles.blockButton}><Link href="/search?type=rent" locale={locale}>{t('home.seeAll')}</Link></button>
        </div>
        <div className={styles.carouselBlock}>
            <h1 className={styles.header}>
              {t('home.buy')}
            </h1>
            <div className={styles.carousel}>
              <SimpleSlider type='sale' country={locale === 'en' ? 'Russia' : 'Turkey'} locale={locale as "tr" | "en" | "ru"}/>
            </div>
            <button className={styles.blockButton}><Link href="/search?type=sale" locale={locale}>{t('home.seeAll')}</Link></button>
        </div>  
        <div className={styles.articleBlock}>
          <h1 className={styles.header}>{t('home.articles')}</h1> 
          {allBlogData.map((article: any) => (
            <div key={article.id} className={styles.articleLink}>
              <Link
                href={`/blog/${article.id}`}
                locale={locale}
              >
                <Image
                  className={styles.articleImage}
                  src={imageView}
                  alt="image"
                />  
                <div className={styles.articleDescription}>
                  <h2 className={styles.articleTitle}>
                    {article.title}
                  </h2>
                  {article.contentHtml && (
                    <div
                      dangerouslySetInnerHTML={{ __html: article.contentHtml }} 
                      className={styles.articleText}
                    />
                  )}
                </div>
              </Link>
            </div>  
          ))}
        </div>
        <div className={styles.contactBlock}>
          {/* <div className={styles.formBlock} > */}
            <ContactUs />
          {/* </div> */}
          <div className={styles.mapBlock}>
            Here will be map with agency address, maybe
          </div>
        </div>
        
      </main>
    </>
  );
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export async function getStaticProps({ locale }: {locale: string}) {
  const allBlogData = await getSortedPostsData();
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      allBlogData, 
      locale,
    },
  };
}