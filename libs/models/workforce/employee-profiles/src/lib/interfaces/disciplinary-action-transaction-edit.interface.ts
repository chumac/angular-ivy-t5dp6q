import { IEmployeeStatus } from "./employee-status.interface";
import { IDisciplinaryActionRole } from "./disciplinary-action-role.interface";
import { IDisciplinaryActionInitiate } from "./disciplinary-action-initiate.interface";
import { IDisciplinaryActionType } from "./disciplinary-action-type.interface";

export interface IDisciplinaryActionTransactionEdit {
  issued_to_employee_id: number,
  issued_by_role: number,
  issued_by_employee_id: number,
  issue_detail: string,
  event_date: Date,
  h_action: number,
  h_recommendation_id: number,
  x_recommendation_id: number,
  h_reason_for_difference: string
}
