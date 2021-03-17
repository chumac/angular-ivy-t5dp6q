import { ILeaveEntitlement, ILeaveDailyData } from "@nutela/models/workforce/leave";

export interface ILeaveDailyState {
  leaveEntitlements: ILeaveEntitlement[];
  approvedData: ILeaveDailyData[];
  awaitingApprovalData: ILeaveDailyData[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialLeaveDailyState: ILeaveDailyState = {
  leaveEntitlements: [],
  approvedData: [],
  awaitingApprovalData: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false
};
