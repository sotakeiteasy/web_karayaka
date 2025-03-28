import React, { useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import styles from './form.module.scss';

const  SERVICE_ID = "service_karayaka" ; 
const  TEMPLATE_ID = "template_karayaka" ; 
const  PUBLIC_KEY = "Yq2DEqGgQI4ibTmyj" ; 

export const ContactUs = () => {
  const form = useRef();

  useEffect(()=> {
    emailjs.init(PUBLIC_KEY); // Гарантируем, что инициализация происходит только в браузере
  }, [])

  const sendEmail = (e) => {
    e.preventDefault();
    if(!form.current) {
    console.log("Form reference is null.");
    return;
  }

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          console.log('SUCCESS!');

        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
        <form className={styles.form} ref={form} onSubmit={sendEmail}>
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
            <input className={styles.formBtn} type="submit" value="Send" />
        </form>
  );
};

export default ContactUs;