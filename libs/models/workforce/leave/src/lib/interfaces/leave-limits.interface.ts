import { IGradeInfo } from "./leave-proration.interface";
import { ILeaveInfo } from "./leave-info.interface";

export interface ILeaveLimits {
  limit_id: number;
  leave_id: number;
  grade_id :number;
  limit :number;
  per_time_limit  :number;
  LeaveInfo:ILeaveInfo;
  GradeInfo:IGradeInfo;
}
