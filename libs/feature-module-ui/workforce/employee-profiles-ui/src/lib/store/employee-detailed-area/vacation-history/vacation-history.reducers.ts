import { initialVacationHistoryState, IVacationHistoryState } from "./vacation-history.state";
import { VacationHistoryActions, VacationHistoryActionTypes } from "./vacation-history.actions";

export function vacationHistoryReducer(state = initialVacationHistoryState, action: VacationHistoryActions): IVacationHistoryState {
  switch (action.type) {
    case VacationHistoryActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true }
    case VacationHistoryActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false }
    case VacationHistoryActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true }
    case VacationHistoryActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false }
    case VacationHistoryActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true }
    case VacationHistoryActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false }
    case VacationHistoryActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload }
    case VacationHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload }
    case VacationHistoryActionTypes.HR_RESET_DATA:
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