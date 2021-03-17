import { initialReligionsState, IReligionsState } from './religions.state';
import { ReligionsActions, ReligionsActionTypes } from './religions.actions';

export function religionReducer(
  state = initialReligionsState,
  action: ReligionsActions
): IReligionsState {
  switch (action.type) {
    case ReligionsActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReligionsActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReligionsActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReligionsActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReligionsActionTypes.LOAD_RELIGION_DATA_SUCCESS:
      return { ...state, religionData: action.payload };
    default: {
      return state;
    }
  }
}
