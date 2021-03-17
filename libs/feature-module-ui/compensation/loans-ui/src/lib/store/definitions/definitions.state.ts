import { ISelectOption } from "@nutela/models/core-data";
import { ILoanDefinition, IPayrollProfileInfo } from "@nutela/models/compensation/loans";


export interface IDefinitionsState {
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  definitionsData: ILoanDefinition[];
  payrollProfilesData: IPayrollProfileInfo[];
  deductionRulesData: ISelectOption[];
  deductionAllowancesData: ISelectOption[];
  intDeductionAllowancesData: ISelectOption[];
  groupNamesData: ISelectOption[];
  amortizationRulesData: ISelectOption[];
  payrollProfileSelect: ISelectOption[];
}

export const initialDefinitionsState: IDefinitionsState = {
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  definitionsData: null,
  payrollProfilesData: null,
  deductionRulesData: null,
  deductionAllowancesData: null,
  intDeductionAllowancesData: null,
  groupNamesData: null,
  amortizationRulesData: null,
  payrollProfileSelect: null
}

