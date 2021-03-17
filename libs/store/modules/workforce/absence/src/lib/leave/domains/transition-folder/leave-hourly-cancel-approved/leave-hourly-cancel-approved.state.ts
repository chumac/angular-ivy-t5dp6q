import { ILeaveEntitlement, ILeaveHourlyData } from "@nutela/models/workforce/leave";

export interface ILeaveHourlyCancelApprovedState {
  isProcessing: boolean;
  showEditor: boolean;
}

export const initialLeaveHourlyCancelApprovedState: ILeaveHourlyCancelApprovedState = {
  isProcessing: false,
  showEditor: false,
};
