import { IVariableDeduction, IVariableDeductionRate } from "@nutela/models/compensation/payroll";
import { ISelectOption } from "@nutela/models/core-data";



export interface IVariableDeductionState {
  data: IVariableDeduction[];
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
  formulaList: ISelectOption[],
  paygroupList: ISelectOption[],
  rates: IVariableDeductionRate[],
}

export const initialVariableDeductionState: IVariableDeductionState = {
  data: [],

  payrollProfileList: null,
  transactionUnitList: null,
  groupNameList: null,

  showEditor: false,
  showViewer: false,
  showRateViewer: false,
  showRateEditor: false,
  isProcessing: false,
  isLoading: false,
  currencyList: null,
  formulaList: null,
  paygroupList: null,
  rates: []
}

