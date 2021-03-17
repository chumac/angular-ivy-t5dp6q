import { initialPfaState, IPfaState } from './pfa.state';
import { PfaActions, PfaActionTypes } from './pfa.actions';

export function pfaReducer(
  state = initialPfaState,
  action: PfaActions
): IPfaState {
  switch (action.type) {
    case PfaActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PfaActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case PfaActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case PfaActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case PfaActionTypes.LOADING:
      return { ...state, isLoading: true };
    case PfaActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case PfaActionTypes.LOAD_PFA_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case PfaActionTypes.LOAD_NATIONALITY_DATA_SUCCESS:
      return { ...state, nationality: action.payload };
    case PfaActionTypes.LOAD_STATE_DATA_SUCCESS:
      return { ...state, stateData: action.payload };
    case PfaActionTypes.LOAD_CITY_DATA_SUCCESS:
      return { ...state, cityData: action.payload };
    default: {
      return state;
    }
  }
}
