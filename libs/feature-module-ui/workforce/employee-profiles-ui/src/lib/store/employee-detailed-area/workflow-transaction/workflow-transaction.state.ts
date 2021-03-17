import { IWorkflowTransaction } from "@nutela/models/workforce/employee-profiles";

export interface IWorkflowTransactionState {
  approvedData: IWorkflowTransaction[];
  awaitingApprovalData: IWorkflowTransaction[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialWorkflowTransactionState: IWorkflowTransactionState = {
  approvedData: null,
  awaitingApprovalData: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}