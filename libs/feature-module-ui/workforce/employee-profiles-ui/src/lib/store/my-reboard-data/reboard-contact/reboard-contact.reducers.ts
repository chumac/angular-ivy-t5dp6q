import { initialReboardContactState, IReboardContactState } from './reboard-contact.state';
import { ReboardContactActions, ReboardContactActionTypes } from './reboard-contact.actions';

export function reboardContactReducer(
  state = initialReboardContactState,
  action: ReboardContactActions
): IReboardContactState {
  switch (action.type) {
    case ReboardContactActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReboardContactActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReboardContactActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReboardContactActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReboardContactActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReboardContactActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReboardContactActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    case ReboardContactActionTypes.LOAD_NOK_PHOTO_SUCCESS:
      return { ...state, nokPhoto: action.payload };
    case ReboardContactActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ReboardContactActionTypes.LOAD_RESIDENTIAL_STATES_READY:
      return {
        ...state,
        raStateList: action.payload.raStateList,
        raCityList: []
      };
    case ReboardContactActionTypes.LOAD_RESIDENTIAL_CITIES_READY:
      return { ...state, raCityList: action.payload.raCityList };
    case ReboardContactActionTypes.LOAD_PERMANENT_STATES_READY:
      return {
        ...state,
        paStateList: action.payload.paStateList,
        paCityList: []
      };
    case ReboardContactActionTypes.LOAD_PERMANENT_CITIES_READY:
      return { ...state, paCityList: action.payload.paCityList };

    case ReboardContactActionTypes.LOAD_NEXT_OF_KIN_STATES_READY:
      return {
        ...state,
        nokStateList: action.payload.nokStateList,
        nokCityList: []
      };
    case ReboardContactActionTypes.LOAD_NEXT_OF_KIN_CITIES_READY:
      return { ...state, nokCityList: action.payload.nokCityList };
    case ReboardContactActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}
