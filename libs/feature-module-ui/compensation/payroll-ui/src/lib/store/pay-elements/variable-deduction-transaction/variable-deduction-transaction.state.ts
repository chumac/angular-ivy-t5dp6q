import { IVariableDeductionTransaction } from "@nutela/models/compensation/payroll";
import { ISelectOption } from "@nutela/models/core-data";



export interface IVariableDeductionTransactionState {
  data: IVariableDeductionTransaction[];
  showEditor: boolean;
  showViewer: boolean;
  variableDeductionList: ISelectOption[];
  isProcessing: boolean;
  isLoading: boolean;

}

export const initialVariableDeductionTransactionState: IVariableDeductionTransactionState = {
  data: [],
  showEditor: false,
  showViewer: false,
  variableDeductionList: null,
  isProcessing: false,
  isLoading:false,
}

