import { IFixedAllowance, IFixedAllowanceRate, IFixedAllowancePaygroupRate, IFixedAllowanceEmployeeRate } from "@nutela/models/compensation/payroll";
import { ISelectOption } from "@nutela/models/core-data";

export interface IFixedAllowanceState {
  showEditor:boolean;
  showViewer:boolean;
  isProcessing: boolean;
  isLoading:boolean;
  showRateEditor:boolean;
  showEmployeeRateViewer:boolean;
  showPaygroupRateViewer:boolean;
  showGlobalRateViewer:boolean;
  showConfigureEditor: boolean;
  isProcessingItemCheck: boolean;

  data: IFixedAllowance[];
  filteredData: IFixedAllowance[];
  paygroupRates: IFixedAllowancePaygroupRate[];
  employeeRates: IFixedAllowanceEmployeeRate[];
  globalRates: IFixedAllowanceRate[];

  payItemTypes: ISelectOption[];
  currencyList: ISelectOption[];
  payFormulaList: ISelectOption[];
  payrollProfileList: ISelectOption[];
  monthList: ISelectOption[];
  eligibilityList: ISelectOption[];
  payrollTypes: ISelectOption[];
  groupList: ISelectOption[];
  allowanceList: ISelectOption[];
  prorationDateList: ISelectOption[];
  paygroupList: ISelectOption[];

  payFrequencies: any[];
  employeeRateChartCheck: any[];
  paygroupRateChartCheck: any[];
  criteriaConfiguration: any;
  criteriaCheck: any;
}

export const initialFixedAllowanceState: IFixedAllowanceState = {
  showEditor: false,
  showViewer: false,
  isProcessing: false,
  isLoading:false,
  showRateEditor: false,
  showEmployeeRateViewer: false,
  showPaygroupRateViewer: false,
  showGlobalRateViewer: false,
  showConfigureEditor: false,
  isProcessingItemCheck: false,

  data: [],
  filteredData: [],
  paygroupRates: [],
  employeeRates: [],
  globalRates: [],
  payItemTypes: [],

  allowanceList: [],
  currencyList: [],
  eligibilityList: [],
  groupList: [],
  monthList: [],
  payFormulaList: [],
  paygroupList: [],
  payrollProfileList: [],
  payrollTypes: [],
  prorationDateList: [],

  payFrequencies: [],
  employeeRateChartCheck: null,
  paygroupRateChartCheck: null,
  criteriaConfiguration: null,
  criteriaCheck: null,
}

