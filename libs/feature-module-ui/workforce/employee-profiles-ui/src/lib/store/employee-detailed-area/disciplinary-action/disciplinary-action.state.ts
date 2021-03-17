import { IDisciplinaryAction } from "@nutela/models/workforce/employee-profiles";

export interface IDisciplinaryActionState {
  approvedData: IDisciplinaryAction[];
  awaitingApprovalData: IDisciplinaryAction[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialDisciplinaryActionState: IDisciplinaryActionState = {
  approvedData: null,
  awaitingApprovalData: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}