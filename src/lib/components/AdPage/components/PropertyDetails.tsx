import React from 'react';
import Icon from '@mdi/react';
import {
  mdiArrowExpand,
  mdiBedQueenOutline,
  mdiStairs,
  mdiHomeCityOutline,
  mdiKeyChain,
  mdiCheckbook,
  mdiCalendarMonth,
  mdiCircleSmall,
  mdiUpdate,
  mdiLandPlots,
} from '@mdi/js';
import styles from '../AdPage.module.scss';
import { Ad, SearchType, ParkingType } from '@/lib/types';
import { propertyTypeTranslations } from '@/lib/translations';

interface Props {
  ad: Ad;
  lang: 'ru' | 'en';
  t: any;
}

export function PropertyDetails({ ad, lang, t }: Props) {
  return (
    <div className={styles.info}>
      <div className={styles.infoTop}>
        {ad.publicationDate && (
          <p>
            {' '}
            <span>
              <Icon path={mdiUpdate} size={1} />
              {t('ad.property.updateDate')}
            </span>
            <span>{ad.publicationDate?.split(' ').slice(0, 1).join('').split('-').reverse().join('/')}</span>
          </p>
        )}
        <p>
          <span>
            <Icon path={mdiArrowExpand} size={1} />
            {t('ad.property.area')}
          </span>
          <span>
            {ad.area} {t('ad.property.squareMeters')}
            <sup>2</sup>
          </span>
        </p>
        {ad.rooms && (
          <p>
            <span>
              {(ad.propertyType === 'apartment' || ad.propertyType === 'villa') && (
                <>
                  <Icon path={mdiBedQueenOutline} size={1} />
                  {t('ad.property.bedrooms')}
                </>
              )}
              {ad.propertyType === 'commercial' && (
                <>
                  {' '}
                  <Icon path={mdiLandPlots} size={1} />
                  {t('ad.property.commercial')}
                </>
              )}
            </span>
            <span>{ad.rooms}</span>
          </p>
        )}
        {ad.floorInHouse && (
          <p>
            <span>
              <Icon path={mdiStairs} size={1} />
              {ad.floor ? t('ad.property.floor') : t('ad.property.floors')}
            </span>
            <span>{ad.floor && ad.floorInHouse ? `${ad.floor || ''}/${ad.floorInHouse || ''}` : ad.floorInHouse}</span>
          </p>
        )}
        <p>
          <span>
            <Icon path={mdiHomeCityOutline} size={1} />
            {t('ad.property.type')}
          </span>
          <span>{propertyTypeTranslations[ad.propertyType][lang]}</span>
        </p>
        <p>
          <span>
            <Icon path={mdiCheckbook} size={1} />
            {t('ad.property.listing')}
          </span>
          <span>{ad.type === SearchType.Buy ? t('ad.property.forSale') : t('ad.property.forRent')}</span>
        </p>
        {ad.age && (
          <p>
            <span>
              <Icon path={mdiCalendarMonth} size={1} />
              {t('ad.property.buildingAge')}
            </span>
            <span>{ad.age}</span>
          </p>
        )}
        {ad.situation && (
          <p>
            <span>
              <Icon path={mdiKeyChain} size={1} />
              {t('ad.property.condition')}
            </span>
            <span>{t(`ad.property.situation.${ad.situation}`)}</span>
          </p>
        )}
      </div>

      {(ad.parking || ad.bathroom) && (
        <div className={styles.infoBottom}>
          <div className={styles.infoBottomLeft}>
            <ul>
              {(ad.parking === ParkingType.Closed || ad.parking === ParkingType.Both) && (
                <li>
                  <Icon className={styles.dot} path={mdiCircleSmall} size={1.5} />
                  <span>{t('ad.property.closedParking')}</span>
                </li>
              )}
              {(ad.parking === ParkingType.Open || ad.parking === ParkingType.Both) && (
                <li>
                  <Icon className={styles.dot} path={mdiCircleSmall} size={1.5} />
                  <span>{t('ad.property.openParking')}</span>
                </li>
              )}
            </ul>
          </div>
          <div className={styles.infoBottomRight}>
            <ul>
              {ad.bathroom && ad.bathroom > 1 && (
                <li>
                  <Icon className={styles.dot} path={mdiCircleSmall} size={1.5} />
                  <span>
                    {ad.bathroom}{' '}
                    {ad.bathroom >= 5 && lang === 'ru' ? t('ad.property.bathroomsmore') : t('ad.property.bathrooms')}{' '}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
