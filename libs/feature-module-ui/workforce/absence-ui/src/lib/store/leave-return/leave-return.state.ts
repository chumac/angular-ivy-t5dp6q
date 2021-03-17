import { ILeaveEntitlement, ILeaveDailyData } from "@nutela/models/workforce/leave";

export interface ILeaveReturnState {
  leaveEntitlement: ILeaveEntitlement;
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
}

export const initialLeaveReturnState: ILeaveReturnState = {
  leaveEntitlement: null,
  isLoading: false,
  isProcessing: false,
  showEditor: false,
};
