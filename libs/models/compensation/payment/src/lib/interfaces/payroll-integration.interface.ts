export interface IPayrollIntegration {
  id: number;
  x_months: number;
  x_months_text: string;
  x_year: number;
  payroll_profile_id: number;
  payroll_profile_id_text: string;
  status: number;
  status_text: string;
  session_id: string;
  total_records: number;
  format: number;
  format_text: string;
  source: number;
  source_text: string;
  custom_rule: string;
  start_runtime: Date;
  end_runtime: Date;
}
