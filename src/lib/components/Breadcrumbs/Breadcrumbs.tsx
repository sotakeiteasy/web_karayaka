import { Breadcrumb } from 'antd';
import { LinkWithLocale, useTranslation } from 'next-export-i18n';

import styles from './Breadcrumbs.module.scss';
import { HomeOutlined } from '@ant-design/icons';

interface BreadcrumbItem {
  title?: string;
  href?: string;
  t?: string | null;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useTranslation();

  const arrayLocalization = items.map((item) => ({
    title:
      item.href && item.t && item.title ? (
        <LinkWithLocale href={item.href}>{t(`${item.t}`)}</LinkWithLocale>
      ) : item.t ? (
        t(`${item.t}`)
      ) : (
        item.title
      ),
  }));

  arrayLocalization.unshift({
    title: (
      <LinkWithLocale href="/">
        <HomeOutlined />
      </LinkWithLocale>
    ),
  });

  return <Breadcrumb className={styles.BreadcrumbsPanel} items={arrayLocalization} />;
}
