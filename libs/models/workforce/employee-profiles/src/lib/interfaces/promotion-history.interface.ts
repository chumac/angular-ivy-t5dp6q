export interface IPromotionHistory {
  employee_id: number;
  employee_name: string;
  current_grade: string;
  new_grade: string;
  current_paygroup: string;
  new_paygroup: string;
  effective_date?: Date;
  notes: string;
  position: string;
  is_closed: string;
  is_effected: string;
  status: string;
  action: string;
  is_payroll_processed: string;
  process_differential: string;
  process_differential_quarterly: string;
  process_differential_halfyear: string;
  process_differential_yearly: string;
  process_differential_triquart: string;
  batch_id: string;
}