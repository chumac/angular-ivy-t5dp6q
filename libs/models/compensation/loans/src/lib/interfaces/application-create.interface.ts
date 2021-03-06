export interface IApplicationCreate {
  loan_id: number,
  currency_id: number,
  loan_amount: number,
  effective_date: Date,
  monthly_deduction: number,
  interest_rate: number,
  tenor_years: number,
  tenor_months: number,
  tenor_days: number,
  narration: string,
  moratorium: number,
  original_effective_date: Date,
  adjusted_effective_date: Date,
  is_proxy: boolean,
  proxy_user: string,
  proxy_date: Date,
  doc_extension: string,
  doc_binary: string,
  doc_url: string,
  doc_guid: string,
  doc_size: number
}
