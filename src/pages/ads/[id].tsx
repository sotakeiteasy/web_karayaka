import { getAllAds } from "@/lib/ad";
import { getAdById } from "@/lib/ad";
import Head from "next/head"
import styles from "./id.module.scss"
import Image from "next/image";

export default function AdPage({adData, locale}) {

    return (
        <>
            <Head>
                <title>{adData.title[locale]}</title>
            </Head>
            <div className={styles.main}>
                <div className={styles.mainImage}>
                    <Image
                        src="/images/exampleImage.jpg"
                        alt="sometext"
                        width={300}
                        height={500}
                    />
                </div>
                <div className={styles.info}>
                    <div className={styles.description}>
                       { adData.description[locale] }
                    </div>
                    <div className={styles.tags}>
                        {adData.features.map(f => (
                            <div className={styles.tag} key={f}>{f}</div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export function getStaticPaths({ locales }) {
    const ads = getAllAds();
    
    // Создаем пути для каждой локали
    const paths = [];
    
    // Для каждого объявления создаем путь для каждой локали
    ads.forEach(ad => {
        locales.forEach(locale => {
            paths.push({
                params: { id: ad.params.id },
                locale
            });
        });
    });
    
    return {
        paths,
        fallback: false
    }
}


import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export async function getStaticProps({ params, locale }) {
    const adData = getAdById(params.id)
  return {
    props: {
          ...(await serverSideTranslations(locale, ['common'])),
          adData,
          locale
    },
  };
}