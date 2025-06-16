import fs from 'fs';
import path from 'path';
import styles from './index.module.scss';
import { Breadcrumbs } from '@/lib/components/Breadcrumbs/Breadcrumbs';
import { ContainerWrapper } from '@/lib/components/ContainerWrapper/ContainerWrapper';
import Head from 'next/head';
import { MetaTags } from '@/lib/types';
import { useLanguageQuery } from 'next-export-i18n';

export default function AgreementPage({ content, metaTags }: { content: HTMLElement; metaTags: MetaTags }) {
  const [query] = useLanguageQuery();

  const lang = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[lang];

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="index, follow" />
      </Head>
      <main className={styles.agreement}>
        <ContainerWrapper width="standard" withMarginBottom={true}>
          <Breadcrumbs
            items={[
              { href: '/privacy-policy', t: 'footer.privacyPolicy' },
              { href: '/privacy-policy/agreement', t: 'agreementForm.header' },
            ]}
          />
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </ContainerWrapper>
      </main>
    </>
  );
}

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
