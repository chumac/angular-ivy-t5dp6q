import { initialContactState, IContactState } from './contact.state';
import { ContactActions, ContactActionTypes } from './contact.actions';

export function contactReducer(
  state = initialContactState,
  action: ContactActions
): IContactState {
  switch (action.type) {
    case ContactActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ContactActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ContactActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ContactActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ContactActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true };
    case ContactActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ContactActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case ContactActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case ContactActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_FAILURE:
      return state;
    case ContactActionTypes.HR_LOAD_RESIDENTIAL_STATES_READY:
      return {
        ...state,
        raStateList: action.payload.raStateList,
        raCityList: []
      };
    case ContactActionTypes.HR_LOAD_RESIDENTIAL_CITIES_READY:
      return { ...state, raCityList: action.payload.raCityList };
    case ContactActionTypes.HR_LOAD_PERMANENT_STATES_READY:
      return {
        ...state,
        paStateList: action.payload.paStateList,
        paCityList: []
      };
    case ContactActionTypes.HR_LOAD_PERMANENT_CITIES_READY:
      return { ...state, paCityList: action.payload.paCityList };

    case ContactActionTypes.HR_LOAD_NEXT_OF_KIN_STATES_READY:
      return {
        ...state,
        nokStateList: action.payload.nokStateList,
        nokCityList: []
      };
    case ContactActionTypes.HR_LOAD_NEXT_OF_KIN_CITIES_READY:
      return { ...state, nokCityList: action.payload.nokCityList};
    case ContactActionTypes.HR_RESET_DATA:
      return {
        ...state,
        approvedData: null,
        awaitingApprovalData: null,
        raStateList: [],
        raCityList: [],
        paStateList: [],
        paCityList: [],
        nokStateList: [],
        nokCityList: [],
        isProcessing: false,
        showEditor: false,
        showViewer: false
      }
    default: {
      return state;
  }
  }
}
