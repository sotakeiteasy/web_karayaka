import React, { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactUs.module.scss';
import { useState } from 'react';
import { useTranslation } from 'next-export-i18n';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Inputs } from './types';
import { CountryType, SearchType } from '@/lib/types/FilterTypes';
import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID || '';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID || '';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY || '';

export function ContactUs() {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      location: [],
      purpose: [],
      phone_number: '',
      message: '',
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const templateParams = {
      name: data.name,
      phone_number: data.phone_number,
      location: data.location.join(', '),
      purpose: data.purpose.join(', '),
      message: data.message || '',
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY).then(
      () => {
        reset();
        setIsSubmitted(true);
      },
      (error) => {
        console.error('Failed to send form:', error.text);
      }
    );
  };

  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  const [purposes, setPurposes] = useState<Record<SearchType, boolean>>({
    buy: false,
    rent: false,
  });

  const [locations, setLocations] = useState<Record<CountryType, boolean>>({
    Russia: false,
    Turkey: false,
  });

  const toggleLocation = (country: CountryType) => {
    setLocations((prev) => {
      const updated = { ...prev, [country]: !prev[country] };
      const selectedLocations = Object.keys(updated).filter((key) => updated[key as CountryType]) as string[];
      setValue('location', selectedLocations);
      return updated;
    });
  };

  const togglePurpose = (type: SearchType) => {
    setPurposes((prev) => {
      const updated = { ...prev, [type]: !prev[type] };
      const selectedTypes = Object.keys(updated).filter((key) => updated[key as SearchType]) as string[];
      setValue('purpose', selectedTypes);
      return updated;
    });
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {isSubmitted ? (
          <div className={styles.thankYouMessage}>
            <h2>{t('form.thankYou.title')}</h2>
            <p>{t('form.thankYou.message')}</p>
          </div>
        ) : (
          <>
            <legend className={styles.legend}>{t('form.title')}</legend>
            <p className={styles.description}>{t('form.description')}</p>
            <div className={styles.formRow}>
              <label htmlFor="name" className={styles.label}>
                {t('form.name')}
              </label>
              <input
                type="text"
                id="name"
                className={errors.name ? styles.error : ''}
                {...register('name', {
                  required: t('form.errors.nameRequired'),
                  maxLength: 20,
                })}
              />
              {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
              {!errors.name && <div className={styles.errorPlaceholder}></div>}
            </div>

            <div className={styles.formDetails}>
              <fieldset className={styles.formLocation}>
                <legend className={styles.buttonsLabel}>{t('form.location.label')}</legend>
                <div>
                  <input
                    type="button"
                    id="location-russia"
                    name="location"
                    value={t('form.location.russia')}
                    className={locations.Russia ? `${styles.input} ${styles.selected}` : styles.input}
                    onClick={() => toggleLocation(CountryType.Russia)}
                  />
                  <input
                    type="button"
                    id="location-turkey"
                    name="location"
                    value={t('form.location.turkey')}
                    className={locations.Turkey ? `${styles.input} ${styles.selected}` : styles.input}
                    onClick={() => toggleLocation(CountryType.Turkey)}
                  />
                </div>
              </fieldset>

              <fieldset className={styles.formPurpose}>
                <legend className={styles.buttonsLabel}>{t('form.purpose.label')}</legend>
                <div>
                  <input
                    type="button"
                    id="purpose-buy"
                    name="purpose"
                    value={t('form.purpose.buy')}
                    className={purposes.buy ? `${styles.input} ${styles.selected}` : styles.input}
                    onClick={() => togglePurpose(SearchType.Buy)}
                  />
                  <input
                    type="button"
                    id="purpose-rent"
                    name="purpose"
                    value={t('form.purpose.rent')}
                    className={purposes.rent ? `${styles.input} ${styles.selected}` : styles.input}
                    onClick={() => togglePurpose(SearchType.Rent)}
                  />
                </div>
              </fieldset>
            </div>

            <div className={styles.formRow}>
              <label htmlFor="phone_number" className={styles.label}>
                {t('form.phone')}
              </label>
              <input
                type="tel"
                id="phone_number"
                className={errors.phone_number ? styles.error : ''}
                {...register('phone_number', {
                  required: t('form.errors.contactRequired'),

                  pattern: {
                    value: /^\+?[0-9]{7,15}$/,
                    message: t('form.errors.phoneInvalid'),
                  },
                })}
              />
              {errors.phone_number && <p className={styles.errorMessage}>{errors.phone_number.message}</p>}
              {!errors.phone_number && <div className={styles.errorPlaceholder}></div>}
            </div>

            <textarea
              aria-label={t('form.message.label')}
              placeholder={t('form.message.placeholder')}
              {...register('message')}
              id="message"
            />

            <input className={styles.formBtn} type="submit" value={t('form.submit')} />
            <p className={styles.agreement}>
              {t('form.agreement.1')}&nbsp;
              <a href="/agreement/" target="_blank" rel="noopener noreferrer">
                {t('form.agreement.2')}
              </a>
              &nbsp;{t('form.agreement.3')}
            </p>
          </>
        )}
      </form>
      <div className={styles.formImg}>
        <Image
          src={getImageUrl('/images/form.jpg')}
          fill={true}
          alt="form image"
          draggable="false"
          sizes="100%"
          style={{
            objectFit: 'cover',
            borderRadius: '0px 15px 15px 0px',
          }}
          loading="eager"
          priority
        />
      </div>
    </div>
  );
}
