import styles from './header.module.scss';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import Icon from '@mdi/react';
import { mdiTriangleSmallDown } from '@mdi/js';


export default function Header() {
    const { t } = useTranslation('common');

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link className={styles.logo} href="/">{t('header.home')}</Link>
                <Link href="/search">{t('header.rent')}</Link>
                <Link href="/search">{t('header.buy')}</Link>
                <Link href="/about-us">{t('header.aboutUs')}</Link>
                <Link href="/custom-offers">{t('header.customOffers')}</Link>
                <Link href="/blog">{t('header.blog')}</Link>
            </nav>
            <div className={styles.buttons}>
                <button className={styles.button}>
                     ENG 
                     <Icon path={mdiTriangleSmallDown} size={1} />  
                     </button>
                <button className={styles.button}> 
                    USD 
                    <Icon path={mdiTriangleSmallDown} size={1} />
                </button>
            </div>
        </header>
    )
}