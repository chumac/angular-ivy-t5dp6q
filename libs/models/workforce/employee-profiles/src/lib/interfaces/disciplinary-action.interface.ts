export interface IDisciplinaryAction {
  issue_to_employee_id: number;
  issue_by_employee: string;
  previous_points: number;
  points_added: number;
  points_total:number;
  hr_actual_points_added: number;
  issue_detail:string;
  event_date: Date;
  sys_recommendation: string;
  lm_final_remarks: string;
  h_action: string;
  hr_recommendation: string;
  hr_reason_for_difference: string;
  is_direct: string;
  issued_by_role: string;
  daction_id: number;
  issue_by_employee_id: number;
  issue_to_employee: string;
}
