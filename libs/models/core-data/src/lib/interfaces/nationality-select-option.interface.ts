import { IStateSelectOption } from './state-select-option.interface';

export interface INationalitySelectOption {
  value: string;
  label: string;
  StatesList: IStateSelectOption[];
}
