import { LeaveDailyEffects } from "../leave-daily";
import { LeaveApplyEffects } from "../leave-apply";
import { LeaveProxyApplyEffects } from "../leave-proxy-apply";
import { LeaveHistoricalEffects } from "../leave-historical";
import { LeavePlanEffects } from "../leave-plan";
import { LeaveStaggeredEffects } from "../leave-staggered";
import { LeaveReturnEffects } from "../leave-return";
import { LeaveCancelApprovedEffects } from "../leave-cancel-approved";
import { LeaveCancelAwaitingApprovalEffects } from "../leave-cancel-awaiting-approval";
import { LeaveHourlyEffects } from "../leave-hourly";
import { LeaveHourlyCancelApprovedEffects } from "../leave-hourly-cancel-approved";
import { LeaveHourlyCancelAwaitingApprovalEffects } from "../leave-hourly-cancel-awaiting-approval";
import { LeaveDefinitionEffects, LeaveProrateEffects, LeaveLimitsEffects, LeaveDaysEffects, PublicHolidayEffects } from "../setups";
import { ValidLocationEffects } from "../setups/valid-location";
import { TimeAttendanceEffects } from "../time-attendance";

export const absenceEffects = [
  LeaveDailyEffects,
  LeaveApplyEffects,
  LeaveProxyApplyEffects,
  LeaveHistoricalEffects,
  LeavePlanEffects,
  LeaveStaggeredEffects,
  LeaveReturnEffects,
  LeaveCancelApprovedEffects,
  LeaveCancelAwaitingApprovalEffects,
  LeaveHourlyEffects,
  LeaveHourlyCancelApprovedEffects,
  LeaveHourlyCancelAwaitingApprovalEffects,
  LeaveDefinitionEffects,
  LeaveProrateEffects,
  LeaveLimitsEffects,
  LeaveDaysEffects,
  PublicHolidayEffects,
  ValidLocationEffects,
  TimeAttendanceEffects
];
