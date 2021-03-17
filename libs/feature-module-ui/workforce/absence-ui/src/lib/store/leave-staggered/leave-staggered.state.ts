import { ILeaveDailyData, ILeaveEntitlement } from "@nutela/models/workforce/leave";
import { IStateSelectOption, ISelectOption } from "@nutela/models/core-data";

export interface ILeaveStaggeredState {
  approvedData: ILeaveDailyData[];
  awaitingApprovalData: ILeaveDailyData[];
  isProcessing: boolean;
  isLoading: boolean;
  leaveType: ISelectOption[];
  leaveEntitlement: ILeaveEntitlement;
  leaveStaggeredIdentity: any;
  currencyList: ISelectOption[];
  stateList: IStateSelectOption[];
  cityList: ISelectOption[];
  showEditor: boolean;
  showViewer: boolean;
  showModal: boolean;
  showDetailEditor: boolean; 

}

export const initialLeaveStaggeredState: ILeaveStaggeredState = {
  approvedData: [],
  awaitingApprovalData: [],
  leaveEntitlement: null,
  leaveType: [],
  leaveStaggeredIdentity: null,
  currencyList: null,
  stateList: [],
  cityList: [],
  isLoading: false,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  showModal: false,
  showDetailEditor: false,
};
