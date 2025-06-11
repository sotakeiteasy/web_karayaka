import fs from 'fs';
import path from 'path';
import styles from './index.module.scss';
import Head from 'next/head';
import { Breadcrumbs, ContainerWrapper } from '@/lib/components';
import { MetaTags } from '@/lib/types';
import { useLanguageQuery } from 'next-export-i18n';

export default function PrivacyPolicyPage({ content, metaTags }: { content: HTMLElement; metaTags: MetaTags }) {
  const [query] = useLanguageQuery();
  const locale = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[locale];

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
      </Head>
      <main className={styles.privacyPolicy}>
        <ContainerWrapper width="standard" withMarginBottom={true}>
          <Breadcrumbs items={[{ t: 'footer.privacyPolicy' }]} />
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </ContainerWrapper>
      </main>
    </>
  );
}

export function getStaticProps() {
  const filePath = path.join(process.cwd(), './src/data/documents', 'privacyPolicy.html');
  const content = fs.readFileSync(filePath, 'utf-8');

  const metaTags = {
    ru: {
      title: 'Политика конфеденциальности - Караяка | Агентство недвижимости в Турции и России',
    },
    en: {
      title: 'Privacy Policy - Karayaka | Real Estate Agency in Turkey and Russia',
    },
  };

  return {
    props: { content, metaTags },
  };
}
