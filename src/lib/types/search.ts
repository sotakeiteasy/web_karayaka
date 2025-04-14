export interface SelectOption {
  value: string;
  label: string;
}

export interface FilterChangeEvent {
  target: {
    name: string;
    value: string | number | undefined;
  };
}