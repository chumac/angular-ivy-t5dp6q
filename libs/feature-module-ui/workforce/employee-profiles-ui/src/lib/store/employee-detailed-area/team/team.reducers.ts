import { initialTeamState, ITeamState } from "./team.state";
import { TeamActions, TeamActionTypes } from "./team.actions";

export function teamReducer(state = initialTeamState, action: TeamActions): ITeamState {
  switch (action.type) {
    case TeamActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true }
    case TeamActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false }
    case TeamActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true }
    case TeamActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false }
    case TeamActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true }
    case TeamActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false }
    case TeamActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload }
    case TeamActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload }
    case TeamActionTypes.HR_RESET_DATA:
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