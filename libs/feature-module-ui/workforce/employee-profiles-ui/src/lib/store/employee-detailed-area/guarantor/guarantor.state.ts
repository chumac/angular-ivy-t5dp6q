
import { IGuarantor } from '@nutela/models/workforce/employee-profiles';

export interface IGuarantorState {
  approvedData: IGuarantor[];
  awaitingApprovalData: IGuarantor[];
  document: any;
  inlineDocument: any;
  approvedPhoto: any;
  awaitingApprovalPhoto: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialGuarantorState: IGuarantorState = {
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

