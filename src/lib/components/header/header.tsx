import styles from './header.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Icon from '@mdi/react';
import { mdiTriangleSmallDown } from '@mdi/js';
import { useState } from 'react';

export default function Header() {
    const { t } = useTranslation('common');
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;
    
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
    
    // Функция переключения языка
    const changeLanguage = (newLocale: string) => {
        router.push({ pathname, query }, asPath, { locale: newLocale });
        setIsLanguageMenuOpen(false);
    };
    
    // Простой способ закрыть меню при клике где угодно
    const closeAllMenus = () => {
        // Таймаут нужен, чтобы клик на кнопке успел обработаться перед закрытием
        setTimeout(() => {
            setIsLanguageMenuOpen(false);
        }, 100);
    };

    return (
        <header className={styles.header} onClick={closeAllMenus}>
            <nav className={styles.nav}>
                <Link className={styles.logo} href="/">{t('header.home')}</Link>
                <Link href="/search?type=rent">{t('header.rent')}</Link>
                <Link href="/search?type=sale">{t('header.buy')}</Link>
                <Link href="/about-us">{t('header.aboutUs')}</Link>
                <Link href="/custom-offers">{t('header.customOffers')}</Link>
                {locale === "ru" && <Link href="/blog">{t('header.blog')}</Link>}
            </nav>
            <div className={styles.buttons}>
                <div 
                    className={styles.dropdown} 
                    onClick={(e) => e.stopPropagation()} // Останавливаем всплытие события
                >
                    <button 
                        className={styles.button} 
                        onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                    >
                        {locale === 'en' ? 'ENG' : 'РУС'}
                        <Icon path={mdiTriangleSmallDown} size={1} />  
                    </button>
                    {isLanguageMenuOpen && (
                        <div className={styles.dropdownMenu}>
                            <button 
                                className={`${styles.menuItem} ${locale === 'en' ? styles.active : ''}`} 
                                onClick={() => changeLanguage('en')}
                            >
                                English
                            </button>
                            <button 
                                className={`${styles.menuItem} ${locale === 'ru' ? styles.active : ''}`} 
                                onClick={() => changeLanguage('ru')}
                            >
                                Русский
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}