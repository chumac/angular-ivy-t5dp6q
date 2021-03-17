import { IVariableAllowance, IVariableAllowanceRate } from "@nutela/models/compensation/payroll";
import { ISelectOption } from "@nutela/models/core-data";



export interface IVariableAllowanceState {
  data: IVariableAllowance[];
  showEditor:boolean;
  showViewer:boolean;
  showRateViewer:boolean;
  showRateEditor:boolean;
  isProcessing: boolean;
  isLoading:boolean;

  payrollProfileList: ISelectOption[],
  transactionUnitList: ISelectOption[],
  groupNameList: ISelectOption[],
  currencyList: ISelectOption[],
  payFormulaList: ISelectOption[],
  paygroupList: ISelectOption[],
  rates: IVariableAllowanceRate[],
}

export const initialVariableAllowanceState: IVariableAllowanceState = {
  data: [],
  showEditor: false,
  showViewer: false,
  showRateViewer: false,
  showRateEditor: false,
  isProcessing: false,
  isLoading: false,

  payrollProfileList: null,
  transactionUnitList: null,
  groupNameList: null,
  currencyList: null,
  payFormulaList: null,
  paygroupList: null,
  rates: []
}

