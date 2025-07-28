import { useTranslation, LinkWithLocale } from 'next-export-i18n';

import styles from './SearchCEOText.module.scss';

export default function RealEstateLawyer() {
  const { t } = useTranslation();

  return (
    <div className={styles.CEOText}>
      <h1 className={styles.header}>{t('realEstateLawyer.CEOText.title')}</h1>

      <p>
        {t('realEstateLawyer.CEOText.p1.beforeLink')}{' '}
        <LinkWithLocale href="/about-us">{t('realEstateLawyer.CEOText.p1.link')}</LinkWithLocale>
        {t('realEstateLawyer.CEOText.p1.afterLink')}
      </p>

      <p>
        {t('realEstateLawyer.CEOText.p2.beforeLink')}{' '}
        <LinkWithLocale href="/offer">{t('realEstateLawyer.CEOText.p2.link')}</LinkWithLocale>
        {t('realEstateLawyer.CEOText.p2.afterLink')}
      </p>

      <ul className={styles.bulletList}>
        <li>{t('realEstateLawyer.CEOText.bullets.0')}</li>
        <li>{t('realEstateLawyer.CEOText.bullets.1')}</li>
        <li>{t('realEstateLawyer.CEOText.bullets.2')}</li>
        <li>{t('realEstateLawyer.CEOText.bullets.3')}</li>
        <li>{t('realEstateLawyer.CEOText.bullets.4')}</li>
      </ul>

      <p>
        {t('realEstateLawyer.CEOText.p3.beforeLink')}{' '}
        <LinkWithLocale href="/">{t('realEstateLawyer.CEOText.p3.link')}</LinkWithLocale>
        {t('realEstateLawyer.CEOText.p3.afterLink')}
      </p>

      <p>
        {t('realEstateLawyer.CEOText.p4.beforeLink')}{' '}
        <LinkWithLocale href="/contacts">{t('realEstateLawyer.CEOText.p4.link')}</LinkWithLocale>
        {t('realEstateLawyer.CEOText.p4.afterLink')}
      </p>
    </div>
  );
}
