import React, { useEffect } from "react";
import emailjs from "@emailjs/browser";
import styles from "./form.module.scss";
import { useState } from "react";
import { useTranslation } from "next-export-i18n";
import { useForm, SubmitHandler } from "react-hook-form";

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

type LocationKey = "Russia" | "Turkey";
type PurposeKey = "Buy" | "Rent";

const SERVICE_ID = "service_karayaka";
const TEMPLATE_ID = "template_karayaka";
const PUBLIC_KEY = "Yq2DEqGgQI4ibTmyj";

export const ContactUs = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
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
      message: "",
    },
    mode: "onBlur", // Валидация при потере фокуса
  });

  const watchEmail = watch("email");
  const watchPhone = watch("phone_number");

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

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY).then(
      () => {
        reset();
        setIsSubmitted(true);
      },
      (error) => {
        console.error("Failed to send form:", error.text);
      }
    );
  };

  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  const [purposes, setPurposes] = useState<Record<PurposeKey, boolean>>({
    Buy: false,
    Rent: false,
  });

  const [locations, setLocations] = useState<Record<LocationKey, boolean>>({
    Russia: false,
    Turkey: false,
  });

  const toggleLocation = (country: LocationKey) => {
    setLocations((prev) => {
      const updated = { ...prev, [country]: !prev[country] };
      const selectedLocations = Object.keys(updated).filter(
        (key) => updated[key as LocationKey]
      ) as string[];
      setValue("location", selectedLocations);
      return updated;
    });
  };

  const togglePurpose = (type: PurposeKey) => {
    setPurposes((prev) => {
      const updated = { ...prev, [type]: !prev[type] };
      const selectedTypes = Object.keys(updated).filter(
        (key) => updated[key as PurposeKey]
      ) as string[];
      setValue("purpose", selectedTypes);
      return updated;
    });
  };

  const validateContactInfo = (
    value: string,
    fieldName: "email" | "phone_number"
  ) => {
    if (value && value.trim()) return true;

    const otherField = fieldName === "email" ? watchPhone : watchEmail;

    if (otherField && otherField.trim()) {
      return true;
    }

    return fieldName === "email"
      ? t("form.errors.contactRequired")
      : t("form.errors.contactRequired");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {isSubmitted ? (
        <div className={styles.thankYouMessage}>
          <h2>{t("form.thankYou.title")}</h2>
          <p>{t("form.thankYou.message")}</p>
        </div>
      ) : (
        <>
          <legend className={styles.legend}>{t("form.title")}</legend>
          <p className={styles.description}>{t("form.description")}</p>
          <div className={styles.formRow}>
            <div>
              <label htmlFor="name" className={styles.label}>
                {t("form.name")}
              </label>
              <input
                type="text"
                id="name"
                className={errors.name ? styles.error : ""}
                {...register("name", {
                  required: t("form.errors.nameRequired"),
                  maxLength: 20,
                })}
              />
              {errors.name && (
                <p className={styles.errorMessage}>{errors.name.message}</p>
              )}
              {!errors.name && <div className={styles.errorPlaceholder}></div>}
            </div>

            <div>
              <label htmlFor="surname" className={styles.label}>
                {t("form.surname")}
              </label>
              <input
                type="text"
                id="surname"
                {...register("surname", { maxLength: 20 })}
              />
              <div className={styles.errorPlaceholder}></div>
            </div>
          </div>

          <div className={styles.formDetails}>
            <div className={styles.leftDetails}>
              <fieldset className={styles.formLocation}>
                <legend className={styles.buttonsLabel}>
                  {t("form.location.label")}
                </legend>
                <div>
                  <input
                    type="button"
                    id="location-russia"
                    name="location"
                    value={t("form.location.russia")}
                    className={
                      locations.Russia
                        ? `${styles.input} ${styles.selected}`
                        : styles.input
                    }
                    onClick={() => toggleLocation("Russia")}
                  />
                  <input
                    type="button"
                    id="location-turkey"
                    name="location"
                    value={t("form.location.turkey")}
                    className={
                      locations.Turkey
                        ? `${styles.input} ${styles.selected}`
                        : styles.input
                    }
                    onClick={() => toggleLocation("Turkey")}
                  />
                </div>
              </fieldset>

              <fieldset className={styles.formPurpose}>
                <legend className={styles.buttonsLabel}>
                  {t("form.purpose.label")}
                </legend>
                <div>
                  <input
                    type="button"
                    id="purpose-buy"
                    name="purpose"
                    value={t("form.purpose.buy")}
                    className={
                      purposes.Buy
                        ? `${styles.input} ${styles.selected}`
                        : styles.input
                    }
                    onClick={() => togglePurpose("Buy")}
                  />
                  <input
                    type="button"
                    id="purpose-rent"
                    name="purpose"
                    value={t("form.purpose.rent")}
                    className={
                      purposes.Rent
                        ? `${styles.input} ${styles.selected}`
                        : styles.input
                    }
                    onClick={() => togglePurpose("Rent")}
                  />
                </div>
              </fieldset>
            </div>

            <div className={styles.rightDetails}>
              <div className={styles.formRow}>
                <label htmlFor="city" className={styles.label}>
                  {t("form.city")}
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("city", { maxLength: 15 })}
                />
              </div>

              <div className={styles.formRow}>
                <label htmlFor="district" className={styles.label}>
                  {t("form.district")}
                </label>
                <input
                  type="text"
                  id="district"
                  {...register("district", { maxLength: 15 })}
                />
              </div>

              <div className={styles.formRow}>
                <label htmlFor="budget" className={styles.label}>
                  {t("form.budget")}
                </label>
                <input
                  type="text"
                  id="budget"
                  {...register("budget", { maxLength: 15 })}
                />
              </div>
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor="phone_number" className={styles.label}>
              {t("form.phone")}
            </label>
            <input
              type="tel"
              id="phone_number"
              className={errors.phone_number ? styles.error : ""}
              {...register("phone_number", {
                validate: (value) => validateContactInfo(value, "phone_number"),
                pattern: {
                  value: /^\+?[0-9]{7,15}$/,
                  message: t("form.errors.phoneInvalid"),
                },
              })}
            />
            {errors.phone_number && (
              <p className={styles.errorMessage}>
                {errors.phone_number.message}
              </p>
            )}
            {!errors.phone_number && (
              <div className={styles.errorPlaceholder}></div>
            )}
          </div>

          <div className={styles.formRow}>
            <label htmlFor="email" className={styles.label}>
              {t("form.email")}
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              className={errors.email ? styles.error : ""}
              {...register("email", {
                validate: (value) => validateContactInfo(value, "email"),
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: t("form.errors.emailInvalid"),
                },
              })}
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}
            {!errors.email && <div className={styles.errorPlaceholder}></div>}
          </div>

          <textarea
            aria-label={t("form.message.label")}
            placeholder={t("form.message.placeholder")}
            {...register("message")}
            id="message"
          />

          <input
            className={styles.formBtn}
            type="submit"
            value={t("form.submit")}
          />
        </>
      )}
    </form>
  );
};

export default ContactUs;
