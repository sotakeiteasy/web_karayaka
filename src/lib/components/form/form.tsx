import React, { useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import styles from './form.module.scss';
import { useState } from 'react';

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

  const [purposes, setPurposes] = useState({
    Buy: false,
    Rent: false
  });

  const [locations, setLocations] = useState({
    Russia: false,
    Turkey: false
  });

  return (
        <form className={styles.form} ref={form} onSubmit={sendEmail}>
        <legend>Your message</legend>
                <p>Share your contact details and property wishes. We'll get back to you with recommendations.</p>

                <div className={styles.formRow}>
                  <div>
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required/>
                  </div>

                  <div>
                    <label for="surname">Surname</label>
                    <input type="text" id="surname" name="surname"/>
                  </div>
                </div>

                <div className={styles.formDetails}>
                  <div className={styles.leftDetails}>
                    <div className={styles.formLocation}>
                      <label for="location" className={styles.buttonsLabel}>Where are you looking?</label>
                        <div>
                          <input 
                              type="button" 
                              name="location" 
                              id="location-russia" 
                              value="Russia"
                              className={locations.Russia ? `${styles.input} ${styles.selected}` : styles.input}
                              onClick={() => setLocations(prev => ({...prev, Russia: !prev.Russia}))}
                              ></input>
                          <input 
                              type="button" 
                              name="location" 
                              id="location-turkey" 
                              value="Turkey"
                              className={locations.Turkey ? `${styles.input} ${styles.selected}` : styles.input}
                              onClick={() => setLocations(prev => ({...prev, Turkey: !prev.Turkey}))}
                              ></input>
                        </div>
                    </div>

                    <div className={styles.formPurpose}>
                      <label for="purpose" className={styles.buttonsLabel}>Purpose</label>
                        <div>
                          <input 
                              type="button" 
                              name="purpose" 
                              id="purpose-buy" 
                              value="Buy" 
                              className={purposes.Buy ? `${styles.input} ${styles.selected}` : styles.input}
                              onClick={() => setPurposes(prev => ({...prev, Buy: !prev.Buy}))}
                          ></input>

                          <input 
                              type="button" 
                              name="purpose" 
                              id="purpose-rent"
                              value="Rent"
                              className={purposes.Rent ? `${styles.input} ${styles.selected}` : styles.input}
                              onClick={() => setPurposes(prev => ({...prev, Rent: !prev.Rent}))}
                          ></input>
                        </div>
                    </div>
                  </div>

                  <div className={styles.rightDetails}>
                      <div className={styles.formRow}>
                        <label for="city">City</label>
                        <input type="text" id="city" name="city"/>
                      </div>

                      <div className={styles.formRow}>
                        <label for="district">District</label>
                        <input type="text" id="district" name="district"/>
                      </div>

                      <div className={styles.formRow}>
                        <label for="budget">Budget</label>
                        <input type="text" id="budget" name="budget"/>
                      </div>
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
                <textarea aria-label='Your message' placeholder="Describe what you're looking for: number of rooms, floor, must-have features. The more details you provide, the better we can help you find your perfect match!" name="message" id="message"></textarea>
            <input className={styles.formBtn} type="submit" value="Send" />
        </form>
  );
};

export default ContactUs;