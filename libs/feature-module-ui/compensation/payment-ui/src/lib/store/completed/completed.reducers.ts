import {
  initialCompletedState,
  ICompletedState
} from './completed.state';
import {
  CompletedActions,
  CompletedActionTypes
} from './completed.actions';

export function completedReducer(
  state = initialCompletedState,
  action: CompletedActions
): ICompletedState {
  switch (action.type) {
    case CompletedActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case CompletedActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };

    case CompletedActionTypes.LOADING_DATA:
      return { ...state, isLoading: true };
    case CompletedActionTypes.NOT_LOADING_DATA:
      return { ...state, isLoading: false };

    case CompletedActionTypes.LOAD_COMPLETED_DATA_SUCCESS:
      return { ...state, completedData: action.payload };

    default: {
      return state;
    }
  }
}
