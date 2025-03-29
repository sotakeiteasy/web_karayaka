import { getAllPostIds, getPostData } from "../../lib/blog";
import Date from '@components/date/date'
import styles from './id.module.scss';
export default function Post({ postData }) {
    return (
    <main className={styles.main}>
        <section className={styles.article}>
            <h1>{postData.title}</h1>
            <br />
            {/* {postData.id} */}
            <br />
            <Date dateString={postData.date} />
            <br />
            <p dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
export async function getStaticProps( { params, locale }) {
    if (locale !== 'ru') {
        return {
          redirect: {
            destination: `/${locale}`,
            permanent: false,
          },
        }
      }

    const postData = await getPostData(params.id);

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            postData
        }
    }
}