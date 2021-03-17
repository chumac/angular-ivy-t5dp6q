import { initialDisciplinaryActionsState, IDisciplinaryActionsState } from './disciplinary-action.state';
import { DisciplinaryActionActions, DisciplinaryActionActionTypes } from './disciplinary-action.actions';

export function disciplinaryActionTransReducer(
  state = initialDisciplinaryActionsState,
  action: DisciplinaryActionActions
): IDisciplinaryActionsState {
  switch (action.type) {
    case DisciplinaryActionActionTypes.LOADING:
      return { ...state, isLoading: true };
    case DisciplinaryActionActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case DisciplinaryActionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case DisciplinaryActionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case DisciplinaryActionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case DisciplinaryActionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case DisciplinaryActionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case DisciplinaryActionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case DisciplinaryActionActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case DisciplinaryActionActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case DisciplinaryActionActionTypes.LOAD_TAKE_ACTION_DATA_SUCCESS:
      return { ...state, takeActionData: action.payload };
    case DisciplinaryActionActionTypes.LOAD_ACTION_ROLES_DATA_SUCCESS:
      return { ...state, actionRolesData: action.payload };
    case DisciplinaryActionActionTypes.LOAD_RECOMMENDATION_DATA:
      return { ...state, recommendation: null };
    case DisciplinaryActionActionTypes.LOAD_RECOMMENDATION_DATA_SUCCESS:
      return { ...state, recommendation: action.payload };
    case DisciplinaryActionActionTypes.LOAD_RECOMMENDATION_LIST_DATA_SUCCESS:
      return { ...state, recommendationList: action.payload };
    default: {
      return state;
    }
  }
}
