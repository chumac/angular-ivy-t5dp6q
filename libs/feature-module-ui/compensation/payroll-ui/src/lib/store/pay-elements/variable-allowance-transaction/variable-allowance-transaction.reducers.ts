import { initialVariableAllowanceTransactionState, IVariableAllowanceTransactionState } from './variable-allowance-transaction.state';
import { VariableAllowanceTransactionActions, VariableAllowanceTransactionActionTypes } from './variable-allowance-transaction.actions';

export function variableAllowanceTransactionReducer(
  state = initialVariableAllowanceTransactionState,
  action: VariableAllowanceTransactionActions
): IVariableAllowanceTransactionState {
  switch (action.type) {
    case VariableAllowanceTransactionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case VariableAllowanceTransactionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case VariableAllowanceTransactionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case VariableAllowanceTransactionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case VariableAllowanceTransactionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case VariableAllowanceTransactionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case VariableAllowanceTransactionActionTypes.LOADING:
      return { ...state, isLoading: true };
    case VariableAllowanceTransactionActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case VariableAllowanceTransactionActionTypes.LOAD_VARIABLE_ALLOWANCE_LIST_SUCCESS:
      return { ...state, variableAllowanceList: action.payload };
    case VariableAllowanceTransactionActionTypes.LOAD_VARIABLE_ALLOWANCE_TRANSACTION_DATA_SUCCESS:
      return { ...state, data: action.payload.map(data => Object.assign({}, data, {
        employeeName: data.EmployeeInfo ? `${data.EmployeeInfo.employee_firstname} ${data.EmployeeInfo.employee_midname} ${data.EmployeeInfo.employee_surname} - ${data.EmployeeInfo.employee_number}` : '',
        varAllowance: data.VarAllowanceInfo ? data.VarAllowanceInfo.description : ''
      })) };
    default: {
      return state;
    }
  }
}
