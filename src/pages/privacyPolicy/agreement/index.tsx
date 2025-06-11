import fs from 'fs';
import path from 'path';
import styles from './index.module.scss';
import { Breadcrumbs, ContainerWrapper } from '@/lib/components';
import Head from 'next/head';
import { MetaTags } from '@/lib/types';
import { useLanguageQuery } from 'next-export-i18n';

export function getStaticProps() {
  const filePath = path.join(process.cwd(), './src/data/documents', 'agreement.html');
  const content = fs.readFileSync(filePath, 'utf-8');

  const metaTags = {
    ru: {
      title: 'Форма согласия на обработку персональных данных - Караяка | Агентство недвижимости в Турции и России',
    },
    en: {
      title: 'Consent form for personal data processing - Karayaka | Real Estate Agency in Turkey and Russia',
    },
  };

  return {
    props: { content, metaTags },
  };
}

export default function AgreementPage({ content, metaTags }: { content: HTMLElement; metaTags: MetaTags }) {
  const [query] = useLanguageQuery();

  const lang = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[lang];

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
      </Head>
      <main className={styles.agreement}>
        <ContainerWrapper width="standard" withMarginBottom={true}>
          <Breadcrumbs
            items={[
              { title: 'privacyPolicy', href: '/privacyPolicy', t: 'footer.privacyPolicy' },
              { t: 'agreementForm.header' },
            ]}
          />
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </ContainerWrapper>
      </main>
    </>
  );
}
