import { initialStateState, IStateState } from './state.state';
import { StateActions, StateActionTypes } from './state.actions';

export function stateReducer(
  state = initialStateState,
  action: StateActions
): IStateState {
  switch (action.type) {
    case StateActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case StateActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case StateActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case StateActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case StateActionTypes.LOAD_STATE_DATA_SUCCESS:
      return { ...state, stateData: action.payload };
    case StateActionTypes.LOAD_NATIONALITY_DATA_SUCCESS:
      return { ...state, nationality: action.payload};
    case StateActionTypes.CLEAR:
      return { ...state, stateData: []};
    default: {
      return state;
    }
  }
}
