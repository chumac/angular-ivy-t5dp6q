
import { IConfirmationTransaction } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export interface IConfirmationState {
  approvedData: IConfirmationTransaction[];
  awaitingApprovalData: IConfirmationTransaction[];
  transctionTypes: ISelectOption[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialConfirmationState: IConfirmationState = {
  approvedData: [],
  awaitingApprovalData: [],
  transctionTypes: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
};
