import { IFixedDeduction, IFixedDeductionPaygroupRate, IFixedDeductionEmployeeRate, IFixedDeductionRate } from "@nutela/models/compensation/payroll";
import { ISelectOption } from "@nutela/models/core-data";



export interface IFixedDeductionState {

  showEditor: boolean;
  showViewer: boolean;
  showGlobalViewer: boolean;
  isProcessing: boolean;
  isLoading: boolean;
  showRateEditor: boolean;
  showConfigureEditor: boolean;
  showEmployeeRateViewer: boolean;
  showPaygroupRateViewer: boolean;
  isProcessingItemCheck: boolean;

  data: IFixedDeduction[];
  paygroupRates: IFixedDeductionPaygroupRate[];
  employeeRates: IFixedDeductionEmployeeRate[];
  globalRates: IFixedDeductionRate[];
  deductItemTypes: ISelectOption[];
  filteredData: IFixedDeduction[];

  currencyList: ISelectOption[];
  deductFormulaList: ISelectOption[];
  payrollProfileList: ISelectOption[];
  eligibilityList: ISelectOption[];
  monthList: ISelectOption[];
  payrollTypes: ISelectOption[];
  groupList: ISelectOption[];
  deductionList: ISelectOption[];
  prorationDateList: ISelectOption[];
  paygroupList: ISelectOption[];

  payFrequencies: any[];
  criteriaConfiguration: any;
  criteriaCheck: any;
  employeeRateChartCheck: any[];
  paygroupRateChartCheck: any[];
}

export const initialFixedDeductionState: IFixedDeductionState = {

  showEditor: false,
  showViewer: false,
  showGlobalViewer: false,
  isProcessing: false,
  isLoading: false,
  showRateEditor: false,
  showConfigureEditor: false,
  showEmployeeRateViewer: false,
  showPaygroupRateViewer: false,
  isProcessingItemCheck: false,

  data: [],
  paygroupRates: [],
  employeeRates: [],
  globalRates: [],
  deductItemTypes: [],
  filteredData: [],

  currencyList: [],
  deductFormulaList: [],
  payrollProfileList: [],
  monthList: [],
  eligibilityList: [],
  payrollTypes: [],
  groupList: [],
  deductionList: [],
  prorationDateList: [],
  paygroupList: [],

  payFrequencies: [],
  criteriaConfiguration: null,
  criteriaCheck: null,
  employeeRateChartCheck: null,
  paygroupRateChartCheck: null,
}

