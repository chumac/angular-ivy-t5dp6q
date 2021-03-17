import { initialIntegrationState, IPayrollIntegrationState } from './payroll-integration.state';
import { PayrollIntegrationActions, PayrollIntegrationActionTypes } from './payroll-integration.actions';

export function payrollIntegrationReducer(
  state = initialIntegrationState,
  action: PayrollIntegrationActions
): IPayrollIntegrationState {
  switch (action.type) {
    case PayrollIntegrationActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PayrollIntegrationActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case PayrollIntegrationActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case PayrollIntegrationActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case PayrollIntegrationActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case PayrollIntegrationActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case PayrollIntegrationActionTypes.LOADING:
      return { ...state, isLoading: true };
    case PayrollIntegrationActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case PayrollIntegrationActionTypes.LOAD_PAYROLL_INTEGRATION_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case PayrollIntegrationActionTypes.LOAD_PAYROLL_PROFILE_LIST_SUCCESS:
      return { ...state, payrollProfileList: action.payload };
    case PayrollIntegrationActionTypes.LOAD_MONTH_LIST_SUCCESS:
      return { ...state, monthList: action.payload };
    case PayrollIntegrationActionTypes.LOAD_YEAR_LIST_SUCCESS:
      return { ...state, yearList: action.payload };
    case PayrollIntegrationActionTypes.LOAD_FORMAT_LIST_SUCCESS:
      return { ...state, formatList: action.payload };
    case PayrollIntegrationActionTypes.LOAD_SOURCE_LIST_SUCCESS:
      return { ...state, sourceList: action.payload };
    default: {
      return state;
    }
  }
}
