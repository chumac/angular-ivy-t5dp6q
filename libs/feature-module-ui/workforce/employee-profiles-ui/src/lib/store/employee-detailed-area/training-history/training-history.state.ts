import { ITrainingHistory } from "@nutela/models/workforce/employee-profiles";

export interface ITrainingHistoryState {
  approvedData: ITrainingHistory[];
  awaitingApprovalData: ITrainingHistory[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialTrainingHistoryState: ITrainingHistoryState = {
  approvedData: null,
  awaitingApprovalData: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}