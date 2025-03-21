import Link from 'next/link'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next';

import { getSortedPostsData } from '../../lib/blog';
import Date from '@components/date/date';

export default function Blog( {allBlogData}) {
    const { t } = useTranslation('common')
    return (
        <>
          <h1>{t('blog.header')}</h1>
          <ul>
            {allBlogData.map(({ id, date, title }) => (
              <li key={id}>
                <Link href={`./blog/${id}`}>{title}</Link>
                <br />
                <Date dateString={date} />
              </li>
            ))}
          </ul>
          <h2>
              <Link href="/">Back to home</Link>
          </h2> 
        </>
    )
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export async function getStaticProps({ locale }) {
  const allBlogData = getSortedPostsData();   // for blog

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      allBlogData                             // for blog
    },
  };
}