import { getAllPostIds, getPostData } from "../../lib/blog";
import Date from '@components/date/date'
import styles from './id.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Post({ postData }: {postData: any}) {
    const router = useRouter();
    
    if (!postData) {
        return <div>Loading...</div>;
    }

    // Доступные локали для переключения
    const locales = ['ru', 'en'];

    return (
    <main className={styles.main}>
        <section className={styles.article}>
            <h1>{postData.title}</h1>
            <br />
            {/* {postData.id} */}
            <br />
            <Date dateString={postData.date} />
            <br />
            <div className={styles.languageSwitcher}>
              {locales.map(locale => (
                <Link
                  key={locale}
                  href={router.asPath}
                  locale={locale}
                  className={locale === router.locale ? styles.activeLocale : ''}
                >
                  {locale.toUpperCase()}
                </Link>
              ))}
            </div>
            <br />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </section>
    </main>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: true
    }
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export async function getStaticProps( { params, locale }: {params:any, locale: string}) {
    // if (locale !== 'ru') {
    //     return {
    //       redirect: {
    //         destination: `/${locale}`,
    //         permanent: false,
    //       },
    //     }
    //   }

    try {
        const postData = await getPostData(params.id, locale);
        
        // Проверка наличия данных, используя только определенные свойства
        if (!postData || !postData.contentHtml) {
            return {
                notFound: true,
            };
        }
        
        return {
            props: {
                ...(await serverSideTranslations(locale, ['common'])),
                postData
            }
        }
    } catch (error) {
        console.error(`Error fetching post ${params.id}:`, error);
        return {
            notFound: true
        };
    }

    // const postData = await getPostData(params.id);

    // return {
    //     props: {
    //         ...(await serverSideTranslations(locale, ['common'])),
    //         postData
    //     }
    // }
}