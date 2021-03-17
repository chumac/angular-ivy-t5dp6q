import { IFormula } from "@nutela/models/compensation/payroll";
import { IRolesTransform } from "libs/feature-module-ui/platform/provisioning-ui/src/lib/models/interfaces";
import { ISelectOption } from "@nutela/models/core-data";



export interface IFormulaState {
  data: IFormula[];
  filteredData: IFormula[];
  showEditor: boolean;
  isProcessing: boolean;
  isLoading: boolean;
  hasFormulaAdminRole: boolean;
  roles: IRolesTransform[];
}

export const initialFormulaState: IFormulaState = {
  data: [],
  filteredData: [],
  showEditor: false,
  isProcessing: false,
  isLoading: false,
  hasFormulaAdminRole: true,
  roles: null,
}

