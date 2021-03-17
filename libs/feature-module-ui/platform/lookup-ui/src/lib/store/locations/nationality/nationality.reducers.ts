import { initialNationalityState, INationalityState } from './nationality.state';
import { NationalityActions, NationalityActionTypes } from './nationality.actions';

export function nationalityReducer(
  state = initialNationalityState,
  action: NationalityActions
): INationalityState {
  switch (action.type) {
    case NationalityActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case NationalityActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case NationalityActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case NationalityActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case NationalityActionTypes.LOAD_NATIONALITY_DATA_SUCCESS:
      return { ...state, nationalityData: action.payload };
    default: {
      return state;
    }
  }
}
