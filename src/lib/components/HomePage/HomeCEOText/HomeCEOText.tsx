import { useTranslation, LinkWithLocale } from 'next-export-i18n';
import Image from 'next/image';
import styles from './HomeCEOText.module.scss';

export default function HomeCEOText() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOText}>
      <h2 className={styles.header}>{t('home.CEOText.title')}</h2>

      <div className={styles.imageContainer}>
        <Image
          src="/images/real-estate-turkey.jpg"
          alt={t('home.CEOText.title')}
          fill
          title={t('home.CEOText.title')}
          style={{
            objectFit: 'cover',
          }}
        />
      </div>

      <p>
        {t('home.CEOText.p1.beforeLink1')} <LinkWithLocale href="/buy/">{t('home.CEOText.p1.link1')}</LinkWithLocale>{' '}
        {t('home.CEOText.p1.afterLink1')}
      </p>

      <ul className={styles.bulletList}>
        <li>{t('home.CEOText.bullets.1')}</li>
        <li>
          {t('home.CEOText.bullets.2.beforeLink')}{' '}
          <LinkWithLocale href="/about-us/">{t('home.CEOText.bullets.2.link')}</LinkWithLocale>
          {t('home.CEOText.bullets.2.afterLink')}
        </li>
        <li>{t('home.CEOText.bullets.3')}</li>
      </ul>

      <h3 className={styles.subheader}>{t('home.CEOText.advantagesTitle')}</h3>

      <ul className={styles.list}>
        <li>{t('home.CEOText.advantages.0')}</li>
        <li>
          {t('home.CEOText.advantages.1.beforeLink')}{' '}
          <LinkWithLocale href="/offer/">{t('home.CEOText.advantages.1.link')}</LinkWithLocale>
          {t('home.CEOText.advantages.1.afterLink')}
        </li>
        <li>{t('home.CEOText.advantages.2')}</li>
        <li>{t('home.CEOText.advantages.3')}</li>
        <li>{t('home.CEOText.advantages.4')}</li>
      </ul>

      <p>
        {t('home.CEOText.p2.beforeLink')} <LinkWithLocale href="/contact/">{t('home.CEOText.p2.link')}</LinkWithLocale>
        {t('home.CEOText.p2.afterLink')}
      </p>
    </div>
  );
}
