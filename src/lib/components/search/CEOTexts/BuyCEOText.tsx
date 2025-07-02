import { useTranslation, LinkWithLocale } from 'next-export-i18n';
import Image from 'next/image';
import styles from './SearchCEOText.module.scss';
import { getImageUrl } from '@/lib/utils';
export default function CEOsTexts() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOText}>
      <h1 className={styles.header}>{t('buy.CEOText.title')}</h1>

      <div className={styles.imageContainer}>
        <Image
          src={getImageUrl(`assets/images/search/ceo-buy-turkey.jpg`)}
          alt={t('buy.CEOText.title')}
          fill
          title={t('buy.CEOText.title')}
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.textBackdrop}></div>
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
        {t('buy.CEOText.p4.beforeLink')} <LinkWithLocale href="/discounts/">{t('buy.CEOText.p4.link')}</LinkWithLocale>{' '}
        {t('buy.CEOText.p4.afterLink')}
      </p>
    </div>
  );
}
