import { initialWorkHistoryState, IWorkHistoryState } from './work-history.state';
import { WorkHistoryActions, WorkHistoryActionTypes } from './work-history.actions';

export function workHistoryReducer(
  state = initialWorkHistoryState,
  action: WorkHistoryActions
): IWorkHistoryState {
  switch (action.type) {
    case WorkHistoryActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case WorkHistoryActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case WorkHistoryActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case WorkHistoryActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case WorkHistoryActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case WorkHistoryActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case WorkHistoryActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case WorkHistoryActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case WorkHistoryActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case WorkHistoryActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}
