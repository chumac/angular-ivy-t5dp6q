import { initialDisciplinaryActionState, IDisciplinaryActionState } from "./disciplinary-action.state";
import { DisciplinaryActionActions, DisciplinaryActionActionTypes } from "./disciplinary-action.actions";

export function disciplinaryActionReducer(state = initialDisciplinaryActionState, action: DisciplinaryActionActions): IDisciplinaryActionState {
  switch (action.type) {
    case DisciplinaryActionActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true }
    case DisciplinaryActionActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false }
    case DisciplinaryActionActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true }
    case DisciplinaryActionActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false }
    case DisciplinaryActionActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true }
    case DisciplinaryActionActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false }
    case DisciplinaryActionActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload }
    case DisciplinaryActionActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload }
    case DisciplinaryActionActionTypes.HR_RESET_DATA:
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