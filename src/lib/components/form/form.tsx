import React, { useRef, useEffect, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import styles from './form.module.scss';
import { useState } from 'react';

import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  name: string;
  surname?: string;
  location: string[];
  purpose: string[];
  city?: string;
  district?: string;
  budget?: string;
  phone_number: string;
  email: string;
  message?: string;
};

const  SERVICE_ID = "service_karayaka" ; 
const  TEMPLATE_ID = "template_karayaka" ; 
const  PUBLIC_KEY = "Yq2DEqGgQI4ibTmyj" ; 

export const ContactUs = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue, // for location
    // getValues, // for location
    reset, 
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      surname: "",
      location: [],
      purpose: [],
      city: "",
      district: "",
      budget: "",
      phone_number: "",
      email: "",
      message: ""
    },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const templateParams = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone_number: data.phone_number,
      location: data.location.join(", "),
      purpose: data.purpose.join(", "),
      city: data.city || "",
      district: data.district || "",
      budget: data.budget || "",
      message: data.message || "",
    };

    console.log("Form Data:", templateParams);
    if(!templateParams) {
      console.log("Form reference is null.");
      return;
    }

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(
        () => {
          console.log('SUCCESS!');
          reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  // console.log(watch("location")) // watch input value by passing the name of it
  console.log(watch("purpose")) // watch input value by passing the name of it

  // console.log(watch("surname")) // watch input value by passing the name of it



  const form = useRef<HTMLFormElement | null>(null);

  useEffect(()=> {
    emailjs.init(PUBLIC_KEY); 
  }, [])

  const [purposes, setPurposes] = useState<Record<string, boolean>>({
    Buy: false,
    Rent: false
  });

  const [locations, setLocations] = useState<Record<string, boolean>>({
    Russia: false,
    Turkey: false,
  });

  const toggleLocation = (country: "Russia" | "Turkey") => {
    setLocations((prev) => {
      const updated = { ...prev, [country]: !prev[country] };
      const selectedLocations = Object.keys(updated).filter((key) => updated[key]); 
      setValue("location", selectedLocations);
      return updated;
    });
  };

  const togglePurpose = (country: "Buy" | "Rent") => {
    setPurposes((prev) => {
      const updated = { ...prev, [country]: !prev[country] };
      const selectedLocations = Object.keys(updated).filter((key) => updated[key]); 
      setValue("purpose", selectedLocations);
      return updated;
    });
  };

  return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <legend>Your message</legend>
                <p>
                  Share your contact details and property wishes. 
                  We&aposll get back to you with recommendations.
                </p>
                <div className={styles.formRow}>
                  <div>
                    <label htmlFor="name">Name</label>
                    <input 
                      type="text"
                      id="name" 
                      {...register("name", { required: "Name is required", maxLength: 20 })}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="surname">Surname</label>
                    <input type="text" id="surname" {...register("surname", { maxLength: 20 })} />
                  </div>
                </div>

                <div className={styles.formDetails}>
                  <div className={styles.leftDetails}>
                    <div className={styles.formLocation}>
                      <label htmlFor="location" className={styles.buttonsLabel}>Where are you looking?</label>
                        <div>
                          <input 
                              type="button" 
                              id="location-russia" 
                              name='location'
                              value="Russia"
                              className={locations.Russia ? `${styles.input} ${styles.selected}` : styles.input}
                              // onClick={() => setLocations(prev => ({...prev, Russia: !prev.Russia}))}
                              onClick={() => toggleLocation("Russia")}

                              // {...register("location")}
                            />
                          <input 
                            type="button" 
                            id="location-turkey" 
                            name='location'
                            value="Turkey"
                            className={locations.Turkey ? `${styles.input} ${styles.selected}` : styles.input}
                            // onClick={() => setLocations(prev => ({...prev, Turkey: !prev.Turkey}))}
                            onClick={() => toggleLocation("Turkey")}

                            // {...register("location")}
                          />
                        </div>
                    </div>

                    <div className={styles.formPurpose}>
                      <label htmlFor="purpose" className={styles.buttonsLabel}>Purpose</label>
                        <div>
                          <input 
                              type="button" 
                              id="purpose-buy" 
                              name='purpose'
                              value="Buy" 
                              className={purposes.Buy ? `${styles.input} ${styles.selected}` : styles.input}
                              // onClick={() => setPurposes(prev => ({...prev, Buy: !prev.Buy}))}
                              onClick={() => togglePurpose("Buy")}

                              // {...register("purpose")}

                          />

                          <input 
                              type="button" 
                              id="purpose-rent"
                              name='purpose'
                              value="Rent"
                              className={purposes.Rent ? `${styles.input} ${styles.selected}` : styles.input}
                              // onClick={() => setPurposes(prev => ({...prev, Rent: !prev.Rent}))}
                              onClick={() => togglePurpose("Rent")}

                              // {...register("purpose")}
                          />
                        </div>
                    </div>
                  </div>

                  <div className={styles.rightDetails}>
                      <div className={styles.formRow}>
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" {...register("city", { maxLength: 15 })}/>
                      </div>

                      <div className={styles.formRow}>
                        <label htmlFor="district">District</label>
                        <input type="text" id="district" {...register("district", { maxLength: 15 })}/>
                      </div>

                      <div className={styles.formRow}>
                        <label htmlFor="budget">Budget</label>
                        <input type="text" id="budget" {...register("budget", { maxLength: 15 })}/>
                      </div>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <label htmlFor="phone_number">Phone Number</label>
                  <input type="tel" id="phone_number" {...register("phone_number", { required: "Phone number is required", pattern: { value: /^\+?[0-9]{7,15}$/, message: "Invalid phone number" } })} />
                </div>

                <div className={styles.formRow}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" {...register("email", { required: "Email is required", pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email address" } })}/>
                </div>
                <textarea 
                  aria-label='Your message' 
                  placeholder="Describe what you're looking for: number of rooms, floor, must-have features. The more details you provide, the better we can help you find your perfect match!" 
                  {...register("message")}
                  id="message">
                </textarea>
            <input className={styles.formBtn} type="submit" value="Send" />
        </form>
  );
};

export default ContactUs;