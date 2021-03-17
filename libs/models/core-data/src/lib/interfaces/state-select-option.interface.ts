import { ISelectOption } from './select-option.interface';

export interface IStateSelectOption {
  value: string;
  label: string;
  LgaList: ISelectOption[];
  CityList: ISelectOption[];
}
