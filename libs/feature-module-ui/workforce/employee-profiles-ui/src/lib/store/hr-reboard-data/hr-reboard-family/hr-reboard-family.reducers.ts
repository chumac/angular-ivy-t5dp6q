import { initialHrReboardFamilyState, IHrReboardFamilyState } from './hr-reboard-family.state';
import { HrReboardFamilyActions, HrReboardFamilyActionTypes } from './hr-reboard-family.actions';

export function hrReboardFamilyReducer(
  state = initialHrReboardFamilyState,
  action: HrReboardFamilyActions
): IHrReboardFamilyState {
  switch (action.type) {
    case HrReboardFamilyActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HrReboardFamilyActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HrReboardFamilyActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HrReboardFamilyActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HrReboardFamilyActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrReboardFamilyActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrReboardFamilyActionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state, data: action.payload.map(data => Object.assign({}, data, {
          country: data.CountryInfo.description,
          state: data.StateInfo.description,
          area: data.CityInfo.description,
        })) };
    case HrReboardFamilyActionTypes.LOAD_STATES_READY:
      return { ...state, stateList: action.payload.stateList, cityList: [] };
    case HrReboardFamilyActionTypes.LOAD_CITIES_READY:
      return { ...state, cityList: action.payload.cityList };
    case HrReboardFamilyActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case HrReboardFamilyActionTypes.LOAD_PHOTO_SUCCESS:
      return { ...state, photo: action.payload };
    case HrReboardFamilyActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}
