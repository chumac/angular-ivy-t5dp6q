import { ILeaveEntitlement, ILeaveDailyData, ILeaveContactInfo } from "@nutela/models/workforce/leave";

export interface ILeaveDailyState {
  leaveEntitlements: ILeaveEntitlement[];
  approvedData: ILeaveDailyData[];
  awaitingApprovalData: ILeaveDailyData[];
  contactInfo: ILeaveContactInfo;
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialLeaveDailyState: ILeaveDailyState = {
  leaveEntitlements: [],
  approvedData: [],
  awaitingApprovalData: [],
  contactInfo: null,
  isLoading: false,
  isProcessing: false,
  showEditor: false,
  showViewer: false
};
