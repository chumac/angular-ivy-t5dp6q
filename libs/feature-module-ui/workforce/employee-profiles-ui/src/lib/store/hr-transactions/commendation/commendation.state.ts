
import { ICommendationTransaction } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export interface ICommendationState {
  approvedData: ICommendationTransaction[];
  awaitingApprovalData: ICommendationTransaction[];
  roleTypes: ISelectOption[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialCommendationState: ICommendationState = {
  approvedData: [],
  awaitingApprovalData: [],
  roleTypes: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
};
