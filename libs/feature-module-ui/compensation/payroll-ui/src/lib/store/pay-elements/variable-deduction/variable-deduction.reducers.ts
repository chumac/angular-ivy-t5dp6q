import { initialVariableDeductionState, IVariableDeductionState } from './variable-deduction.state';
import { VariableDeductionActions, VariableDeductionActionTypes } from './variable-deduction.actions';

export function variableDeductionReducer(
  state = initialVariableDeductionState,
  action: VariableDeductionActions
): IVariableDeductionState {
  switch (action.type) {
    case VariableDeductionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case VariableDeductionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case VariableDeductionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case VariableDeductionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case VariableDeductionActionTypes.SHOW_RATE_VIEWER:
      return { ...state, showRateViewer: true };
    case VariableDeductionActionTypes.HIDE_RATE_VIEWER:
      return { ...state, showRateViewer: false };
    case VariableDeductionActionTypes.SHOW_RATE_EDITOR:
      return { ...state, showRateEditor: true };
    case VariableDeductionActionTypes.HIDE_RATE_EDITOR:
      return { ...state, showRateEditor: false };
    case VariableDeductionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case VariableDeductionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case VariableDeductionActionTypes.LOADING:
      return { ...state, isLoading: true };
    case VariableDeductionActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case VariableDeductionActionTypes.LOAD_VARIABLE_DEDUCTION_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case VariableDeductionActionTypes.LOAD_PAYROLL_PROFILE_LIST_SUCCESS:
      return { ...state, payrollProfileList: action.payload };
    case VariableDeductionActionTypes.LOAD_PAYGROUP_LIST_SUCCESS:
      return { ...state, paygroupList: action.payload };
    case VariableDeductionActionTypes.LOAD_TRANSACTION_UNIT_LIST_SUCCESS:
      return { ...state, transactionUnitList: action.payload };
    case VariableDeductionActionTypes.LOAD_GROUP_LIST_SUCCESS:
      return { ...state, groupNameList: action.payload };
    case VariableDeductionActionTypes.LOAD_RATES_VARIABLE_DEDUCTION_DATA_SUCCESS:
      return { ...state, rates: action.payload };
    case VariableDeductionActionTypes.LOAD_CURRENCY_LIST_SUCCESS:
      return { ...state, currencyList: action.payload };
    case VariableDeductionActionTypes.LOAD_FORMULA_LIST_SUCCESS:
      return { ...state, formulaList: action.payload };
    default: {
      return state;
    }
  }
}
