import styles from '../index.module.scss';

export function LabelInput({
  name,
  value,
  onChange,
  t,
}: {
  name: string;
  value: number | string | undefined;
  onChange: Function;
  t: any;
}) {
  return (
    <div className={styles.filter}>
      <label htmlFor={name}>{t(`search.filters.${name}`)}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value || ''}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={t(`search.filters.point`)}
      />
    </div>
  );
}
