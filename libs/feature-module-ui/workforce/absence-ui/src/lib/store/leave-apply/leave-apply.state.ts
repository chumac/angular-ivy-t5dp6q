import { ILeaveEntitlement, ILeaveDailyData } from "@nutela/models/workforce/leave";
import { IStateSelectOption, ISelectOption } from "@nutela/models/core-data";

export interface ILeaveApplyState {
  approvedData: ILeaveDailyData[];
  awaitingApprovalData: ILeaveDailyData[];
  leaveEntitlement: ILeaveEntitlement;
  stateList: IStateSelectOption[];
  cityList: ISelectOption[];
  isProcessing: boolean;
  isProcessingForm: boolean;
  showEditor: boolean;
  showFullForm: boolean;
  leaveEntitlementSubdetail: any[];
}

export const initialLeaveApplyState: ILeaveApplyState = {
  approvedData: [],
  awaitingApprovalData: [],
  leaveEntitlement: null,
  stateList: [],
  cityList: [],
  isProcessing: false,
  isProcessingForm: false,
  showEditor: false,
  showFullForm: false,
  leaveEntitlementSubdetail: [],
};
