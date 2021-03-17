import { ILeaveDailyState } from "../leave-daily";
import { ILeaveApplyState } from "../leave-apply";
import { ILeaveReturnState } from "../leave-return";
import { ILeaveCancelApprovedState } from "../leave-cancel-approved";
import { ILeaveHourlyState } from "../leave-hourly";
import { ILeaveHourlyCancelApprovedState } from "../leave-hourly-cancel-approved";
import { ILeaveDefinitionState, ILeaveProrateState, ILeaveLimitsState, ILeaveDaysState, IPublicHolidayState } from "../setups";
import { ILeaveProxyApplyState } from "../leave-proxy-apply";
import { ILeaveHistoricalState } from "../leave-historical";
import { ILeavePlanState } from "../leave-plan";
import { ILeaveStaggeredState } from "../leave-staggered";
import { IValidLocationState } from "../setups/valid-location";
import { ITimeAttendanceState } from "../time-attendance";

export interface IAbsenceState {
  leaveDaily: ILeaveDailyState;
  leaveApply: ILeaveApplyState;
  leaveProxyApply: ILeaveProxyApplyState;
  leaveHistorical: ILeaveHistoricalState;
  leaveReturn: ILeaveReturnState;
  leaveCancelApproved: ILeaveCancelApprovedState,
  leaveHourly: ILeaveHourlyState;
  leaveHourlyCancelApproved: ILeaveHourlyCancelApprovedState,
  leaveDefinition: ILeaveDefinitionState,
  leaveProrate:ILeaveProrateState,
  leaveLimit:ILeaveLimitsState,
  leaveDays:ILeaveDaysState,
  holiday:IPublicHolidayState,
  leavePlan: ILeavePlanState,
  leaveStaggered: ILeaveStaggeredState;
  validLocation: IValidLocationState;
  timeAttendance: ITimeAttendanceState;
}

export const initialState: IAbsenceState = {
  leaveDaily: null,
  leaveApply: null,
  leaveProxyApply: null,
  leaveHistorical: null,
  leaveReturn: null,
  leaveCancelApproved: null,
  leaveHourly: null,
  leaveHourlyCancelApproved: null,
  leaveDefinition:null,
  leaveProrate:null,
  leaveLimit:null,
  leaveDays:null,
  holiday:null,
  leavePlan: null,
  leaveStaggered: null,
  validLocation: null,
  timeAttendance: null,
};
