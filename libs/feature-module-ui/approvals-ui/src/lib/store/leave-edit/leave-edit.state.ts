import { ILeaveDailyData } from "@nutela/models/workforce/leave";

export interface ILeaveEditState {
  data: ILeaveDailyData;
  isProcessing: boolean;
  showEditor: boolean;
}

export const initialLeaveEditState: ILeaveEditState =  {
  data: null,
  isProcessing: false,
  showEditor: false
}
