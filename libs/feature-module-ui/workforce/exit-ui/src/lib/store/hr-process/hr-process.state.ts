import { IResignationLetter, IProcessStep } from "../../interfaces";


export interface IHrProcessState {
  employeeSubmittedLetter: IResignationLetter;
  processListData: IProcessStep[];
  isLoading: boolean;
  isProcessing: boolean;
  isAdmin: boolean;
  showEditor: boolean;
  finalizeWorkflow: any;
  document: any;
  submitSuccess: boolean;
  checklistTransactions: any;
}

export const initialHrProcessState: IHrProcessState = {
  employeeSubmittedLetter: null,
  processListData: [],
  isLoading: false,
  isProcessing: false,
  isAdmin: false,
  showEditor: false,
  submitSuccess: false,
  document: null,
  finalizeWorkflow: null,
  checklistTransactions: null
};
