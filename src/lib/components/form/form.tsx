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
    <div className={styles.form}>
        <form ref={form} onSubmit={sendEmail}>
            <legend>Your message</legend>
            <p>
                accusamus deleniti libero, ducimus perspiciatis odit soluta dolorum voluptate temporibus, 
                optio commodi blanditiis necessitatibus in voluptatibus dicta doloremque reiciendis iure? Deserunt.
            </p>

            <div className={styles.formRow}>
                <div>
                    <label htmlFor="first_name">First Name</label>
                    <input type="text" id="first_name" name="first_name" required/>
                </div>

                <div>
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" id="last_name" name="last_name" required/>
                </div>
            </div>

            <div className={styles.formRow}>
                <label htmlFor="phone_number">Phone Number</label>
                <input type="tel" id="phone_number" name="phone_number" required/>
            </div>

            <div className={styles.formRow}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required/>
            </div>
            <textarea name="message" id="message"></textarea>
            <input type="submit" value="Send" />
        </form>
    </div>
  );
};

export default ContactUs;