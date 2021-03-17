import { initialLgaState, ILgaState } from './lga.state';
import { LgaActions, LgaActionTypes } from './lga.actions';

export function lgaReducer(
  state = initialLgaState,
  action: LgaActions
): ILgaState {
  switch (action.type) {
    case LgaActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LgaActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case LgaActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LgaActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LgaActionTypes.LOAD_LGA_DATA_SUCCESS:
      return { ...state, lgaData: action.payload };
      case LgaActionTypes.LOAD_NATIONALITY_DATA_SUCCESS:
      return { ...state, nationality: action.payload };
    case LgaActionTypes.LOAD_STATE_DATA_SUCCESS:
      return { ...state, stateData:action.payload };
    case LgaActionTypes.CLEAR:
      return { ...state, lgaData: [] };
    case LgaActionTypes.CLEAR_STATE:
      return { ...state, stateData: [] };
    default: {
      return state;
    }
  }
}
