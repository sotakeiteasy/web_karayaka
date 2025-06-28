import { useTranslation, LinkWithLocale } from 'next-export-i18n';
import Image from 'next/image';
import styles from './BuyCEOText.module.scss';

export default function CEOsTexts() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOTexts}>
      {/*Покупка недвижимости в Турции */}
      <div className={styles.CEOText}>
        <h2 className={styles.header}>{t('buy.CEOText.title')}</h2>

        <div className={styles.imageContainer}>
          <Image
            src="/images/buy-turkey.jpg"
            alt={t('buy.CEOText.title')}
            fill
            title={t('buy.CEOText.title')}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <p>
          {t('buy.CEOText.p1.beforeLink')} <LinkWithLocale href="/">{t('buy.CEOText.p1.link')}</LinkWithLocale>{' '}
          {t('buy.CEOText.p1.afterLink')}
        </p>

        <p>
          {t('buy.CEOText.p2.beforeLink')} <LinkWithLocale href="/about-us/">{t('buy.CEOText.p2.link')}</LinkWithLocale>{' '}
          {t('buy.CEOText.p2.afterLink')}
        </p>

        <ul className={styles.list}>
          <li>{t('buy.CEOText.bullets.0')}</li>
          <li>{t('buy.CEOText.bullets.1')}</li>
          <li>{t('buy.CEOText.bullets.2')}</li>
          <li>{t('buy.CEOText.bullets.3')}</li>
          <li>{t('buy.CEOText.bullets.4')}</li>
        </ul>

        <p>
          {t('buy.CEOText.p3.beforeLink')} <LinkWithLocale href="/offer/">{t('buy.CEOText.p3.link')}</LinkWithLocale>
          {t('buy.CEOText.p3.afterLink')}
        </p>

        <p>
          {t('buy.CEOText.p4.beforeLink')}{' '}
          <LinkWithLocale href="/discounts/">{t('buy.CEOText.p4.link')}</LinkWithLocale> {t('buy.CEOText.p4.afterLink')}
        </p>
      </div>

      {/* Аренда квартиры в Турции */}
      <div className={styles.CEOText}>
        <h2 className={styles.header}>{t('rentApartment.CEOText.title')}</h2>

        <div className={styles.imageContainer}>
          <Image
            src="/images/rent-apartment.jpg"
            alt={t('rentApartment.CEOText.title')}
            fill
            title={t('rentApartment.CEOText.title')}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <p>
          {t('rentApartment.CEOText.p1.beforeLink')}{' '}
          <LinkWithLocale href="/offer/">{t('rentApartment.CEOText.p1.link')}</LinkWithLocale>{' '}
          {t('rentApartment.CEOText.p1.afterLink')}
        </p>

        <p>{t('rentApartment.CEOText.p2')}</p>

        <ul className={styles.list}>
          <li>{t('rentApartment.CEOText.bullets.0')}</li>
          <li>{t('rentApartment.CEOText.bullets.1')}</li>
          <li>{t('rentApartment.CEOText.bullets.2')}</li>
          <li>{t('rentApartment.CEOText.bullets.3')}</li>
          <li>{t('rentApartment.CEOText.bullets.4')}</li>
        </ul>

        <p>
          {t('rentApartment.CEOText.p3.beforeLink')}{' '}
          <LinkWithLocale href="/discounts/">{t('rentApartment.CEOText.p3.link')}</LinkWithLocale>{' '}
          {t('rentApartment.CEOText.p3.afterLink')}
        </p>

        <p>
          {t('rentApartment.CEOText.p4.beforeLink')}{' '}
          <LinkWithLocale href="/about-us/">{t('rentApartment.CEOText.p4.link')}</LinkWithLocale>
          {t('rentApartment.CEOText.p4.afterLink')}
        </p>

        <p>
          {t('rentApartment.CEOText.p5.beforeLink')}{' '}
          <LinkWithLocale href="/contacts/">{t('rentApartment.CEOText.p5.link')}</LinkWithLocale>
          {t('rentApartment.CEOText.p5.afterLink')}
        </p>
      </div>

      {/* Аренда виллы в Турции */}
      <div className={styles.CEOText}>
        <h2 className={styles.header}>{t('rentVilla.CEOText.title')}</h2>

        <div className={styles.imageContainer}>
          <Image
            src="/images/rent-villa.jpg"
            alt={t('rentVilla.CEOText.title')}
            fill
            title={t('rentVilla.CEOText.title')}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <p>
          {t('rentVilla.CEOText.p1.beforeLink')}{' '}
          <LinkWithLocale href="/">{t('rentVilla.CEOText.p1.link')}</LinkWithLocale>{' '}
          {t('rentVilla.CEOText.p1.afterLink')}
        </p>

        <p>{t('rentVilla.CEOText.p2')}</p>

        <ul className={styles.list}>
          <li>{t('rentVilla.CEOText.bullets.0')}</li>
          <li>{t('rentVilla.CEOText.bullets.1')}</li>
          <li>{t('rentVilla.CEOText.bullets.2')}</li>
          <li>{t('rentVilla.CEOText.bullets.3')}</li>
        </ul>

        <p>
          {t('rentVilla.CEOText.p3.beforeLink')}{' '}
          <LinkWithLocale href="/rent/">{t('rentVilla.CEOText.p3.link')}</LinkWithLocale>{' '}
          {t('rentVilla.CEOText.p3.afterLink')}
        </p>

        <p>
          {t('rentVilla.CEOText.p4.beforeLink')}{' '}
          <LinkWithLocale href="/about-us/">{t('rentVilla.CEOText.p4.link')}</LinkWithLocale>
          {t('rentVilla.CEOText.p4.afterLink')}
        </p>

        <p>
          {t('rentVilla.CEOText.p5.beforeLink')}{' '}
          <LinkWithLocale href="/contacts/">{t('rentVilla.CEOText.p5.link')}</LinkWithLocale>
          {t('rentVilla.CEOText.p5.afterLink')}
        </p>
      </div>
      {/* Покупка квартиры в Турции */}
      <div className={styles.CEOText}>
        <h2 className={styles.header}>{t('buyFlat.CEOText.title')}</h2>

        <div className={styles.imageContainer}>
          <Image
            src="/images/buy-flat-turkey.jpg"
            alt={t('buyFlat.CEOText.title')}
            fill
            title={t('buyFlat.CEOText.title')}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <p>
          {t('buyFlat.CEOText.p1.beforeLink')} <LinkWithLocale href="/">{t('buyFlat.CEOText.p1.link')}</LinkWithLocale>{' '}
          {t('buyFlat.CEOText.p1.afterLink')}
        </p>

        <p>
          {t('buyFlat.CEOText.p2.beforeLink')}{' '}
          <LinkWithLocale href="/about-us/">{t('buyFlat.CEOText.p2.link')}</LinkWithLocale>{' '}
          {t('buyFlat.CEOText.p2.afterLink')}
        </p>

        <ul className={styles.list}>
          <li>{t('buyFlat.CEOText.bullets.0')}</li>
          <li>{t('buyFlat.CEOText.bullets.1')}</li>
          <li>{t('buyFlat.CEOText.bullets.2')}</li>
          <li>{t('buyFlat.CEOText.bullets.3')}</li>
          <li>{t('buyFlat.CEOText.bullets.4')}</li>
        </ul>

        <p>
          {t('buyFlat.CEOText.p3.beforeLink')}{' '}
          <LinkWithLocale href="/contacts/">{t('buyFlat.CEOText.p3.link')}</LinkWithLocale>
          {t('buyFlat.CEOText.p3.afterLink')}
        </p>
      </div>

      {/* Недвижимость в Стамбуле */}
      <div className={styles.CEOText}>
        <h2 className={styles.header}>{t('istanbul.CEOText.title')}</h2>

        <div className={styles.imageContainer}>
          <Image
            src="/images/property-istanbul.jpg"
            alt={t('istanbul.CEOText.title')}
            fill
            title={t('istanbul.CEOText.title')}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <p>
          {t('istanbul.CEOText.p1.beforeLink')}{' '}
          <LinkWithLocale href="/">{t('istanbul.CEOText.p1.link')}</LinkWithLocale> {t('istanbul.CEOText.p1.afterLink')}
        </p>

        <p>
          {t('istanbul.CEOText.p2.beforeLink')}{' '}
          <LinkWithLocale href="/about-us/">{t('istanbul.CEOText.p2.link')}</LinkWithLocale>
          {t('istanbul.CEOText.p2.afterLink')}
        </p>

        <ul className={styles.list}>
          <li>{t('istanbul.CEOText.bullets.0')}</li>
          <li>{t('istanbul.CEOText.bullets.1')}</li>
          <li>{t('istanbul.CEOText.bullets.2')}</li>
          <li>{t('istanbul.CEOText.bullets.3')}</li>
        </ul>

        <p>
          {t('istanbul.CEOText.p3.beforeLink')}{' '}
          <LinkWithLocale href="/contacts/">{t('istanbul.CEOText.p3.link')}</LinkWithLocale>
          {t('istanbul.CEOText.p3.afterLink')}
        </p>

        <p>
          {t('istanbul.CEOText.p4.beforeLink')}{' '}
          <LinkWithLocale href="/discounts/">{t('istanbul.CEOText.p4.link')}</LinkWithLocale>{' '}
          {t('istanbul.CEOText.p4.afterLink')}
        </p>
      </div>

      {/* Недвижимость в Анталии */}
      <div className={styles.CEOText}>
        <h2 className={styles.header}>{t('antalya.CEOText.title')}</h2>

        <div className={styles.imageContainer}>
          <Image
            src="/images/property-antalya.jpg"
            alt={t('antalya.CEOText.title')}
            fill
            title={t('antalya.CEOText.title')}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <p>
          {t('antalya.CEOText.p1.beforeLink')} <LinkWithLocale href="/">{t('antalya.CEOText.p1.link')}</LinkWithLocale>{' '}
          {t('antalya.CEOText.p1.afterLink')}
        </p>

        <p>
          {t('antalya.CEOText.p2.beforeLink')}{' '}
          <LinkWithLocale href="/offer/">{t('antalya.CEOText.p2.link')}</LinkWithLocale>{' '}
          {t('antalya.CEOText.p2.afterLink')}
        </p>

        <ul className={styles.list}>
          <li>{t('antalya.CEOText.bullets.0')}</li>
          <li>{t('antalya.CEOText.bullets.1')}</li>
          <li>{t('antalya.CEOText.bullets.2')}</li>
          <li>{t('antalya.CEOText.bullets.3')}</li>
          <li>{t('antalya.CEOText.bullets.4')}</li>
        </ul>

        <p>
          {t('antalya.CEOText.p3.beforeLink')}{' '}
          <LinkWithLocale href="/contacts/">{t('antalya.CEOText.p3.link')}</LinkWithLocale>{' '}
          {t('antalya.CEOText.p3.afterLink')}
        </p>
      </div>

      {/* Аренда квартиры в Анталии */}
      <div className={styles.CEOText}>
        <h2 className={styles.header}>{t('antalyaRent.CEOText.title')}</h2>

        <div className={styles.imageContainer}>
          <Image
            src="/images/rent-antalya.jpg"
            alt={t('antalyaRent.CEOText.title')}
            fill
            title={t('antalyaRent.CEOText.title')}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <p>
          {t('antalyaRent.CEOText.p1.beforeLink')}{' '}
          <LinkWithLocale href="/">{t('antalyaRent.CEOText.p1.link')}</LinkWithLocale>
          {t('antalyaRent.CEOText.p1.afterLink')}
        </p>

        <p>
          {t('antalyaRent.CEOText.p2.beforeLink')}{' '}
          <LinkWithLocale href="/rent/">{t('antalyaRent.CEOText.p2.link')}</LinkWithLocale>
          {t('antalyaRent.CEOText.p2.afterLink')}
        </p>

        <ul className={styles.list}>
          <li>{t('antalyaRent.CEOText.bullets.0')}</li>
          <li>{t('antalyaRent.CEOText.bullets.1')}</li>
          <li>{t('antalyaRent.CEOText.bullets.2')}</li>
          <li>{t('antalyaRent.CEOText.bullets.3')}</li>
          <li>{t('antalyaRent.CEOText.bullets.4')}</li>
        </ul>

        <p>
          {t('antalyaRent.CEOText.p3.beforeLink')}{' '}
          <LinkWithLocale href="/discounts/">{t('antalyaRent.CEOText.p3.link')}</LinkWithLocale>{' '}
          {t('antalyaRent.CEOText.p3.afterLink')}
        </p>

        <p>
          {t('antalyaRent.CEOText.p4.beforeLink')}{' '}
          <LinkWithLocale href="/contacts/">{t('antalyaRent.CEOText.p4.link')}</LinkWithLocale>
          {t('antalyaRent.CEOText.p4.afterLink')}
        </p>
      </div>
    </div>
  );
}
