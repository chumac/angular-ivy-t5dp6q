import { initialObjectiveState, IObjectiveState } from './objective.state';
import { ObjectiveActions, ObjectiveActionTypes } from './objective.actions';

export function objectiveReducer(
  state = initialObjectiveState,
  action: ObjectiveActions
): IObjectiveState {
  switch (action.type) {
    case ObjectiveActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ObjectiveActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ObjectiveActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ObjectiveActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ObjectiveActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ObjectiveActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ObjectiveActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, objectiveData: action.payload };
    case ObjectiveActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ObjectiveActionTypes.REMOVE_DATA:
      return { ...state, objectiveData: state.objectiveData.filter(item => item.id !== action.payload.recordId)};
    case ObjectiveActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

