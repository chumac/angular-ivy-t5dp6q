import { initialMultiJobRoleTransactionState, IMultiJobRoleTransactionState } from './multi-job-role.state';
import { MultiJobRoleTransactionActions, MultiJobRoleTransactionActionTypes } from './multi-job-role.actions';

export function multiJobRoleTransactionReducer(
  state = initialMultiJobRoleTransactionState,
  action: MultiJobRoleTransactionActions
): IMultiJobRoleTransactionState {
  switch (action.type) {
    case MultiJobRoleTransactionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case MultiJobRoleTransactionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case MultiJobRoleTransactionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case MultiJobRoleTransactionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case MultiJobRoleTransactionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case MultiJobRoleTransactionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case MultiJobRoleTransactionActionTypes.LOADING:
      return { ...state, isLoading: true };
    case MultiJobRoleTransactionActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case MultiJobRoleTransactionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload};
    case MultiJobRoleTransactionActionTypes.LOAD_EMPLOYEE_DATA_SUCCESS:
      return { ...state, employeeList: action.payload };
    case MultiJobRoleTransactionActionTypes.LOAD_POSITION_DATA_SUCCESS:
      return { ...state, positionList: action.payload };
    default: {
      return state;
    }
  }
}
