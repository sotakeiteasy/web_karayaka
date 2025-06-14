import { DataNode } from 'antd/lib/tree';

export function cleanTitle(title: string): string {
  return title.split(' - ')[0].trim();
}

export function buildTree(
  pages: { path: string; titleRu: string; titleEn: string }[],
  locale: 'ru' | 'en'
): DataNode[] {
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
