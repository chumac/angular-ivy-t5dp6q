import { ControlTypes } from "@nutela/shared/app-global";
import { ISelectOption } from "./select-option.interface";


export interface IFormRowData {
  description: string;
  type: ControlTypes;
  size?: number; // Number of characters if type is TEXT.
  options?: ISelectOption[];    // If type is SELECT | OPTION.
  list?: any[]
}
