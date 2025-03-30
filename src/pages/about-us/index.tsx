import styles from "./index.module.scss"
import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import { useTranslation } from "next-i18next";
import Image from 'next/image';
import { useState } from "react";

export default function AboutUs() {
    const { t } = useTranslation('common')


    const questionsFAQ = {
      location: "Where are you located?",
      period: "How long does the typical home buying process take from offer to closing?",
      tour: "Can I schedule a virtual tour if I'm unable to visit in person?",
      contact: "How can I contact your team if I have questions about a listing?",
      area: "What areas do you serve for property rentals and sales?",
      personnel: "Are your agents familiar with all neighborhoods in the area?"
    };
    const answersFAQ = {
      location: "1) Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ex ducimus, nisi sit ratione ab quia eos sunt adipisci autem! Eos pariatur temporibus veniam ipsum ea aut porro quas amet?",
      period: "2) Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ex ducimus, nisi sit ratione ab quia eos sunt adipisci autem! Eos pariatur temporibus veniam ipsum ea aut porro quas amet?",
      tour: "3) Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ex ducimus, nisi sit ratione ab quia eos sunt adipisci autem! Eos pariatur temporibus veniam ipsum ea aut porro quas amet?",
      contact: "4) Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ex ducimus, nisi sit ratione ab quia eos sunt adipisci autem! Eos pariatur temporibus veniam ipsum ea aut porro quas amet?",
      area: "5) Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ex ducimus, nisi sit ratione ab quia eos sunt adipisci autem! Eos pariatur temporibus veniam ipsum ea aut porro quas amet?",
      personnel: "6) Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos ex ducimus, nisi sit ratione ab quia eos sunt adipisci autem! Eos pariatur temporibus veniam ipsum ea aut porro quas amet?",
    }
    const [activeKey, setActiveKey] = useState('location');
    const [answer, setAnswer] = useState(answersFAQ.location)
    const [question, setQuestion] = useState(questionsFAQ.location)
    function toggleAnswers(key) {
      setAnswer(answersFAQ[key]);
      setQuestion(questionsFAQ[key]);
      setActiveKey(key); // Store the current active key
    }

    return (
    <>
      <main className={styles.main}>
        <div className={styles.sloganBlock}>

        <Image
          src="/images/exampleImage.jpg"
          alt=''
          fill={true}
          style={{
            objectFit: 'cover',
          }}
          loading = 'eager'
          draggable='false'
        />

        <div className={styles.slogan}>
          <p>dream</p>
          <p>find</p>
          <p>buy</p>
          <p>live</p>
        </div>
        </div>
        {/* <Head>
          <title>About us</title>
        </Head>
            <h1 className={styles.description}>{t("aboutUs.header")}</h1> */}
        <header>
          <h1>About us</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut totam blanditiis suscipit dolorum cupiditate ipsam, nemo sit at nesciunt accusantium recusandae, officia ex voluptates inventore ipsa molestias nostrum aliquid quis!Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut totam blanditiis suscipit dolorum cupiditate ipsam, nemo sit at nesciunt accusantium recusandae, officia ex voluptates inventore ipsa molestias nostrum aliquid quis!</p>
        </header>
        
        <div className={styles.banner}>
        <Image
          src="/images/exampleImage.jpg"
          alt=''
          fill={true}
          style={{
            objectFit: 'cover'
          }}
          loading = 'eager'
          draggable='false'
        />
        </div>

        <div className={styles.stats}>
          <section>
            <h2>100+</h2>
            <p>Apartments sold</p>
          </section>

          <section>
            <h2>300+</h2>
            <p>Happy customers</p>
          </section>

          <section>
            <h2>200+</h2>
            <p>Apartments rented</p>
          </section>
        </div>

        <div className={styles.infoBlock}>
            <section className={styles.faq}>
              <h2>FAQ</h2>
              
                  
                  {Object.keys(questionsFAQ).map((key) => (
                    <div className={styles.faqRow} key={key}>
                    <Icon 
                     path={mdiChevronRight} 
                     size={1.5}
                     style={{
                      opacity:0
                    }}
                     key={key}
                    className={activeKey === key ? styles.activeIcon : ''} 
                    />
                    <button
                      key={key}
                      className={activeKey === key ? styles.activeButton : ''} 
                      onClick={() => toggleAnswers(key)}
                    >
                      {questionsFAQ[key]}
                    </button>
                    </div>
                  ))}   
            </section>

             <section className={styles.answerBlock}>
              
              <h2>{question}</h2>
              <p>{answer}</p>

              </section>
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