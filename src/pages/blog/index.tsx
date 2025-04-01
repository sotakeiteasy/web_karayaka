import Link from 'next/link'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { getSortedPostsData } from '../../lib/blog';
import { useRouter } from 'next/router';

export default function Blog({ allBlogData }: { allBlogData: any }) {
    const { t } = useTranslation('common');
    const router = useRouter();

    return (
        <main className={styles.main}> 
            {allBlogData.map(({ id, title, excerpt }: { id: string, title: string, excerpt: string }) => (
              <div key={id}>
                <Link 
                  href={`/blog/${id}`} 
                  locale={router.locale}
                  className={styles.articleCard}
                >
                  <div className={styles.articleImage}>
                    <Image
                      src="/images/exampleImage.jpg"
                      fill={true}
                      alt=" "
                      style={{
                        objectFit: "cover",
                        borderRadius: "15px 0px 0px 15px",
                      }}
                      loading="eager"
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
                </Link>
              </div>
            ))}  
        </main>
    )
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export async function getStaticProps({ locale }: {locale: string}) {
  const allBlogData = await getSortedPostsData(locale);   // Передаем локаль

  // if (locale !== 'ru') {
  //   return {
  //     redirect: {
  //       destination: `/${locale}`,
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      allBlogData
    },
  };
}