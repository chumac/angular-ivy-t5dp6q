
export interface IChecklistItem {
  id: number;
  code: string;
  description: string;
  link_to_exit_interview: string;
  summary: string;
  validation_role: number;
  validation_role_text: string;
  option_values: string;
  instructions: string;
  requires_comment: string;
  use_custom_form: boolean;
  form_id: number;
  form_id_text: string;
  is_active: boolean;
  sys_rule: string,
  security_role: number,
  position_id: number,
  workflow_id: number,
  selected_option: string;
  validator_comment: string
}
