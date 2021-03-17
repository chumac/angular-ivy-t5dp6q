import {
  initialClosedState,
  IClosedState
} from './closed.state';
import {
  ClosedActions,
  ClosedActionTypes
} from './closed.actions';

export function closedReducer(
  state = initialClosedState,
  action: ClosedActions
): IClosedState {
  switch (action.type) {
    case ClosedActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ClosedActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };

    case ClosedActionTypes.LOADING_DATA:
      return { ...state, isLoading: true };
    case ClosedActionTypes.NOT_LOADING_DATA:
      return { ...state, isLoading: false };

    case ClosedActionTypes.LOAD_CLOSED_DATA_SUCCESS:
      return { ...state, closedData: action.payload };

    default: {
      return state;
    }
  }
}
