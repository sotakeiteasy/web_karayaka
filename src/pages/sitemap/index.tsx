import { Breadcrumbs, ContainerWrapper } from '@/lib/components';
import { Tree } from 'antd';
import 'antd/dist/reset.css';
import { DataNode } from 'antd/lib/tree';
import { useLanguageQuery, useTranslation } from 'next-export-i18n';
import styles from './index.module.scss';
import { MetaTags } from '@/lib/types';
import Head from 'next/head';

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
    <a href={nodeData.key as string} target="_blank" rel="noopener noreferrer">
      {nodeData.title as string}
    </a>
  );

  return (
    <>
      <Head>
        <title>{metaPage.title}</title>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
      </Head>
      <main className={styles.main}>
        <ContainerWrapper width="standardPlus" withMarginBottom={true}>
          <Breadcrumbs items={[{ t: 'sitemap.header' }]} />
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

function cleanTitle(title: string): string {
  return title.split(' - ')[0].trim();
}

function buildTree(pages: { path: string; titleRu: string; titleEn: string }[], locale: 'ru' | 'en'): DataNode[] {
  const tree: DataNode[] = [];
  const map: Record<string, DataNode> = {};

  pages.forEach(({ path, titleRu, titleEn }) => {
    const rawTitle = locale === 'en' ? titleEn : titleRu;
    const parts = path.split('/').filter(Boolean);
    let current = tree;
    let fullPath = '';

    parts.forEach((part, idx) => {
      fullPath += '/' + part;
      let node = current.find((n) => n.key === fullPath);

      if (!node) {
        node = {
          title: cleanTitle(rawTitle),
          className: `tree-level-${idx}`,
          key: fullPath,
          children: [],
        };
        current.push(node);
        map[fullPath] = node;
      }

      if (idx === parts.length - 1) {
        node.isLeaf = true;
      }

      current = node.children!;
    });

    if (parts.length === 0) {
      current.push({
        title: locale === 'en' ? 'Home' : 'Главная',
        key: '/',
        isLeaf: true,
        className: 'tree-level-0',
      });
    }
  });

  return tree;
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
