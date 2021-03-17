import { initialReboardFamilyState, IReboardFamilyState } from './reboard-family.state';
import { ReboardFamilyActions, ReboardFamilyActionTypes } from './reboard-family.actions';

export function reboardFamilyReducer(
  state = initialReboardFamilyState,
  action: ReboardFamilyActions
): IReboardFamilyState {
  switch (action.type) {
    case ReboardFamilyActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReboardFamilyActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReboardFamilyActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReboardFamilyActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReboardFamilyActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReboardFamilyActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReboardFamilyActionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state, data: action.payload.map(data => Object.assign({}, data, {
          country: data.CountryInfo ? data.CountryInfo.description : null,
          state: data.StateInfo ? data.StateInfo.description : null,
          area: data.CityInfo ? data.CityInfo.description : null,
        })) };
    case ReboardFamilyActionTypes.LOAD_STATES_READY:
      return { ...state, stateList: action.payload.stateList, cityList: [] };
    case ReboardFamilyActionTypes.LOAD_CITIES_READY:
      return { ...state, cityList: action.payload.cityList };
    case ReboardFamilyActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ReboardFamilyActionTypes.LOAD_PHOTO_SUCCESS:
      return { ...state, photo: action.payload };
    case ReboardFamilyActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}
