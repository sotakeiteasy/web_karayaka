import fs from 'fs';
import path from 'path';
import styles from './index.module.scss';
import Head from 'next/head';
import { Breadcrumbs, ContainerWrapper } from '@/lib/components';

export function getStaticProps() {
  const filePath = path.join(process.cwd(), './src/data/documents', 'privacyPolicy.html'); // укажите правильный путь
  const content = fs.readFileSync(filePath, 'utf-8');

  return {
    props: { content },
  };
}

export default function privacyPolicyPage({ content }: { content: HTMLElement }) {
  const title = 'Политика конфеденциальности';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
      </Head>
      <main className={styles.privacyPolicy}>
        <ContainerWrapper width="standard" withMarginBottom={true}>
          <Breadcrumbs items={[{ title: title }]} />
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </ContainerWrapper>
      </main>
    </>
  );
}
