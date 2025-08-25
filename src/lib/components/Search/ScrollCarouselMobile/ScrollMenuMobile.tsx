import styles from './ScrollMenuMobile.module.scss';
import Link from 'next/link';
import { useContext } from 'react';
import { DeviceContext } from '@/lib/contexts/DeviceContext';

type Page = {
  navTitle: string;
  link: string;
};
type SeeAlsoCEOProps = {
  pages: Page[];
  rootLink: string;
};

export default function ScrollMenuMobile({ pages, rootLink }: SeeAlsoCEOProps) {
  const { isMobile } = useContext(DeviceContext);

  if (isMobile)
    return (
      <div className={styles.upperMenu}>
        {pages.map((page) => (
          <div className={styles.menuItem} key={page.link}>
            <Link key={page.link} className={styles.menuLink} href={rootLink + page.link}>
              {page.navTitle}
            </Link>
          </div>
        ))}
      </div>
    );
  else return null;
}
