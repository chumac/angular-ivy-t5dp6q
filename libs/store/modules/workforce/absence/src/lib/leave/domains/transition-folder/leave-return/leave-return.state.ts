import { ILeaveEntitlement, ILeaveDailyData } from "@nutela/models/workforce/leave";

export interface ILeaveReturnState {
  leaveEntitlement: ILeaveEntitlement;
  isProcessing: boolean;
  showEditor: boolean;
}

export const initialLeaveReturnState: ILeaveReturnState = {
  leaveEntitlement: null,
  isProcessing: false,
  showEditor: false,
};
