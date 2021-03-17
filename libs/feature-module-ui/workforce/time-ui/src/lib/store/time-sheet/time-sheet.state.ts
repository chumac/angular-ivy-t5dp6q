import { ITimeSheetData, IDayStreamData, ITimeSheetProject } from "@nutela/models/workforce/time-sheet";

export interface ITimeSheetState {
  approvedData: ITimeSheetData[];
  awaitingApprovalData: ITimeSheetData[];
  dayStreamData: IDayStreamData[];
  projects: ITimeSheetProject[];
  isProcessing: boolean;
  isLoading: boolean;
  isLoadingDayStream: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialTimeSheetState: ITimeSheetState = {
  approvedData: [],
  dayStreamData: [],
  awaitingApprovalData: [],
  projects: [],
  isLoading: false,
  isLoadingDayStream: false,
  isProcessing: false,
  showEditor: false,
  showViewer: false
};
