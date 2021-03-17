export interface IScheduleDetail {
  id: number;
  intpay_master_id: number;
  payment_ref: string;
  id_number: string;
  number: string;
  surname: string;
  othername: string;
  fullname: string;
  mobile_number: string;
  email: string;
  account_no: string;
  bank_cbn_code: string;
  bank_description: string;
  account_type: string;
  is_prepaidload: boolean;
  confidential: boolean;
  narration: string;
  currency_code: string;
  actual_amount: number;
  payable_amount: number;
  paid: boolean;
  response_code: string;
  response_description: string;
  batch_no: string;
  log_date: Date;
}
