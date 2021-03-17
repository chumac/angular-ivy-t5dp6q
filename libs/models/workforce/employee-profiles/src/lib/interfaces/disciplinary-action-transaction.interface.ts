import { IEmployeeStatus } from "./employee-status.interface";
import { IDisciplinaryActionRole } from "./disciplinary-action-role.interface";
import { IDisciplinaryActionInitiate } from "./disciplinary-action-initiate.interface";
import { IDisciplinaryActionType } from "./disciplinary-action-type.interface";

export interface IDisciplinaryActionTransaction {
  daction_id: number;
  event_date: Date;
  h_action: string
  h_action_i: number;
  hr_actual_points_added: number;
  hr_reason_for_difference: string;
  hr_recommendation: string;
  hr_recommendation_id: number;
  is_direct: boolean;
  issue_by_employee: string;
  issue_detail: string;
  issue_to_employee: string;
  issue_to_employee_id: number;
  issued_by_employee_id: number;
  issued_by_role: string;
  issued_by_role_i: number;
  lm_final_remarks: string;
  points_added: number;
  points_total: number;
  previous_points: number;
  sys_recommendation: string;
  x_recommendation_id: number;
  hr_final_points_added: number;
}
