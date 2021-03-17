import { IEnterpriseStructureSelectOption } from './ent-structure-select-option.interface';

export interface IEnterpriseStructureTypeSelectOption {
  value: string;
  label: string;
  EnterpriseStructuresList: IEnterpriseStructureSelectOption[];
}
