import { initialSeparationState, ISeparationState } from "./separation.state";
import { SeparationActions, SeparationActionTypes } from "./separation.actions";

export function separationReducer(state = initialSeparationState, action: SeparationActions): ISeparationState {
  switch (action.type) {
    case SeparationActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true }
    case SeparationActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false }
    case SeparationActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true }
    case SeparationActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false }
    case SeparationActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true }
    case SeparationActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false }
    case SeparationActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload }
    case SeparationActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload }
    case SeparationActionTypes.HR_RESET_DATA:
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