import Link from 'next/link'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { getSortedPostsData } from '../../lib/blog';

export default function Blog( {allBlogData}: {allBlogData: any}) {
    const { t } = useTranslation('common')
    return (
        <main className={styles.main}> 
            {allBlogData.map(({ id, title, contentHtml}: { id: any, title: any, contentHtml: any}) => (
              <div key={id}>
                <Link 
                  href={`./blog/${id}`}
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
                        <a href={`./blog/articles/${id}`}>
                          <h2  className={styles.articleTitle}>{title}</h2>
                        </a>
                        {contentHtml && (
                          <div
                            dangerouslySetInnerHTML={{ __html: contentHtml }} 
                            className={styles.articleText}
                          />
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
  const allBlogData = await getSortedPostsData();   // for blog

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
      allBlogData                             // for blog
    },
  };
}