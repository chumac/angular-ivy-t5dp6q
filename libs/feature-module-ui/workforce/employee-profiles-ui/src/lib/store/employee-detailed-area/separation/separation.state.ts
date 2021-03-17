import { ISeparation } from "@nutela/models/workforce/employee-profiles";

export interface ISeparationState {
  approvedData: ISeparation[];
  awaitingApprovalData: ISeparation[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialSeparationState: ISeparationState = {
  approvedData: null,
  awaitingApprovalData: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}