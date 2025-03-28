import styles from './index.module.scss';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import ContactUs from "@components/form/form"
export default function CustomOffers() {
// import exampleImage from "/"
  const { t } = useTranslation("common")
    return (
      <main className={styles.main}>  
        <div className={styles.formContainer}>
          <ContactUs />
           <img src="/images/exampleImage.jpg" alt="exampleImage.jpg" draggable="false"/>
           
           
        </div>
      </main>
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