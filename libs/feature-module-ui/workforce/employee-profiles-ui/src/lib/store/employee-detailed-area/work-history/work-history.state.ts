
import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';

export interface IHRWorkHistoryState {
  approvedData: IPreviousEmployer[];
  awaitingApprovalData: IPreviousEmployer[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialHRWorkHistoryState: IHRWorkHistoryState = {
  approvedData: [],
  awaitingApprovalData: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

