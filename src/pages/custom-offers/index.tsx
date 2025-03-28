import styles from './index.module.scss';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
export default function CustomOffers() {
// import exampleImage from "/"
  const { t } = useTranslation("common")
    return (
        <>
      <main className={styles.main}>  
        <div className={styles.form}>
            <form method="post">
                <legend>Your message</legend>

                <p>Share your contact details and property wishes in the form below. We'll get back to you with recommendations.</p>

                <div className={styles.formRow}>
                  <div>
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required/>
                  </div>

                  <div>
                    <label for="surname">Surname</label>
                    <input type="text" id="surname" name="surname" required/>
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
                <textarea aria-label='Your message' placeholder="Describe what you're looking for: buy or rent, preferred location, budget range, must-have features. The more details you provide, the better we can help you find your perfect match!" name="message" id="message"></textarea>
                <button type="submit">Send message</button>
            
            </form>
           <img src="/images/exampleImage.jpg" alt="exampleImage.jpg" draggable="false"/>
           
           
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