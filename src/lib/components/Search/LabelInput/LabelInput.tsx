import styles from '../index.module.scss';
import { NumericFormat } from 'react-number-format';

export function LabelInput({
  name,
  value,
  onChange,
  t,
  placeholder,
  unit,
  maxLength,
}: {
  name: string;
  value: number | string | undefined;
  onChange: Function;
  t: any;
  placeholder?: string;
  unit?: string;
  maxLength?: number;
}) {
  return (
    <div
      style={{ '--unit': `'${unit}'` } as React.CSSProperties}
      className={`${styles.filter} ${styles.filterRelative}`}
    >
      <label htmlFor={name}>{t(`search.filters.${name}`)}</label>
      <NumericFormat
        id={name}
        name={name}
        value={value || ''}
        onValueChange={(values) => {
          console.log(values.value);
          onChange(name, String(values.value));
        }}
        placeholder={placeholder ? placeholder : t(`search.filters.point`)}
        thousandSeparator=" "
        allowNegative={false}
        maxLength={maxLength}
      />
    </div>
  );
}
