// @ts-nocheck
// import Select, { components } from 'react-select';
import { SelectOption } from '@/lib/types';
import { useMemo, useCallback } from 'react';
import { useTranslation } from 'next-export-i18n';
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('react-select'), {
  ssr: false,
});

const { components } = require('react-select');

export function FilterSelect({
  options,
  onChange,
  value,
  name,
  label,
  isNumeric = false,
  isMulti = false,
}: {
  options: SelectOption[];
  onChange: Function;
  value: string | string[] | number;
  name: string;
  label: string;
  isNumeric?: boolean;
  isMulti?: boolean;
}) {
  const { t } = useTranslation();
  const selectedValue = useMemo(() => {
    if (!value && !isMulti) {
      return null;
    }
    if (isMulti && Array.isArray(value)) {
      return options.filter((option) => value.includes(option.value));
    } else if (!isMulti) {
      return options.find((option) => option.value === value);
    }
    return isMulti ? [] : null;
  }, [value, options, isMulti]);

  const removeValue = useCallback(
    (removed) => {
      if (isMulti) {
        const newValue = selectedValue.filter((option) => option.value !== removed.value);
        onChange(name, newValue, isNumeric);
      } else {
        onChange(name, null, isNumeric);
      }
    },
    [selectedValue, onChange, name, isMulti, isNumeric]
  );

  return (
    <>
      <label htmlFor={`${name}-input`}>{t(`search.filters.${name}`)}</label>
      <Select
        inputId={`${name}-input`}
        name={name}
        value={selectedValue}
        onChange={(newValue) => onChange(name, newValue as SelectOption, isNumeric)}
        options={options}
        isSearchable
        classNamePrefix="react-select"
        isMulti={isMulti}
        placeholder={t(`${label}`)}
        isClearable
        searchInput={{ autoComplete: 'new-password' }}
        noOptionsMessage={() => t('search.filters.noOptions')}
        removeValue={removeValue}
        components={isMulti ? { SelectContainer } : undefined}
        controlShouldRenderValue={!isMulti}
      />
    </>
  );
}

const SelectedValuesContainer = ({ getValue, ...props }: any) => {
  const { removeValue } = props.selectProps;
  const getValueLabel = (opt) =>
    props.selectProps.formatOptionLabel ? props.selectProps.formatOptionLabel(opt, 'value') : opt.label;
  const getKey = (opt, index) => `${opt.value}-${index}`;

  return (
    <div
      style={{
        margin: '8px 0',
        paddingLeft: '2px',
        display: 'flex',
        flexWrap: 'wrap',
        borderLeft: '1px solid black',
        boxSizing: 'border-box',
      }}
    >
      {getValue().map((opt, index) => (
        <components.MultiValue
          key={getKey(opt, index)}
          data={opt}
          {...props}
          components={{
            Container: components.MultiValueContainer,
            Label: components.MultiValueLabel,
            Remove: components.MultiValueRemove,
          }}
          removeProps={{
            onClick: () => removeValue(opt),
            onTouchEnd: () => removeValue(opt),
            onMouseDown: (e) => {
              e.preventDefault();
              e.stopPropagation();
            },
          }}
        >
          {getValueLabel(opt)}
        </components.MultiValue>
      ))}
    </div>
  );
};

const SelectContainer = ({ children, innerProps, isFocused, ...commonProps }: any) => {
  return (
    <components.SelectContainer innerProps={innerProps} isFocused={isFocused} {...commonProps}>
      {commonProps.selectProps.value.length > 0 && <SelectedValuesContainer {...commonProps} />}
      {children}
    </components.SelectContainer>
  );
};
