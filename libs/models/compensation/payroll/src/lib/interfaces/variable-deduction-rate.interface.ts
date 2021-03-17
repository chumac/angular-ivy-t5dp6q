export interface IVariableDeductionRate {
  vdeductgrprate_id?: number;
  vardeduction_id: number;
  vardeduction_id_text: string;
  paygroup_id: number;
  paygroup_id_text: string;
  currency_id: number;
  currency_id_text: string;
  usedirect_amount: boolean;
  direct_amount: number;
  formula_id: number;
  formula_id_text: string;
  relief_amount: number;
  relief_percent: number;
  approval_status: number;
}
