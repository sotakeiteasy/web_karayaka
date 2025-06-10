import fs from 'fs';
import path from 'path';
import styles from './index.module.scss';
import { Breadcrumbs, ContainerWrapper } from '@/lib/components';
import Head from 'next/head';

export function getStaticProps() {
  const filePath = path.join(process.cwd(), './src/data/documents', 'agreement.html');
  const content = fs.readFileSync(filePath, 'utf-8');

  return {
    props: { content },
  };
}

export default function AgreementPage({ content }: { content: HTMLElement }) {
  const title = 'Форма согласия на обработку персональных данных';
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
      </Head>
      <main className={styles.agreement}>
        <ContainerWrapper width="standard" withMarginBottom={true}>
          <Breadcrumbs
            items={[{ title: 'privacyPolicy', href: '/privacyPolicy', t: 'footer.privacyPolicy' }, { title: title }]}
          />
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </ContainerWrapper>
      </main>
    </>
  );
}
