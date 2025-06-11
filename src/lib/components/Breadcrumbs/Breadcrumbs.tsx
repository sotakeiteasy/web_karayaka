import { Breadcrumb } from 'antd';
import { LinkWithLocale, useTranslation } from 'next-export-i18n';

import styles from './Breadcrumbs.module.scss';
import { HomeOutlined } from '@ant-design/icons';
import Head from 'next/head';

interface BreadcrumbItem {
  href: string;
  title?: string;
  t?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useTranslation();

  const arrayLocalization = items.map((item, index) => {
    const isLast = index === items.length - 1;
    const label = item.t ? t(item.t) : item.title;

    return {
      title: isLast ? label : <LinkWithLocale href={item.href}>{label}</LinkWithLocale>,
    };
  });

  arrayLocalization.unshift({
    title: (
      <LinkWithLocale href="/">
        <HomeOutlined />
      </LinkWithLocale>
    ),
  });

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 2,
      'item': {
        '@id': `https://karayaka.ru${item.href}`,
        'name': item.t ? t(item.t) : item.title,
      },
    })),
  };

  breadcrumbList.itemListElement.unshift({
    '@type': 'ListItem',
    'position': 1,
    'item': {
      '@id': 'https://karayaka.ru',
      'name': t('sitemap.main'),
    },
  });

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      </Head>
      <Breadcrumb className={styles.BreadcrumbsPanel} items={arrayLocalization} />
    </>
  );
}
