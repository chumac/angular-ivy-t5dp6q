import { ILeaveEntitlement, ILeaveDailyData } from "@nutela/models/workforce/leave";

export interface ILeaveCancelApprovedState {
  isProcessing: boolean;
  showEditor: boolean;
}

export const initialLeaveCancelApprovedState: ILeaveCancelApprovedState = {
  isProcessing: false,
  showEditor: false,
};
