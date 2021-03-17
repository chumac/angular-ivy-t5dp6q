import { initialFixedAllowanceState, IFixedAllowanceState } from './fixed-allowance.state';
import { FixedAllowanceActions, FixedAllowanceActionTypes } from './fixed-allowance.actions';

export function fixedAllowanceReducer(
  state = initialFixedAllowanceState,
  action: FixedAllowanceActions
): IFixedAllowanceState {
  switch (action.type) {
    case FixedAllowanceActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case FixedAllowanceActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case FixedAllowanceActionTypes.SHOW_RATE_EDITOR:
      return { ...state, showRateEditor: true };
    case FixedAllowanceActionTypes.HIDE_RATE_EDITOR:
      return { ...state, showRateEditor: false };
    case FixedAllowanceActionTypes.SHOW_CONFIGURE_EDITOR:
      return { ...state, showConfigureEditor: true };
    case FixedAllowanceActionTypes.HIDE_CONFIGURE_EDITOR:
      return { ...state, showConfigureEditor: false };
    case FixedAllowanceActionTypes.SHOW_EMPLOYEE_RATE_VIEWER:
      return { ...state, showEmployeeRateViewer: true };
    case FixedAllowanceActionTypes.HIDE_EMPLOYEE_RATE_VIEWER:
      return { ...state, showEmployeeRateViewer: false };
    case FixedAllowanceActionTypes.SHOW_PAYGROUP_RATE_VIEWER:
      return { ...state, showPaygroupRateViewer: true };
    case FixedAllowanceActionTypes.HIDE_PAYGROUP_RATE_VIEWER:
      return { ...state, showPaygroupRateViewer: false };
    case FixedAllowanceActionTypes.SHOW_GLOBAL_RATE_VIEWER:
      return { ...state, showGlobalRateViewer: true };
    case FixedAllowanceActionTypes.HIDE_GLOBAL_RATE_VIEWER:
      return { ...state, showGlobalRateViewer: false };
    case FixedAllowanceActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case FixedAllowanceActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case FixedAllowanceActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case FixedAllowanceActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case FixedAllowanceActionTypes.LOADING:
      return { ...state, isLoading: true };
    case FixedAllowanceActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case FixedAllowanceActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case FixedAllowanceActionTypes.LOAD_CURRENCY_LIST_SUCCESS:
      return { ...state, currencyList: action.payload };
    case FixedAllowanceActionTypes.LOAD_PAY_FORMULA_LIST_SUCCESS:
      return { ...state, payFormulaList: action.payload };
    case FixedAllowanceActionTypes.LOAD_PAYROLL_PROFILE_LIST_SUCCESS:
      return { ...state, payrollProfileList: action.payload };
    case FixedAllowanceActionTypes.LOAD_PAYMENT_ITEM_TYPES_SUCCESS:
      return { ...state, payItemTypes: action.payload };
    case FixedAllowanceActionTypes.LOAD_PAYMENT_FREQUENCY_LIST_SUCCESS:
      return { ...state, payFrequencies: action.payload };
    case FixedAllowanceActionTypes.LOAD_MONTH_LIST_SUCCESS:
      return { ...state, monthList: action.payload };
    case FixedAllowanceActionTypes.LOAD_ELIGIBILITY_LIST_SUCCESS:
      return { ...state, eligibilityList: action.payload };
    case FixedAllowanceActionTypes.LOAD_PAYROLL_TYPE_LIST_SUCCESS:
      return { ...state, payrollTypes: action.payload };
    case FixedAllowanceActionTypes.LOAD_GROUP_LIST_SUCCESS:
      return { ...state, groupList: action.payload };
    case FixedAllowanceActionTypes.LOAD_ALLOWANCE_LIST_SUCCESS:
      return { ...state, allowanceList: action.payload };
    case FixedAllowanceActionTypes.LOAD_PRORATION_DATE_TYPE_LIST_SUCCESS:
      return { ...state, prorationDateList: action.payload };
    case FixedAllowanceActionTypes.LOAD_PAYGROUP_LIST_SUCCESS:
      return { ...state, paygroupList: action.payload };
    case FixedAllowanceActionTypes.LOAD_PAYGROUP_RATES_FIXED_ALLOWANCE_SUCCESS:
      return { ...state, paygroupRates: action.payload };
    case FixedAllowanceActionTypes.LOAD_EMPLOYEE_RATES_FIXED_ALLOWANCE_SUCCESS:
      return { ...state, employeeRates: action.payload };
    case FixedAllowanceActionTypes.LOAD_GLOBAL_RATES_FIXED_ALLOWANCE_SUCCESS:
      return { ...state, globalRates: action.payload };
    case FixedAllowanceActionTypes.LOAD_CRITERIA_CONFIGURATION_CHECK_FIXED_ALLOWANCE_SUCCESS:
      return { ...state, criteriaCheck: action.payload };
    case FixedAllowanceActionTypes.LOAD_DATA_CRITERIA_CONFIGURATION_FIXED_ALLOWANCE_SUCCESS:
      return { ...state, criteriaConfiguration: action.payload };
    case FixedAllowanceActionTypes.PROCESSING_RATE_CHART_CHECK_FIXED_ALLOWANCE:
      return { ...state, isProcessingItemCheck: action.payload };
    case FixedAllowanceActionTypes.EMPLOYEE_RATE_CHART_CHECK_FIXED_ALLOWANCE_SUCCESS:
      return { ...state, employeeRateChartCheck: action.payload };
    case FixedAllowanceActionTypes.PAYGROUP_RATE_CHART_CHECK_FIXED_ALLOWANCE_SUCCESS:
      return { ...state, paygroupRateChartCheck: action.payload };
    case FixedAllowanceActionTypes.LOAD_FILTERED_FIXED_ALLOWANCE_DATA:
      return {
        ...state, filteredData: state.data.filter(val => action.payload.payrollProfileId ? val.payroll_profile === action.payload.payrollProfileId : val)
      };
    default: {
      return state;
    }
  }
}
