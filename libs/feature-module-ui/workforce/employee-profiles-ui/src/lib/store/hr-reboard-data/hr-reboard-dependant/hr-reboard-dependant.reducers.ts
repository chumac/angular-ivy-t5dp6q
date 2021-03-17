import { initialHrReboardDependantsState, IHrReboardDependantState } from './hr-reboard-dependant.state';
import { HrReboardDependantsActions, HrReboardDependantActionTypes } from './hr-reboard-dependant.actions';

export function hrReboardDependantsReducer(
  state = initialHrReboardDependantsState,
  action: HrReboardDependantsActions
): IHrReboardDependantState {
  switch (action.type) {
    case HrReboardDependantActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HrReboardDependantActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HrReboardDependantActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HrReboardDependantActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HrReboardDependantActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrReboardDependantActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrReboardDependantActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case HrReboardDependantActionTypes.LOAD_STATES_READY:
      return { ...state, stateList: action.payload.stateList, cityList: [] };
    case HrReboardDependantActionTypes.LOAD_CITIES_READY:
      return { ...state, cityList: action.payload.cityList };
    case HrReboardDependantActionTypes.LOAD_PHOTO_SUCCESS:
      return { ...state, photo: action.payload };
    default: {
      return state;
    }
  }
}
