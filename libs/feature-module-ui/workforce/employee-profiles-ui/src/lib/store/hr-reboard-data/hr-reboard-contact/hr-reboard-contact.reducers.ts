import { initialHrReboardContactState, IHrReboardContactState } from './hr-reboard-contact.state';
import { HrReboardContactActions, HrReboardContactActionTypes } from './hr-reboard-contact.actions';

export function hrReboardContactReducer(
  state = initialHrReboardContactState,
  action: HrReboardContactActions
): IHrReboardContactState {
  switch (action.type) {
    case HrReboardContactActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HrReboardContactActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HrReboardContactActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HrReboardContactActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HrReboardContactActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrReboardContactActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrReboardContactActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case HrReboardContactActionTypes.LOAD_NOK_PHOTO_SUCCESS:
      return { ...state, nokPhoto: action.payload };
    case HrReboardContactActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case HrReboardContactActionTypes.LOAD_RESIDENTIAL_STATES_READY:
      return {
        ...state,
        raStateList: action.payload.raStateList,
        raCityList: []
      };
    case HrReboardContactActionTypes.LOAD_RESIDENTIAL_CITIES_READY:
      return { ...state, raCityList: action.payload.raCityList };
    case HrReboardContactActionTypes.LOAD_PERMANENT_STATES_READY:
      return {
        ...state,
        paStateList: action.payload.paStateList,
        paCityList: []
      };
    case HrReboardContactActionTypes.LOAD_PERMANENT_CITIES_READY:
      return { ...state, paCityList: action.payload.paCityList };

    case HrReboardContactActionTypes.LOAD_NEXT_OF_KIN_STATES_READY:
      return {
        ...state,
        nokStateList: action.payload.nokStateList,
        nokCityList: []
      };
    case HrReboardContactActionTypes.LOAD_NEXT_OF_KIN_CITIES_READY:
      return { ...state, nokCityList: action.payload.nokCityList };
    case HrReboardContactActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}
