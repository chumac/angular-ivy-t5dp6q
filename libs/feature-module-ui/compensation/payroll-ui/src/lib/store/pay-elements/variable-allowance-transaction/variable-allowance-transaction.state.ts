import { IVariableAllowanceTransaction } from "@nutela/models/compensation/payroll";
import { ISelectOption } from "@nutela/models/core-data";


export interface IVariableAllowanceTransactionState {
  data: IVariableAllowanceTransaction[];
  showEditor:boolean;
  showViewer:boolean;
  variableAllowanceList: ISelectOption[];
  isProcessing: boolean;
  isLoading:boolean;

}

export const initialVariableAllowanceTransactionState: IVariableAllowanceTransactionState = {
  data: [],
  showEditor: false,
  showViewer: false,
  variableAllowanceList: null,
  isProcessing: false,
  isLoading:false,
}

