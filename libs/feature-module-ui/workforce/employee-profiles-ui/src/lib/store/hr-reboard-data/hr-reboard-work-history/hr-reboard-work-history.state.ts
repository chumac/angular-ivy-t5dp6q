
import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';

export interface IHrReboardWorkHistoryState {
  data: IPreviousEmployer[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialHrReboardWorkHistoryState: IHrReboardWorkHistoryState = {
  data: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

