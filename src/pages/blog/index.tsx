import Link from 'next/link'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next';

import { getSortedPostsData } from '../../lib/blog';
import Date from '@components/date/date';

export default function Blog( {allBlogData}) {
    const { t } = useTranslation('common')
    return (
        <>
          {/* <h1>{t('blog.header')}</h1> */}
          <ul>
            {allBlogData.map(({ id, date, title }) => (
              <li key={id}>
                <Link href={`./blog/${id}`}>{title}</Link>
                <br />
                <Date dateString={date} />
              </li>
            ))}
          </ul>
        </>
    )
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export async function getStaticProps({ locale }) {
  const allBlogData = await getSortedPostsData();   // for blog

  if (locale !== 'ru') {
    return {
      redirect: {
        destination: `/${locale}`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      allBlogData                             // for blog
    },
  };
}