
export interface IReviewWorkflowProcess {
  workflow_process_id: number;
  employee_id: number;
  employee_name: string;
  reviewer_id: number;
  reviewer_name: string;
  role: number;
  role_type: string;
  plan_id: number;
  plan_description: string;
  period_end_date: Date;
  period_start_date: Date;
  review_end_date: Date;
  review_start_date: Date;
  status: number;
  status_text: string;
  score: number;
  workflow_id: number;
  submitted_date: Date;
  exit_date: Date;
  step: number;
  is_rerouted: boolean;
  in_edit_mode : boolean;
  flag: boolean; // Indicates if employee accepted or rejected Line manager review.
  allow_recommendation: boolean;

  employee_number: string;
  emp_fullname: string;
  reviewer_fullname: string;
}
