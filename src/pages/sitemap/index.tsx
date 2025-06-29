import styles from './index.module.scss';
import Head from 'next/head';
import { Tree } from 'antd';
import 'antd/dist/reset.css';
import { DataNode } from 'antd/lib/tree';
import { LinkWithLocale, useLanguageQuery, useTranslation } from 'next-export-i18n';

import { Breadcrumbs, ContainerWrapper } from '@/lib/components';
import { buildTree } from '@/lib/utils';
import { MetaTags } from '@/lib/types';

export default function SiteMap({
  meta,
  metaTags,
}: {
  meta: { path: string; titleRu: string; titleEn: string }[];
  metaTags: MetaTags;
}) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const locale = (query?.lang as 'ru' | 'en') || 'ru';
  const metaPage = metaTags[locale];

  const buyPages = meta.filter((page) => page.path.startsWith('/buy'));
  const rentPages = meta.filter((page) => page.path.startsWith('/rent'));
  const otherPages = meta.filter((page) => !page.path.startsWith('/buy') && !page.path.startsWith('/rent'));

  const buyTree = buildTree(buyPages, locale);
  const rentTree = buildTree(rentPages, locale);
  const generalTree = buildTree(otherPages, locale);

  const renderNode = (nodeData: DataNode) => (
    <LinkWithLocale href={nodeData.key as string}>{nodeData.title as string}</LinkWithLocale>
  );

  return (
    <>
      <Head>
        <title>{metaPage.title}</title>
        <meta name="robots" content="index, follow" />
      </Head>
      <main className={styles.main}>
        <ContainerWrapper width="standardPlus" withMarginBottom={true}>
          <Breadcrumbs items={[{ href: '/sitemap/', t: 'sitemap.header' }]} />
          <h1>{t('sitemap.header')}</h1>
          <div className={styles.treeGrid3}>
            <div>
              <Tree defaultExpandAll treeData={generalTree} titleRender={renderNode} />
            </div>
            <div>
              <Tree defaultExpandAll treeData={buyTree} titleRender={renderNode} />
            </div>
            <div>
              <Tree defaultExpandAll treeData={rentTree} titleRender={renderNode} />
            </div>
          </div>
        </ContainerWrapper>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const { getPageMeta } = await import('@/lib/server/getPageMeta');
  const meta = await getPageMeta();

  const metaTags = {
    ru: {
      title: 'Карта сайта - Караяка | Агентство недвижимости в Турции и России',
    },
    en: {
      title: 'Site map - Karayaka | Real Estate Agency in Turkey and Russia',
    },
  };

  return { props: { meta, metaTags } };
}
