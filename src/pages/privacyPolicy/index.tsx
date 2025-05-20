import fs from 'fs';
import path from 'path';
import styles from './index.module.scss';

export function getStaticProps() {
  const filePath = path.join(process.cwd(), './src/data/documents', 'privacyPolicy.html'); // укажите правильный путь
  const content = fs.readFileSync(filePath, 'utf-8');

  return {
    props: { content },
  };
}

export default function privacyPolicyPage({ content }: { content: HTMLElement }) {
  return (
    <div className={styles.privacyPolicy}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
