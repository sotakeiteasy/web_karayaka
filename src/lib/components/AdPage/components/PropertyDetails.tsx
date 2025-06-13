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
} from '@mdi/js';
import styles from '../AdPage.module.scss';
import { Ad, SearchType } from '@/lib/types';
import { propertyTypeTranslations } from '@/lib/translations';
import { ParkingType } from '@/lib/types/FilterTypes';

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
            {ad.publicationDate?.split(' ').slice(0, 1).join('').split('-').reverse().join('/')}
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
              <Icon path={mdiBedQueenOutline} size={1} />
              {t('ad.property.bedrooms')}
            </span>
            {ad.rooms}
          </p>
        )}
        {ad.floorInHouse && (
          <p>
            <span>
              <Icon path={mdiStairs} size={1} />
              {ad.floor ? t('ad.property.floor') : t('ad.property.floors')}
            </span>
            {ad.floor && ad.floorInHouse ? `${ad.floor || ''}/${ad.floorInHouse || ''}` : ad.floorInHouse}
          </p>
        )}
        <p>
          <span>
            <Icon path={mdiHomeCityOutline} size={1} />
            {t('ad.property.type')}
          </span>
          {propertyTypeTranslations[ad.propertyType][lang]}
        </p>
        <p>
          <span>
            <Icon path={mdiCheckbook} size={1} />
            {t('ad.property.listing')}
          </span>
          {ad.type === SearchType.Buy ? t('ad.property.forSale') : t('ad.property.forRent')}
        </p>
        {ad.age && (
          <p>
            <span>
              <Icon path={mdiCalendarMonth} size={1} />
              {t('ad.property.buildingAge')}
            </span>
            {ad.age}
          </p>
        )}
        {ad.situation && (
          <p>
            <span>
              <Icon path={mdiKeyChain} size={1} />
              {t('ad.property.condition')}
            </span>
            {t(`ad.property.situation.${ad.situation}`)}
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
                  {t('ad.property.closedParking')}
                </li>
              )}
              {(ad.parking === ParkingType.Open || ad.parking === ParkingType.Both) && (
                <li>
                  <Icon className={styles.dot} path={mdiCircleSmall} size={1.5} />
                  {t('ad.property.openParking')}
                </li>
              )}
            </ul>
          </div>
          <div className={styles.infoBottomRight}>
            <ul>
              {ad.bathroom && ad.bathroom > 1 && (
                <li>
                  <Icon className={styles.dot} path={mdiCircleSmall} size={1.5} />
                  {ad.bathroom} {t('ad.property.bathrooms')}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
