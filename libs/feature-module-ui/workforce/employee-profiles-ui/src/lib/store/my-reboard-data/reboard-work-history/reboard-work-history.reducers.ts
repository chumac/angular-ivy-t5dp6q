import { initialReboardWorkHistoryState, IReboardWorkHistoryState } from './reboard-work-history.state';
import { ReboardWorkHistoryActions, ReboardWorkHistoryActionTypes } from './reboard-work-history.actions';

export function reboardWorkHistoryReducer(
  state = initialReboardWorkHistoryState,
  action: ReboardWorkHistoryActions
): IReboardWorkHistoryState {
  switch (action.type) {
    case ReboardWorkHistoryActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReboardWorkHistoryActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReboardWorkHistoryActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReboardWorkHistoryActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReboardWorkHistoryActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReboardWorkHistoryActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReboardWorkHistoryActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case ReboardWorkHistoryActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ReboardWorkHistoryActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}
