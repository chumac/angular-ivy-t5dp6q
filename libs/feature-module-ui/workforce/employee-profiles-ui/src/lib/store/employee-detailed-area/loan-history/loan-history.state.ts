import { ILoanHistory } from "@nutela/models/workforce/employee-profiles";

export interface ILoanHistoryState {
  approvedData: ILoanHistory[];
  awaitingApprovalData: ILoanHistory[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialLoanHistoryState: ILoanHistoryState = {
  approvedData: null,
  awaitingApprovalData: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}