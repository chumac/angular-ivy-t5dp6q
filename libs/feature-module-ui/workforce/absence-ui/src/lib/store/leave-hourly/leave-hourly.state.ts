import { ILeaveEntitlement, ILeaveHourlyData } from "@nutela/models/workforce/leave";

export interface ILeaveHourlyState {
  approvedData: ILeaveHourlyData[];
  awaitingApprovalData: ILeaveHourlyData[];
  hourlyLeaveEntitlement: any;
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
}

export const initialLeaveHourlyState: ILeaveHourlyState = {
  approvedData: [],
  awaitingApprovalData: [],
  hourlyLeaveEntitlement: null,
  isLoading: false,
  isProcessing: false,
  showEditor: false
};
