import { ITimeSheetProject } from '@nutela/models/workforce/time-sheet';

export interface ITimeSheetProjectState {
  timeSheetProjectData: ITimeSheetProject[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialTimeSheetProjectState: ITimeSheetProjectState = {
  timeSheetProjectData: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

