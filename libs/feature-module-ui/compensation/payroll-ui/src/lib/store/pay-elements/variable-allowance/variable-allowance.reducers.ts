import { initialVariableAllowanceState, IVariableAllowanceState } from './variable-allowance.state';
import { VariableAllowanceActions, VariableAllowanceActionTypes } from './variable-allowance.actions';

export function variableAllowanceReducer(
  state = initialVariableAllowanceState,
  action: VariableAllowanceActions
): IVariableAllowanceState {
  switch (action.type) {
    case VariableAllowanceActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case VariableAllowanceActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case VariableAllowanceActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case VariableAllowanceActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case VariableAllowanceActionTypes.SHOW_RATE_VIEWER:
      return { ...state, showRateViewer: true };
    case VariableAllowanceActionTypes.HIDE_RATE_VIEWER:
      return { ...state, showRateViewer: false };
    case VariableAllowanceActionTypes.SHOW_RATE_EDITOR:
      return { ...state, showRateEditor: true };
    case VariableAllowanceActionTypes.HIDE_RATE_EDITOR:
      return { ...state, showRateEditor: false };
    case VariableAllowanceActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case VariableAllowanceActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case VariableAllowanceActionTypes.LOADING:
      return { ...state, isLoading: true };
    case VariableAllowanceActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case VariableAllowanceActionTypes.LOAD_VARIABLE_ALLOWANCE_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case VariableAllowanceActionTypes.LOAD_PAYROLL_PROFILE_LIST_SUCCESS:
      return { ...state, payrollProfileList: action.payload };
    case VariableAllowanceActionTypes.LOAD_TRANSACTION_UNIT_LIST_SUCCESS:
      return { ...state, transactionUnitList: action.payload };
    case VariableAllowanceActionTypes.LOAD_GROUP_LIST_SUCCESS:
      return { ...state, groupNameList: action.payload };
    case VariableAllowanceActionTypes.LOAD_RATES_VARIABLE_ALLOWANCE_DATA_SUCCESS:
      return { ...state, rates: action.payload };
    case VariableAllowanceActionTypes.LOAD_CURRENCY_LIST_SUCCESS:
      return { ...state, currencyList: action.payload };
    case VariableAllowanceActionTypes.LOAD_PAY_FORMULA_LIST_SUCCESS:
      return { ...state, payFormulaList: action.payload };
    case VariableAllowanceActionTypes.LOAD_PAYGROUP_LIST_SUCCESS:
      return { ...state, paygroupList: action.payload };
    default: {
      return state;
    }
  }
}
