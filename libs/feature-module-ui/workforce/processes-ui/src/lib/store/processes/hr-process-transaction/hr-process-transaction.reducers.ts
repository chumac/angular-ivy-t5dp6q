import { initialHrProcessTransactionState, IHrProcessTransactionState } from './hr-process-transaction.state';
import { HrProcessTransactionActions, HrProcessTransactionActionTypes } from './hr-process-transaction.actions';

export function hrProcessTransactionReducer(
  state = initialHrProcessTransactionState,
  action: HrProcessTransactionActions
): IHrProcessTransactionState {
  switch (action.type) {
    case HrProcessTransactionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HrProcessTransactionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HrProcessTransactionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HrProcessTransactionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HrProcessTransactionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrProcessTransactionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrProcessTransactionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, hrProcessTransactionData: action.payload };
    case HrProcessTransactionActionTypes.REMOVE_DATA:
      return { ...state, hrProcessTransactionData: state.hrProcessTransactionData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

