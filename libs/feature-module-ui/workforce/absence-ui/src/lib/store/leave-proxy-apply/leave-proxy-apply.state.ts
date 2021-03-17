import { ILeaveEntitlement, ILeaveDailyData } from "@nutela/models/workforce/leave";
import { IStateSelectOption, ISelectOption } from "@nutela/models/core-data";

export interface ILeaveProxyApplyState {
  approvedData: ILeaveDailyData[];
  awaitingApprovalData: ILeaveDailyData[];
  leaveEntitlement: ILeaveEntitlement;
  stateList: IStateSelectOption[];
  cityList: ISelectOption[];
  isProcessing: boolean;
  isLoading: boolean;
  isProcessingForm: boolean;
  showEditor: boolean;
  showResetEditor: boolean;
  showViewer: boolean;
  showFullForm: boolean;
  leaveEntitlementSubdetail: any[];
}

export const initialLeaveProxyApplyState: ILeaveProxyApplyState = {
  approvedData: [],
  awaitingApprovalData: [],
  leaveEntitlement: null,
  stateList: [],
  cityList: [],
  isProcessing: false,
  isLoading: false,
  isProcessingForm: false,
  showEditor: false,
  showResetEditor: false,
  showViewer: false,
  showFullForm: false,
  leaveEntitlementSubdetail: [],
};
