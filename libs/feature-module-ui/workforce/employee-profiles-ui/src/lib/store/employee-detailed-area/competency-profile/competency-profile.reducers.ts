import { initialCompetencyProfileState, ICompetencyProfileState } from "./competency-profile.state";
import { CompetencyProfileActions, CompetencyProfileActionTypes } from "./competency-profile.actions";

export function competencyProfileReducer(state = initialCompetencyProfileState, action: CompetencyProfileActions): ICompetencyProfileState {
  switch (action.type) {
    case CompetencyProfileActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true }
    case CompetencyProfileActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false }
    case CompetencyProfileActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true }
    case CompetencyProfileActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false }
    case CompetencyProfileActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true }
    case CompetencyProfileActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false }
    case CompetencyProfileActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload }
    case CompetencyProfileActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload }
    case CompetencyProfileActionTypes.HR_RESET_DATA:
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