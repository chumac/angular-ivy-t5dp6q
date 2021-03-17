import { ILeaveInfo } from "./leave-info.interface";
import { IPersonal } from "@nutela/models/workforce/employee-profiles";

export interface ILeaveHourlyData {
  leave_id?: number;
  leave_trans_id?: number;
  request_date?: Date;
  no_of_hours?: number;
  is_paid?: boolean;
  leave_reason?: string;
  backup_officer_id?: number;
  supervisor_id?: number;
  standard_hour: number;
  status: number;
  approval_status: number;
  cancel_comment: string,
  cancel_approval_status: number,
  LeaveInfo?: ILeaveInfo;
  EmployeeInfo?: IPersonal;
  SupervisorInfo?: IPersonal;
  AssignedBackupInfo?: IPersonal;
  entitlementHourly?: string;
}
