import styles from './index.module.css';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
export default function CustomOffers() {

  const { t } = useTranslation("common")
    return (
        <>
        <h1>{t("custom-offers.header")}</h1>
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
        </>
    )
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}