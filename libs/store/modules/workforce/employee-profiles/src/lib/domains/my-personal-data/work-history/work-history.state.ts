
import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';

export interface IWorkHistoryState {
  approvedData: IPreviousEmployer[];
  awaitingApprovalData: IPreviousEmployer[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialWorkHistoryState: IWorkHistoryState = {
  approvedData: [],
  awaitingApprovalData: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

