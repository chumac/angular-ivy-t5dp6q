import { ILeaveEntitlement, ILeaveHourlyData } from "@nutela/models/workforce/leave";

export interface ILeaveHourlyState {
  approvedData: ILeaveHourlyData[];
  awaitingApprovalData: ILeaveHourlyData[];
  hourlyLeaveEntitlement: any;
  isProcessing: boolean;
  showEditor: boolean;
}

export const initialLeaveHourlyState: ILeaveHourlyState = {
  approvedData: [],
  awaitingApprovalData: [],
  hourlyLeaveEntitlement: null,
  isProcessing: false,
  showEditor: false
};
