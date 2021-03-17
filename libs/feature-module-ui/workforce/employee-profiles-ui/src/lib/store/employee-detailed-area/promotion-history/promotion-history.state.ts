import { IPromotionHistory } from "@nutela/models/workforce/employee-profiles";

export interface IPromotionHistoryState {
  approvedData: IPromotionHistory[];
  awaitingApprovalData: IPromotionHistory[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialPromotionHistoryState: IPromotionHistoryState = {
  approvedData: null,
  awaitingApprovalData: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}