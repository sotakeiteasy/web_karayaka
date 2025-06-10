import { Tree } from 'antd';
import 'antd/dist/reset.css';
import { DataNode } from 'antd/lib/tree';

export default function SiteMap({ urls }: { urls: string[] }) {
  const treeData = buildTree(urls);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
      <h1>Карта сайта</h1>
      <Tree
        treeData={treeData}
        defaultExpandAll
        titleRender={(nodeData) => (
          <a href={nodeData.key as string} target="_blank" rel="noopener noreferrer">
            {nodeData.title as string}
          </a>
        )}
      />
    </div>
  );
}

function humanize(part: string): string {
  const special: Record<string, string> = {
    'about-us': 'О нас',
    'blog': 'Блог',
    'ads': 'Объявления',
    'custom-offers': 'Индивидуальные предложения',
    'privacyPolicy': 'Политика конфиденциальности',
    'agreement': 'Пользовательское соглашение',
  };
  if (special[part]) return special[part];

  if (part.startsWith('article')) {
    const num = part.replace('article', '');
    return `Статья ${num}`;
  }

  if (/^\d+$/.test(part)) {
    return `Объявление ${part}`;
  }

  return part
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function buildTree(urls: string[]): DataNode[] {
  const tree: DataNode[] = [];
  const map: Record<string, DataNode> = {};

  urls.forEach((url) => {
    const { pathname } = new URL(url);
    const parts = pathname.split('/').filter(Boolean);
    let current = tree;
    let path = '';

    parts.forEach((part, idx) => {
      path += '/' + part;
      let node = current.find((n) => n.key === path);
      if (!node) {
        node = {
          title: humanize(part),
          key: path,
          children: [],
        };
        current.push(node);
        map[path] = node;
      }
      if (idx === parts.length - 1) {
        node.isLeaf = true;
      }
      current = node.children!;
    });

    if (parts.length === 0) {
      current.push({
        title: 'Главная',
        key: '/',
        isLeaf: true,
      });
    }
  });

  return tree;
}

export async function getStaticProps() {
  const { getUrlsFromSitemap } = await import('@/lib/server/getSitemap');
  const urls = await getUrlsFromSitemap();
  return { props: { urls } };
}
