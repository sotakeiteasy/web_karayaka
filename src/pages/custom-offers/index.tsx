import styles from './index.module.scss';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import ContactUs from "@components/form/form"
import Image from 'next/image'
import Icon from '@mdi/react';
import { mdiPhone } from '@mdi/js';
import { mdiEmail } from '@mdi/js';
import { mdiWhatsapp } from '@mdi/js';
import { mdiSendCircle } from '@mdi/js';

export default function CustomOffers() {
// import exampleImage from "/"
  const { t } = useTranslation("common")
    return (
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

           <address className={styles.contacts}>
              <div className={styles.contactsTraditional}>
                <div>
                  <Icon path={mdiPhone} size={1.5} href="tel:+392099545949"/>
                  <a href="tel:+392099545949">+39 209-954‑59-49</a>
                </div>
                <div>
                  <Icon path={mdiEmail} size={1.5} href="mailto:karayaka@gmail.com"/>
                  <a href="mailto:karayaka@gmail.com">karayaka@gmail.com</a>
                </div>
              </div>
              <div className={styles.contactsSocial}>
                <div>
                  <svg href="#" className={styles.telegramIcon} fill="#002F6C" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>telegram</title> <path d="M22.122 10.040c0.006-0 0.014-0 0.022-0 0.209 0 0.403 0.065 0.562 0.177l-0.003-0.002c0.116 0.101 0.194 0.243 0.213 0.403l0 0.003c0.020 0.122 0.031 0.262 0.031 0.405 0 0.065-0.002 0.129-0.007 0.193l0-0.009c-0.225 2.369-1.201 8.114-1.697 10.766-0.21 1.123-0.623 1.499-1.023 1.535-0.869 0.081-1.529-0.574-2.371-1.126-1.318-0.865-2.063-1.403-3.342-2.246-1.479-0.973-0.52-1.51 0.322-2.384 0.221-0.23 4.052-3.715 4.127-4.031 0.004-0.019 0.006-0.040 0.006-0.062 0-0.078-0.029-0.149-0.076-0.203l0 0c-0.052-0.034-0.117-0.053-0.185-0.053-0.045 0-0.088 0.009-0.128 0.024l0.002-0.001q-0.198 0.045-6.316 4.174c-0.445 0.351-1.007 0.573-1.619 0.599l-0.006 0c-0.867-0.105-1.654-0.298-2.401-0.573l0.074 0.024c-0.938-0.306-1.683-0.467-1.619-0.985q0.051-0.404 1.114-0.827 6.548-2.853 8.733-3.761c1.607-0.853 3.47-1.555 5.429-2.010l0.157-0.031zM15.93 1.025c-8.302 0.020-15.025 6.755-15.025 15.060 0 8.317 6.742 15.060 15.060 15.060s15.060-6.742 15.060-15.060c0-8.305-6.723-15.040-15.023-15.060h-0.002q-0.035-0-0.070 0z"></path> </g></svg>
                  <a href="#">Telegram</a>
                </div>
                <div>
                  <Icon path={mdiWhatsapp} size={1.5} href="#"/>
                  <a href="#">Whatsapp</a>
                </div>
              </div>
        </address>
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