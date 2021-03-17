
export interface IPromotionEdit {
  employee_id: number,
  new_grade_id: number,
  new_paygroup_id: number,
  cur_grade_id: number,
  cur_paygroup_id: number,
  effective_date: Date,
  notes: string,
  action: number,
  status: number,
  update_last_promo_date: boolean,
  is_payroll_processed: boolean,
  process_differential:boolean,
  p_diff_quarterly: boolean,
  p_diff_halfyear: boolean,
  p_diff_year: boolean,
  batch_id: string,
  rev_record : number,
  p_diff_triquart: boolean
}
