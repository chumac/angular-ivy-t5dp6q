import { ActionReducerMap } from "@ngrx/store";

import { IAbsenceState } from "./absence.state";
import { leaveDailyReducer } from "../leave-daily";
import { leaveApplyReducer } from "../leave-apply";
import { leaveProxyApplyReducer } from "../leave-proxy-apply";
import { leaveHistoricalReducer } from "../leave-historical";
import { leavePlanReducer } from "../leave-plan";
import { leaveStaggeredReducer } from "../leave-staggered";
import { leaveReturnReducer } from "../leave-return";
import { leaveHourlyReducer } from "../leave-hourly";
import { leaveHourlyCancelApprovedReducer } from "../leave-hourly-cancel-approved";
import { leaveCancelApprovedReducer } from "../leave-cancel-approved/leave-cancel-approved.reducer";
import { leaveDefinitionReducer, leaveProrateReducer, leaveLimitsReducer, leaveDaysReducer, publicHolidayReducer } from "../setups";
import { validLocationReducer } from "../setups/valid-location";
import { timeAttendanceReducer } from "../time-attendance";


export const absenceReducer: ActionReducerMap<IAbsenceState> = {
  leaveDaily: leaveDailyReducer,
  leaveApply: leaveApplyReducer,
  leaveProxyApply: leaveProxyApplyReducer,
  leaveHistorical: leaveHistoricalReducer,
  leaveReturn: leaveReturnReducer,
  leaveCancelApproved: leaveCancelApprovedReducer,
  leaveHourly: leaveHourlyReducer,
  leaveHourlyCancelApproved: leaveHourlyCancelApprovedReducer,
  leaveDefinition:leaveDefinitionReducer,
  leaveProrate:leaveProrateReducer,
  leaveLimit: leaveLimitsReducer,
  leaveDays:leaveDaysReducer,
  holiday:publicHolidayReducer,
  leavePlan: leavePlanReducer,
  leaveStaggered: leaveStaggeredReducer,
  validLocation: validLocationReducer,
  timeAttendance: timeAttendanceReducer,
};
