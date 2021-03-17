import { initialFixedDeductionState, IFixedDeductionState } from './fixed-deduction.state';
import { FixedDeductionActions, FixedDeductionActionTypes } from './fixed-deduction.actions';

export function fixedDeductionReducer(
  state = initialFixedDeductionState,
  action: FixedDeductionActions
): IFixedDeductionState {
  switch (action.type) {
    case FixedDeductionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case FixedDeductionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case FixedDeductionActionTypes.SHOW_RATE_EDITOR:
      return { ...state, showRateEditor: true };
    case FixedDeductionActionTypes.HIDE_RATE_EDITOR:
      return { ...state, showRateEditor: false };
    case FixedDeductionActionTypes.SHOW_CONFIGURE_EDITOR:
      return { ...state, showConfigureEditor: true };
    case FixedDeductionActionTypes.HIDE_CONFIGURE_EDITOR:
      return { ...state, showConfigureEditor: false };
    case FixedDeductionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case FixedDeductionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case FixedDeductionActionTypes.SHOW_EMPLOYEE_RATE_VIEWER:
      return { ...state, showEmployeeRateViewer: true };
    case FixedDeductionActionTypes.HIDE_EMPLOYEE_RATE_VIEWER:
      return { ...state, showEmployeeRateViewer: false };
    case FixedDeductionActionTypes.SHOW_PAYGROUP_RATE_VIEWER:
      return { ...state, showPaygroupRateViewer: true };
    case FixedDeductionActionTypes.HIDE_PAYGROUP_RATE_VIEWER:
      return { ...state, showPaygroupRateViewer: false };
    case FixedDeductionActionTypes.SHOW_GLOBAL_RATE_VIEWER:
      return { ...state, showGlobalViewer: true };
    case FixedDeductionActionTypes.HIDE_GLOBAL_RATE_VIEWER:
      return { ...state, showGlobalViewer: false };
    case FixedDeductionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case FixedDeductionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case FixedDeductionActionTypes.LOADING:
      return { ...state, isLoading: true };
    case FixedDeductionActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case FixedDeductionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case FixedDeductionActionTypes.LOAD_CURRENCY_LIST_SUCCESS:
      return { ...state, currencyList: action.payload };
    case FixedDeductionActionTypes.LOAD_DEDUCT_FORMULA_LIST_SUCCESS:
      return { ...state, deductFormulaList: action.payload };
    case FixedDeductionActionTypes.LOAD_PAYROLL_PROFILE_LIST_SUCCESS:
      return { ...state, payrollProfileList: action.payload };
    case FixedDeductionActionTypes.LOAD_PAYMENT_ITEM_TYPES_SUCCESS:
      return { ...state, deductItemTypes: action.payload };
    case FixedDeductionActionTypes.LOAD_PAYMENT_FREQUENCY_LIST_SUCCESS:
      return { ...state, payFrequencies: action.payload };
    case FixedDeductionActionTypes.LOAD_MONTH_LIST_SUCCESS:
      return { ...state, monthList: action.payload };
    case FixedDeductionActionTypes.LOAD_ELIGIBILITY_LIST_SUCCESS:
      return { ...state, eligibilityList: action.payload };
    case FixedDeductionActionTypes.LOAD_PAYROLL_TYPE_LIST_SUCCESS:
      return { ...state, payrollTypes: action.payload };
    case FixedDeductionActionTypes.LOAD_GROUP_LIST_SUCCESS:
      return { ...state, groupList: action.payload };
    case FixedDeductionActionTypes.LOAD_DEDUCTION_LIST_SUCCESS:
      return { ...state, deductionList: action.payload };
    case FixedDeductionActionTypes.LOAD_PRORATION_DATE_TYPE_LIST_SUCCESS:
      return { ...state, prorationDateList: action.payload };
    case FixedDeductionActionTypes.LOAD_PAYGROUP_LIST_SUCCESS:
      return { ...state, paygroupList: action.payload };
    case FixedDeductionActionTypes.LOAD_PAYGROUP_RATES_FIXED_DEDUCTION_SUCCESS:
      return { ...state, paygroupRates: action.payload };
    case FixedDeductionActionTypes.LOAD_EMPLOYEE_RATES_FIXED_DEDUCTION_SUCCESS:
      return { ...state, employeeRates: action.payload };
    case FixedDeductionActionTypes.LOAD_GLOBAL_RATES_FIXED_DEDUCTION_SUCCESS:
      return { ...state, globalRates: action.payload };
    case FixedDeductionActionTypes.LOAD_CRITERIA_CONFIGURATION_CHECK_FIXED_DEDUCTION_SUCCESS:
      return { ...state, criteriaCheck: action.payload };
    case FixedDeductionActionTypes.LOAD_DATA_CRITERIA_CONFIGURATION_FIXED_DEDUCTION_SUCCESS:
      return { ...state, criteriaConfiguration: action.payload };
    case FixedDeductionActionTypes.PROCESSING_RATE_CHART_CHECK_FIXED_DEDUCTION:
      return { ...state, isProcessingItemCheck: action.payload };
    case FixedDeductionActionTypes.EMPLOYEE_RATE_CHART_CHECK_FIXED_DEDUCTION_SUCCESS:
      return { ...state, employeeRateChartCheck: action.payload };
    case FixedDeductionActionTypes.PAYGROUP_RATE_CHART_CHECK_FIXED_DEDUCTION_SUCCESS:
      return { ...state, paygroupRateChartCheck: action.payload };
    default: {
      return state;
    }
  }
}
