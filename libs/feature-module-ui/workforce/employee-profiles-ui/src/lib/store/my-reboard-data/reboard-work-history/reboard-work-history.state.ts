
import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';

export interface IReboardWorkHistoryState {
  data: IPreviousEmployer[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialReboardWorkHistoryState: IReboardWorkHistoryState = {
  data: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

