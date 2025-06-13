import { useEffect } from 'react';
import styles from './CookiesConsent.module.scss';
import { useTranslation } from 'next-export-i18n';

export function CookieConsent({ visible, setVisible }: any) {
  const { t } = useTranslation();

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');

    if (cookieConsent === null) {
      setVisible(true);
    }
  }, [setVisible]);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };

  return (
    <div className={`${styles.cookieConsent} ${visible ? styles.active : ''}`}>
      <p className={styles.message}>
        {t('cookies.disclaimer')}
        <br />
        <a href="/privacyPolicy" target="_blank" rel="noopener noreferrer">
          <span>{t('cookies.policy')}</span>
        </a>
      </p>
      <button className={styles.acceptButton} onClick={handleAccept}>
        {t('cookies.accept')}
      </button>
    </div>
  );
}
