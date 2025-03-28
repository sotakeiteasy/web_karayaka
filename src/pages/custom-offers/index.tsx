import styles from './index.module.scss';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import ContactUs from "@components/form/form"
import Image from 'next/image'
export default function CustomOffers() {
// import exampleImage from "/"
  const { t } = useTranslation("common")
    return (
        <>
      <main className={styles.main}>  
        <div className={styles.formContainer}>
          <ContactUs />
          <div className={styles.formImg}>
          <Image
            src="/images/exampleImage.jpg"
            fill={true}
            alt=""
            draggable="false"
            style={{
              objectFit: "cover",
              borderRadius: "0px 15px 15px 0px",
            }}
            loading = 'eager' 
          />
          </div>
           
        </div>
      </main>
    
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