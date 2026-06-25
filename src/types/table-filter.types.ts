/* eslint-disable no-unused-vars */
export interface ITableFilterOption {
  label: string;
  value: string;
}

export interface ITableFilter {
  type: 'select' | 'search' | 'tabs';
  name: string;
  placeholder?: string;
  options?: ITableFilterOption[];
  value?: string;
  onChange?: (val: string) => void;
}
