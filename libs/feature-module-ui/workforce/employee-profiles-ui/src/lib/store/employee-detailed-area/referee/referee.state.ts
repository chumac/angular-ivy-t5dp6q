
import { IReferee } from '@nutela/models/workforce/employee-profiles';

export interface IRefereeState {
  approvedData: IReferee[];
  awaitingApprovalData: IReferee[];
  document: any;
  inlineDocument: any;
  approvedPhoto: any;
  awaitingApprovalPhoto: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialRefereeState: IRefereeState = {
  approvedData: [],
  awaitingApprovalData: [],
  document: null,
  inlineDocument: null,
  approvedPhoto: null,
  awaitingApprovalPhoto: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

