import { initialContactState, IContactState } from './contact.state';
import { ContactActions, ContactActionTypes } from './contact.actions';

export function contactReducer(
  state = initialContactState,
  action: ContactActions
): IContactState {
  switch (action.type) {
    case ContactActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ContactActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ContactActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ContactActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ContactActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ContactActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ContactActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case ContactActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case ContactActionTypes.LOAD_AWAITING_APPROVAL_DATA_FAILURE:
      return state;
    case ContactActionTypes.LOAD_APPROVED_NOK_PHOTO_SUCCESS:
      return { ...state, nokPhoto: action.payload };
    case ContactActionTypes.LOAD_AWAITING_APPROVAL_NOK_PHOTO_SUCCESS:
      return { ...state, awaitingApprovalNokPhoto: action.payload };
    case ContactActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ContactActionTypes.LOAD_RESIDENTIAL_STATES_READY:
      return {
        ...state,
        raStateList: action.payload.raStateList,
        raCityList: []
      };
    case ContactActionTypes.LOAD_RESIDENTIAL_CITIES_READY:
      return { ...state, raCityList: action.payload.raCityList };
    case ContactActionTypes.LOAD_PERMANENT_STATES_READY:
      return {
        ...state,
        paStateList: action.payload.paStateList,
        paCityList: []
      };
    case ContactActionTypes.LOAD_PERMANENT_CITIES_READY:
      return { ...state, paCityList: action.payload.paCityList };

    case ContactActionTypes.LOAD_NEXT_OF_KIN_STATES_READY:
      return {
        ...state,
        nokStateList: action.payload.nokStateList,
        nokCityList: []
      };
    case ContactActionTypes.LOAD_NEXT_OF_KIN_CITIES_READY:
      return { ...state, nokCityList: action.payload.nokCityList };
    case ContactActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}
