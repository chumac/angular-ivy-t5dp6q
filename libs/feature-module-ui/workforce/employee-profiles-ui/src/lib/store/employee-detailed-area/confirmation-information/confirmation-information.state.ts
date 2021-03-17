import { IConfirmationInformation } from "@nutela/models/workforce/employee-profiles";

export interface IConfirmationInformationState {
  approvedData: IConfirmationInformation[];
  awaitingApprovalData: IConfirmationInformation[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialConfirmationInformationState: IConfirmationInformationState = {
  approvedData: null,
  awaitingApprovalData: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}