import styles from './LocalStorageAlert.module.scss';
import { useState } from 'react';
export function LocalStorageAlert() {
  const [alertAccepted, setAlertAccepted] = useState(false);
  return (
    <>
      {!alertAccepted && (
        <>
          <div className={styles.shadow}></div>
          <div className={styles.LocalStorageAlert}>
            <p className={styles.message}>
              Translation in our website is supported only with Local Storage. It seems that you disabled it.
            </p>
            <p className={styles.message}>
              Английская версия сайта не поддерживается при отключенном local storage. Похоже, вы отключили его.
            </p>
            <button className={styles.acceptButton} onClick={() => setAlertAccepted(true)}>
              Ok...
            </button>
          </div>
        </>
      )}
    </>
  );
}
