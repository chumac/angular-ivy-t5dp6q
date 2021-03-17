import { initialSeparationTransactionState, ISeparationTransactionState } from './separation.state';
import { SeparationTransactionActions, SeparationTransactionActionTypes } from './separation.actions';

export function separationTransactionReducer(
  state = initialSeparationTransactionState,
  action: SeparationTransactionActions
): ISeparationTransactionState {
  switch (action.type) {
    case SeparationTransactionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case SeparationTransactionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case SeparationTransactionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case SeparationTransactionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case SeparationTransactionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case SeparationTransactionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case SeparationTransactionActionTypes.LOADING:
      return { ...state, isLoading: true };
    case SeparationTransactionActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case SeparationTransactionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload};
    case SeparationTransactionActionTypes.LOAD_EMPLOYEE_DATA_SUCCESS:
      return { ...state, employeeList: action.payload };
    case SeparationTransactionActionTypes.LOAD_STATUS_DATA_SUCCESS:
      return { ...state, status: action.payload };
    case SeparationTransactionActionTypes.LOAD_REASONS_DATA_SUCCESS:
      return { ...state, reasons: action.payload };
    case SeparationTransactionActionTypes.LOAD_ALLOWANCE_DATA_SUCCESS:
      return { ...state, allowance: action.payload };
    case SeparationTransactionActionTypes.LOAD_CURRENCY_DATA_SUCCESS:
      return { ...state, currency: action.payload };
    default: {
      return state;
    }
  }
}
