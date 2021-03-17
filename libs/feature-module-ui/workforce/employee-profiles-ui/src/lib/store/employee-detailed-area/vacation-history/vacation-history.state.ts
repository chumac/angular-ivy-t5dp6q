import { IVacationHistory } from "@nutela/models/workforce/employee-profiles";

export interface IVacationHistoryState {
  approvedData: IVacationHistory[];
  awaitingApprovalData: IVacationHistory[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialVacationHistoryState: IVacationHistoryState = {
  approvedData: null,
  awaitingApprovalData: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}