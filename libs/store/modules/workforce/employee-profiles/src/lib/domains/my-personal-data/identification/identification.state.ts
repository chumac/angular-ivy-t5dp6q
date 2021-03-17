
import { IIdentification } from '@nutela/models/workforce/employee-profiles';

export interface IIdentificationState {
  approvedData: IIdentification;
  awaitingApprovalData: IIdentification;
  signature: any;
  awaitingApprovalSignature: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialIdentificationState: IIdentificationState =  {
  approvedData: null,
  awaitingApprovalData: null,
  signature: null,
  awaitingApprovalSignature: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}
