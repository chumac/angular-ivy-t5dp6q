import { initialHRWorkHistoryState, IHRWorkHistoryState } from './work-history.state';
import { HRWorkHistoryActions, HRWorkHistoryActionTypes } from './work-history.actions';

export function HRworkHistoryReducer(
  state = initialHRWorkHistoryState,
  action: HRWorkHistoryActions
): IHRWorkHistoryState {
  switch (action.type) {
    case HRWorkHistoryActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HRWorkHistoryActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HRWorkHistoryActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HRWorkHistoryActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HRWorkHistoryActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HRWorkHistoryActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HRWorkHistoryActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case HRWorkHistoryActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case HRWorkHistoryActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case HRWorkHistoryActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}
