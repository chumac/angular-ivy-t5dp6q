
export interface ISchedule {
  id: number;
  reference_no: string;
  batch_no: string;
  description: string;
  terminal_id: string;
  account_no: string;
  bank_cbn_code: string;
  bank_description: string;
  account_type: string;
  currency_code: string;
  trans_fee: number;
  is_single_debit: boolean;
  total_beneficiary: number;
  total_value: number;
  value_date: Date;
  expiry_date: Date;
  file_name: string;
  date_submitted: Date;
  approval_status: number;
  status: number;
  status_text: string;
  source: number;
  source_text: string;
  payroll_profile_id: number;
  payroll_profile_text: string;
  payroll_period: Date;
  payroll_source: Date;
  payroll_source_text: string;
  paydesk: string;
  response_code: string;
  response_description: string;
  log_date: Date;
  is_validated: boolean;
}
