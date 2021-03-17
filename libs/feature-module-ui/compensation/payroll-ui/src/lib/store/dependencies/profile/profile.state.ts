import { IProfile } from "@nutela/models/compensation/payroll";
import { ISelectOption } from "@nutela/models/core-data";



export interface IProfileState {
  data: IProfile[];
  showEditor: boolean;
  showViewer: boolean;
  showTree: boolean;
  isProcessing: boolean;
  isLoading: boolean;
  isLoadingForm: boolean;
  daysData: ISelectOption[];
  taxOptionData: ISelectOption[];
  taxModeData: ISelectOption[];
  taxRuleData: ISelectOption[];
  paymentCurrencyData: ISelectOption[];
  payPeriodData: ISelectOption[];
  enterpriseStructures: ISelectOption[];
  structureDetails: ISelectOption[];
  costCenterData: ISelectOption[];
  fixedDeductionData: ISelectOption[];
  coinageRoundingData: ISelectOption[];
  upfrontTreatmentData: ISelectOption[];
  periodicProrationData: ISelectOption[];
  allowNegativePay: ISelectOption[];
  runCycle: ISelectOption[];
  securityRoles: ISelectOption[];
  canUpdateSecurityGroup: any;
  payrollSelectOption: ISelectOption[];
  hasProfileAdminRole: boolean;
}

export const initialProfileState: IProfileState = {
  data: [],
  showEditor: false,
  showViewer: false,
  showTree: false,
  isProcessing: false,
  isLoading: false,
  isLoadingForm: false,
  daysData: null,
  taxOptionData: null,
  taxModeData: null,
  taxRuleData: null,
  paymentCurrencyData: null,
  payPeriodData: null,
  enterpriseStructures: null,
  structureDetails: null,
  costCenterData: null,
  fixedDeductionData: null,
  coinageRoundingData: null,
  upfrontTreatmentData: null,
  periodicProrationData: null,
  allowNegativePay: null,
  runCycle: null,
  securityRoles: null,
  canUpdateSecurityGroup: null,
  payrollSelectOption: null,
  hasProfileAdminRole: true
}

