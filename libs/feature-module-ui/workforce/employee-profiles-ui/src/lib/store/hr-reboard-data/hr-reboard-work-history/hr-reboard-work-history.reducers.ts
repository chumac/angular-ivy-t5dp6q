import { initialHrReboardWorkHistoryState, IHrReboardWorkHistoryState } from './hr-reboard-work-history.state';
import { HrReboardWorkHistoryActions, HrReboardWorkHistoryActionTypes } from './hr-reboard-work-history.actions';

export function hrReboardWorkHistoryReducer(
  state = initialHrReboardWorkHistoryState,
  action: HrReboardWorkHistoryActions
): IHrReboardWorkHistoryState {
  switch (action.type) {
    case HrReboardWorkHistoryActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HrReboardWorkHistoryActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HrReboardWorkHistoryActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HrReboardWorkHistoryActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HrReboardWorkHistoryActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrReboardWorkHistoryActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrReboardWorkHistoryActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case HrReboardWorkHistoryActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case HrReboardWorkHistoryActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}
