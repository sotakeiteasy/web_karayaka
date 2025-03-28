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
// import videoView from '/videos/video-views.mp4'



export default function Home({allBlogData, locale}) {
  const { t } = useTranslation('common');

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
          <video className={styles.video}
            src='/videos/video-views.mp4'
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
          <p className={styles.previewText}>Hello, world</p>
          <div className={styles.searchBlock}>
            <label htmlFor="search"></label>
            <input 
              id="search" 
              type="text" 
              placeholder="Address or keywords" 
              aria-label="Поиск"
              autoComplete="off"
              spellCheck="false"
              />
              <button>Search</button>
          </div>
        </div>
        <div className={styles.carouselBlock}>
            <h1 className={styles.header}>{t('home.rentInTurkey')}</h1>
            <div className={styles.carousel}>
              <SimpleSlider type='rent' country='Turkey' locale={locale}/>
            </div>
            <button className={styles.blockButton}><Link href="/search?type=rent" locale={locale}>{t('home.seeAll')}</Link></button>
        </div>
        <div className={styles.carouselBlock}>
            <h1 className={styles.header}>
              {t('home.buyInTurkey')}
            </h1>
            <div className={styles.carousel}>
              <SimpleSlider type='sale' country='Turkey' locale={locale}/>
            </div>
            <button className={styles.blockButton}><Link href="/search?type=sale" locale={locale}>{t('home.seeAll')}</Link></button>
        </div>  
        <div className={styles.articleBlock}>
          <h1 className={styles.header}>{t('home.articles')}</h1> 
          {allBlogData.map(article => (
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
          <div className={styles.formBlock} ></div>
          <ContactUs />
          <div className={styles.mapBlock}></div>
        </div>
        
      </main>
    </>
  );
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export async function getStaticProps({ locale }) {
  const allBlogData = await getSortedPostsData();
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      allBlogData, 
      locale,
    },
  };
}