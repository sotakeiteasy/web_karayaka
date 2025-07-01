import { useContext } from 'react';
import { RateContext } from './RateContext';
import Icon from '@mdi/react';
import { mdiInformationOutline } from '@mdi/js';
import { Tooltip } from 'antd';
import styles from './PriceInRub.module.scss';
import { format } from 'date-fns';
interface Props {
  priceInTry: number;
  stylesName?: string;
  mySize?: number;
}

export const PriceInRub = ({ priceInTry, stylesName, mySize = 1 }: Props) => {
  const { rate, date, loading, error } = useContext(RateContext)!;
  if (loading) return <span>считаем...</span>;
  if (error || !rate || !date) {
    return <span>{new Intl.NumberFormat('ru-RU').format(priceInTry)} ₺</span>;
  }

  const converted = priceInTry / rate;
  const roundedToThousands = Math.round(converted / 1000) * 1000;
  const rubPrice = roundedToThousands.toLocaleString('ru-RU');

  return (
    <span
      className={styles.priceInfo}
      onClick={(e) => {
        const target = e.target as HTMLElement;

        if (!target.classList.contains('APILink') && !target.closest('.APILink')) {
          e.preventDefault();
        }

        e.stopPropagation();
      }}
    >
      <p className={styles.price}>{rubPrice} ₽</p>
      {date && (
        <Tooltip
          trigger={['hover', 'click']}
          placement="top"
          color="#000000d9"
          fresh
          style={{ justifyContent: 'space-between' }}
          destroyOnHidden
          getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
          title={
            <div>
              <p
                style={{
                  color: 'white',
                  fontSize: 16,
                  backgroundColor: 'transparent',
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >{`${new Intl.NumberFormat('ru-RU').format(priceInTry)} ₺`}</p>
              <p
                style={{
                  fontSize: 12,
                  backgroundColor: 'transparent',
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                Примерная стоимость в ₽ по курсу ЦБ РФ на {format(date, 'dd.MM.yyyy')}
              </p>
              <p
                style={{
                  fontSize: 10,
                  backgroundColor: 'transparent',
                  marginLeft: 10,
                  marginRight: 10,
                  display: 'inline-flex',
                  gap: 5,
                  width: '100%',
                }}
              >
                Источник:{' '}
                <a className="APILink" href="https://www.cbr-xml-daily.ru/" target="_blank" rel="noopener noreferrer">
                  виджет курсов валют
                </a>
              </p>
            </div>
          }
        >
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className={styles.iconWrapper}
            style={{ cursor: 'pointer', marginLeft: 6 }}
          >
            <Icon path={mdiInformationOutline} size={mySize} color={stylesName === 'white' ? '#fff' : '#555252'} />
          </span>
        </Tooltip>
      )}
    </span>
  );
};
