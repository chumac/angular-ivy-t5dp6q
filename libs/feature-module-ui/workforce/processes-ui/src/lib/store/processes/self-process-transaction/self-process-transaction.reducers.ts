import { initialSelfProcessTransactionState, ISelfProcessTransactionState } from './self-process-transaction.state';
import { SelfProcessTransactionActions, SelfProcessTransactionActionTypes } from './self-process-transaction.actions';

export function selfProcessTransactionReducer(
  state = initialSelfProcessTransactionState,
  action: SelfProcessTransactionActions
): ISelfProcessTransactionState {
  switch (action.type) {
    case SelfProcessTransactionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case SelfProcessTransactionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case SelfProcessTransactionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case SelfProcessTransactionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case SelfProcessTransactionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case SelfProcessTransactionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case SelfProcessTransactionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, selfProcessTransactionData: action.payload };
    case SelfProcessTransactionActionTypes.LOAD_AREA_SUCCESS:
      return { ...state, area: action.payload };
    case SelfProcessTransactionActionTypes.REMOVE_DATA:
      return { ...state, selfProcessTransactionData: state.selfProcessTransactionData.filter(item => item.id !== action.payload.recordId) };
    default: {
      return state;
    }
  }
}

