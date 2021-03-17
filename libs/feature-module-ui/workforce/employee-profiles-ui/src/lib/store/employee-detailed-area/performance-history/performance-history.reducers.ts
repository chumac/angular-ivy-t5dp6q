import { initialPerformanceHistoryState, IPerformanceHistoryState } from "./performance-history.state";
import { PerformanceHistoryActions, PerformanceHistoryActionTypes } from "./performance-history.actions";

export function performanceHistoryReducer(state = initialPerformanceHistoryState, action: PerformanceHistoryActions): IPerformanceHistoryState {
  switch (action.type) {
    case PerformanceHistoryActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true }
    case PerformanceHistoryActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false }
    case PerformanceHistoryActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true }
    case PerformanceHistoryActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false }
    case PerformanceHistoryActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true }
    case PerformanceHistoryActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false }
    case PerformanceHistoryActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload }
    case PerformanceHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload }
    case PerformanceHistoryActionTypes.HR_RESET_DATA:
      return {
        ...state,
        approvedData: null,
        awaitingApprovalData: null,
        isProcessing: false,
        showEditor: false,
        showViewer: false
      }
    default: {
      return state;
    }
  }
}