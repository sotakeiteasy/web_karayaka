import styles from './index.module.scss';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
export default function CustomOffers() {

  const { t } = useTranslation("common")
    return (
        <>
        <main className={styles.main}>

        <h1 className={styles.header}>Contact us</h1>

        <div className={styles.infoBlock}>
            <section className={styles.faq}>
                <h2>FAQ</h2>
                <p>Lorem ipsum?</p>
                <p>dolor sit amet consectetur adipisicing elit. Odit, distinctio mollitia nemo corrupti, dolorum voluptates non exercitationem omnis doloribus perferendis animi</p>
                <p>Lorem ipsum?</p>
                <p>....</p>
                <p>Lorem ipsum?</p>
                <p>....</p>
            </section>

            <div className={styles.mapBlock}>
                <div className={styles.map}></div>
                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204203.69478496362!2d30.718105049999988!3d36.897937550000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39aaeddadadc1%3A0x95c69f73f9e32e33!2z0JDQvdGC0LDQu9GM0Y8sINCQ0L3RgtCw0LvQuNGPLCDQotGD0YDRhtC40Y8!5e0!3m2!1sru!2sru!4v1742549451883!5m2!1sru!2sru" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                <div className={styles.mapDescription}>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit, distinctio mollitia nemo corrupti, dolorum voluptates non exercitationem omnis doloribus perferendis animi.</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore asperiores ratione officia eligendi. Laborum vitae temporibus ipsum numquam officia! Dolorum praesentium id aspernatur itaque.</p>
                </div>
            </div>
        </div>
        
        <div className={styles.form}>
            <form method="post">
                <legend>Your message</legend>

                <div className={styles.formRow}>
                  <div>
                    <label for="first_name">First Name</label>
                    <input type="text" id="first_name" name="first_name" required/>
                  </div>

                  <div>
                    <label for="last_name">Last Name</label>
                    <input type="text" id="last_name" name="last_name" required/>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <label for="phone_number">Phone Number</label>
                  <input type="tel" id="phone_number" name="phone_number" required/>
                </div>

                <div className={styles.formRow}>
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" required/>
                </div>

                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat, accusamus deleniti libero, ducimus perspiciatis odit soluta dolorum voluptate temporibus, optio commodi blanditiis necessitatibus in voluptatibus dicta doloremque reiciendis iure? Deserunt.</p>
            </form>
            <textarea name="message" id="message">

            </textarea>
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