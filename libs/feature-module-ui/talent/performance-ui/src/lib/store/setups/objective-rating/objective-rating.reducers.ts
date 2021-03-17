import { initialObjectiveRatingState, IObjectiveRatingState } from './objective-rating.state';
import { ObjectiveRatingActions, ObjectiveRatingActionTypes } from './objective-rating.actions';

export function objectiveRatingReducer(
  state = initialObjectiveRatingState,
  action: ObjectiveRatingActions
): IObjectiveRatingState {
  switch (action.type) {
    case ObjectiveRatingActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ObjectiveRatingActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ObjectiveRatingActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ObjectiveRatingActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ObjectiveRatingActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ObjectiveRatingActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ObjectiveRatingActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, objectiveRatingData: action.payload };
    case ObjectiveRatingActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ObjectiveRatingActionTypes.REMOVE_DATA:
      return { ...state, objectiveRatingData: state.objectiveRatingData.filter(item => item.id !== action.payload.recordId)};
    case ObjectiveRatingActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

