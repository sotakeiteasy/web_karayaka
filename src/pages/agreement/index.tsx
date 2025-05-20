import fs from 'fs';
import path from 'path';
import styles from './index.module.scss';

export function getStaticProps() {
  const filePath = path.join(process.cwd(), './src/data/documents', 'agreement.html');
  const content = fs.readFileSync(filePath, 'utf-8');

  return {
    props: { content },
  };
}

export default function AgreementPage({ content }: { content: HTMLElement }) {
  return (
    <div className={styles.agreement}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
