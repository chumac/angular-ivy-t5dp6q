import { initialReInstateTransactionState, IReInstateTransactionState } from './re-instate.state';
import { ReInstateTransactionActions, ReInstateTransactionActionTypes } from './re-instate.actions';

export function reInstateTransactionReducer(
  state = initialReInstateTransactionState,
  action: ReInstateTransactionActions
): IReInstateTransactionState {
  switch (action.type) {
    case ReInstateTransactionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReInstateTransactionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReInstateTransactionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReInstateTransactionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReInstateTransactionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReInstateTransactionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReInstateTransactionActionTypes.LOADING:
      return { ...state, isLoading: true };
    case ReInstateTransactionActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case ReInstateTransactionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload};
    case ReInstateTransactionActionTypes.LOAD_EMPLOYEE_DATA_SUCCESS:
      return { ...state, employeeList: action.payload };
    case ReInstateTransactionActionTypes.LOAD_RECORD_CATEGORY_DATA_SUCCESS:
      return { ...state, recordCategory: action.payload };
    default: {
      return state;
    }
  }
}
