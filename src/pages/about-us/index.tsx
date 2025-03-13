import styles from "./index.module.scss"
import Link from "next/link"
import Head from "next/head";
import { useTranslation } from "next-i18next";

export default function AboutUs() {
    const { t } = useTranslation('common')
    return (
      <>
        <Head>
          <title>About us</title>
        </Head>
            <h1 className={styles.description}>{t("aboutUs.header")}</h1>
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