import { IFixedDeduction } from './fixed-deduction.interface';
import { ICurrency } from './currency.interface';
import { IFormula } from './formula.interface';

export interface IDeductCriteriaConfig {
  fd_criteria_id: number;
  criteria_title: string;
  criteria_sql: string;
  FixedDeductionInfo: IFixedDeduction;
  based_on_paygroup: boolean;
  pay_usedirect_amount: boolean;
  CurrencyInfo: ICurrency;
  pay_amount: number;
  FormulaInfo: IFormula;
  tax_amount: number;
  tax_percent: number;
  min_nontaxable: number;
  temp_or_perm: boolean;
  eff_period_from: Date;
  eff_period_to: Date;
}
