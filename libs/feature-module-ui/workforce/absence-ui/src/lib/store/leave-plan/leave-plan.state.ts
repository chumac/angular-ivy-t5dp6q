import { ILeaveDailyData, ILeaveEntitlement } from "@nutela/models/workforce/leave";
import { IStateSelectOption, ISelectOption } from "@nutela/models/core-data";

export interface ILeavePlanState {
  approvedData: ILeaveDailyData[];
  awaitingApprovalData: ILeaveDailyData[];
  isProcessing: boolean;
  isLoading: boolean;
  leaveType: ISelectOption[];
  leaveEntitlement: ILeaveEntitlement;
  leavePlanIdentity: any;
  stateList: IStateSelectOption[];
  cityList: ISelectOption[];
  showEditor: boolean;
  showViewer: boolean;
  showModal: boolean;
  showDetailEditor: boolean;

}

export const initialLeavePlanState: ILeavePlanState = {
  approvedData: [],
  awaitingApprovalData: [],
  leaveType: [],
  leaveEntitlement: null,
  leavePlanIdentity: null,
  stateList: [],
  cityList: [],
  isLoading: false,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  showModal: false,
  showDetailEditor: false,
};
