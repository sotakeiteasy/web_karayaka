import { useTranslation, LinkWithLocale } from 'next-export-i18n';
import Image from 'next/image';
import styles from './SearchCEOText.module.scss';
import { getImageUrl } from '@/lib/utils';
export default function RentCEOText() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOText}>
      <h1 className={styles.header}>{t('rent.CEOText.title')}</h1>

      <div className={styles.imageContainer}>
        <Image
          src={getImageUrl(`assets/images/search/ceo-rent-turkey.jpg`)}
          alt={t('rent.CEOText.title')}
          fill
          title={t('rent.CEOText.title')}
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.textBackdrop}></div>
      </div>

      <p>
        {t('rent.CEOText.p1.beforeLink1')} <LinkWithLocale href="/">{t('rent.CEOText.p1.link1')}</LinkWithLocale>{' '}
        {t('rent.CEOText.p1.afterLink1')}
      </p>

      <h3 className={styles.subheader}>{t('rent.CEOText.subtitle')}</h3>

      <ul className={styles.list}>
        <li>{t('rent.CEOText.bullets.0')}</li>
        <li>
          {t('rent.CEOText.bullets.1.beforeLink')}{' '}
          <LinkWithLocale href="/about-us/">{t('rent.CEOText.bullets.1.link')}</LinkWithLocale>
          {t('rent.CEOText.bullets.1.afterLink')}
        </li>
        <li>{t('rent.CEOText.bullets.2')}</li>
        <li>{t('rent.CEOText.bullets.3')}</li>
        <li>{t('rent.CEOText.bullets.4')}</li>
      </ul>

      <p>
        {t('rent.CEOText.p2.beforeLink')} <LinkWithLocale href="/contacts/">{t('rent.CEOText.p2.link')}</LinkWithLocale>
        {t('rent.CEOText.p2.afterLink')}
      </p>

      <p>{t('rent.CEOText.p3')}</p>

      <p>
        {t('rent.CEOText.p4.beforeLink')} <LinkWithLocale href="/offer/">{t('rent.CEOText.p4.link')}</LinkWithLocale>
        {t('rent.CEOText.p4.afterLink')}
      </p>
    </div>
  );
}
