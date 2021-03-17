import { ITransferHistory } from "@nutela/models/workforce/employee-profiles";

export interface ITransferHistoryState {
  approvedData: ITransferHistory[];
  awaitingApprovalData: ITransferHistory[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialTransferHistoryState: ITransferHistoryState = {
  approvedData: null,
  awaitingApprovalData: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}