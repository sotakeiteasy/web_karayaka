import { Tree } from 'antd';
import 'antd/dist/reset.css';
import { DataNode } from 'antd/lib/tree';

export default function SiteMap({ meta }: { meta: { path: string; title: string }[] }) {
  const treeData = buildTree(meta);

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

function cleanTitle(title: string): string {
  return title.split(' - ')[0].trim();
}

function buildTree(pages: { path: string; title: string }[]): DataNode[] {
  const tree: DataNode[] = [];
  const map: Record<string, DataNode> = {};

  pages.forEach(({ path, title }) => {
    const parts = path.split('/').filter(Boolean);
    let current = tree;
    let fullPath = '';

    parts.forEach((part, idx) => {
      fullPath += '/' + part;
      let node = current.find((n) => n.key === fullPath);

      if (!node) {
        node = {
          title: cleanTitle(title),
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

    // Главная страница
    if (parts.length === 0) {
      current.push({ title: 'Главная', key: '/', isLeaf: true });
    }
  });

  return tree;
}

export async function getStaticProps() {
  const { getPageMeta } = await import('@/lib/server/getPageMeta');
  const meta = await getPageMeta();
  return { props: { meta } };
}
