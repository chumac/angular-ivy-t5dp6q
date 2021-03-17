export interface ISalaryReviewPlanDetail {
  all_affected_text: string
  allowance_affected: number
  auto_execute: boolean
  code: string
  deduct_affected_text: string
  deduction_affected: number;
  description: string;
  effective_date: Date;
  egibility_rule: number;
  egibility_rule_text: string;
  execution_date: Date
  g_allow_review_rule: number;
  g_allow_rule_text: string;
  g_deduct_review_rule: number;
  g_deduct_rule_text: string;
  payroll_profile_id: number;
  payroll_profile_text: string;
  rule_value_allowance: number;
  rule_value_deduction: number;
  salary_review_group_id: number;
  salary_review_group_text: string;
  salary_review_id: number;
  status: number;
  status_text: string;
}
