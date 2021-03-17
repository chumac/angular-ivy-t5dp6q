import { initialVariableDeductionTransactionState, IVariableDeductionTransactionState } from './variable-deduction-transaction.state';
import { VariableDeductionTransactionActions, VariableDeductionTransactionActionTypes } from './variable-deduction-transaction.actions';

export function variableDeductionTransactionReducer(
  state = initialVariableDeductionTransactionState,
  action: VariableDeductionTransactionActions
): IVariableDeductionTransactionState {
  switch (action.type) {
    case VariableDeductionTransactionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case VariableDeductionTransactionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case VariableDeductionTransactionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case VariableDeductionTransactionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case VariableDeductionTransactionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case VariableDeductionTransactionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case VariableDeductionTransactionActionTypes.LOADING:
      return { ...state, isLoading: true };
    case VariableDeductionTransactionActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case VariableDeductionTransactionActionTypes.LOAD_VARIABLE_DEDUCTION_TRANSACTION_DATA_SUCCESS:
      return {
        ...state, data: action.payload.map(data => Object.assign({}, data, {
          employeeName: data.EmployeeInfo ? `${data.EmployeeInfo.employee_firstname} ${data.EmployeeInfo.employee_midname} ${data.EmployeeInfo.employee_surname} - ${data.EmployeeInfo.employee_number}`: '',
          variableDeduction: data.VardeductionInfo ? data.VardeductionInfo.description : ''
        }))
      };
    case VariableDeductionTransactionActionTypes.LOAD_VARIABLE_DEDUCTION_LIST_SUCCESS:
      return { ...state, variableDeductionList: action.payload };
    default: {
      return state;
    }
  }
}
