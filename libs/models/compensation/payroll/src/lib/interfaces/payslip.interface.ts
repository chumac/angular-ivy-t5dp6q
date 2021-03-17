export interface IPayslip {
  order_rank: number;
  info_type: number;
  label_description: string;
  label_value: string;
  pay_amount: number;
  total_pay_amount: number;
  total_deduction: number;
  net_pay: number;
}
