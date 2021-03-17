import { IEmployeeSummary } from "@nutela/models/workforce/employee-profiles";

export interface IChecklistTransaction {
  checklist_trans_id: number;
  checklist_id: number;
  resignation_id: number;
  is_validated: string;
  validated_by: string;
  validation_date: Date;
  validator_comment: string;
  request_comment: string;
  validator_guid: string;
  option_values: string;
  instructions: string;
  requires_comment: string;
  use_custom_form: boolean;
  form_id: number;
  form_id_text: string;
  description: string;
  summary: string;
  is_active: boolean;
  employee_name: string;
  employee_id: number;
  validation_role: number;
  validation_role_text: string;
  selected_option: string;
  security_role: string;
  position: string;
  workflow: string;

}
