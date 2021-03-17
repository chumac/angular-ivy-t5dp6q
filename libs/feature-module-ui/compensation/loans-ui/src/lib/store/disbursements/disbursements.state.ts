import { ISelectOption } from "@nutela/models/core-data";
import { IDisbursed } from "@nutela/models/compensation/loans";

export interface IDisbursementsState {
  disbursementsData: IDisbursed[];
  disbursedData: IDisbursed[];
  loanDefinitions: ISelectOption[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialDisbursementsState: IDisbursementsState =  {
  disbursementsData: null,
  disbursedData: null,
  loanDefinitions: null,
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showViewer: false
}
