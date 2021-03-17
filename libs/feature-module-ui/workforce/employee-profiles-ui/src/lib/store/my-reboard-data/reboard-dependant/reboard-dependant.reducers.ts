import { initialReboardDependantsState, IReboardDependantState } from './reboard-dependant.state';
import { ReboardDependantsActions, ReboardDependantActionTypes } from './reboard-dependant.actions';

export function reboardDependantsReducer(
  state = initialReboardDependantsState,
  action: ReboardDependantsActions
): IReboardDependantState {
  switch (action.type) {
    case ReboardDependantActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReboardDependantActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReboardDependantActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReboardDependantActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReboardDependantActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReboardDependantActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReboardDependantActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case ReboardDependantActionTypes.LOAD_STATES_READY:
      return { ...state, stateList: action.payload.stateList, cityList: [] };
    case ReboardDependantActionTypes.LOAD_CITIES_READY:
      return { ...state, cityList: action.payload.cityList };
    case ReboardDependantActionTypes.LOAD_PHOTO_SUCCESS:
      return { ...state, photo: action.payload };
    default: {
      return state;
    }
  }
}
