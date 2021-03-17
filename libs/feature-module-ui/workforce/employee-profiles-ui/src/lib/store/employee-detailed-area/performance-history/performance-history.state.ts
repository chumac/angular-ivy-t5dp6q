import { IPerformanceHistory } from "@nutela/models/workforce/employee-profiles";

export interface IPerformanceHistoryState {
  approvedData: IPerformanceHistory[];
  awaitingApprovalData: IPerformanceHistory[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialPerformanceHistoryState: IPerformanceHistoryState = {
  approvedData: null,
  awaitingApprovalData: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}