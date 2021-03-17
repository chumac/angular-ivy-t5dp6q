export interface ISalaryReviewGroup {
  salary_review_id: number;
  code: string;
  description: string;
  effective_date: Date;
  status: number;
  execution_date: Date;
  created_by: string;
  created_date: Date;
  approval_status: number;
  is_active: boolean;
  payroll_profile_id: number;
  payroll_profile_text: string;
  status_text: string;
}
