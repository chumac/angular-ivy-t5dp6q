import { IResignationLetter, IProcessStep, IChecklistItem } from "../../interfaces";
import { IChecklistTransaction } from "../../interfaces/checklist-transaction.interface";
import { ICustomDataForm } from '@nutela/models/workforce/employee-profiles';


export interface IProcessState {
  submittedLetter: IResignationLetter;
  processListData: IProcessStep[];
  pendingResponses: IProcessStep[];
  isLoading: boolean;
  isProcessing: boolean;
  isProcessingSave: boolean;
  isProcessingRedirect: boolean;
  showPendingResponses: boolean;
  interviewLink: string;
  checklistTypes: IChecklistItem[];
  checklistResponseRow: IChecklistItem[];
  checklistTransactions: IChecklistTransaction[];
  document: any;
  submitSuccess: boolean;
  customFormData: ICustomDataForm;
  employeePhoto: any;
}

export const initialProcessState: IProcessState = {
  submittedLetter: null,
  processListData: [],
  pendingResponses: [],
  isLoading: false,
  isProcessing: false,
  isProcessingSave: false,
  isProcessingRedirect: false,
  showPendingResponses: false,
  interviewLink: null,
  checklistTypes: null,
  checklistResponseRow: null,
  checklistTransactions: null,
  document: null,
  submitSuccess: null,
  customFormData: null,
  employeePhoto: null
};
