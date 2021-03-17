export interface IVacationHistory {
  employee_id: number;
  leave_type: string;
  transaction_date?: Date;
  start_date?: Date;
  end_date?: Date;
  resumption_date?: Date;
  number_of_days?: number;
  has_returned: string;
  address: string;
  telephone_no: string;
  emergency_no: string;
  reports_to: string;
  pay_allowance: string;
  return_reason: string;
  leave_reason: string;
}