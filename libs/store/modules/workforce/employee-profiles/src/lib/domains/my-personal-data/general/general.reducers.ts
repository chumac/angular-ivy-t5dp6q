import { initialGeneralState, IGeneralState } from './general.state';
import { GeneralActions, GeneralActionTypes } from './general.actions';

export function generalReducer(
  state = initialGeneralState,
  action: GeneralActions
): IGeneralState {
  switch (action.type) {
    case GeneralActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case GeneralActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case GeneralActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case GeneralActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case GeneralActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case GeneralActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case GeneralActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case GeneralActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case GeneralActionTypes.LOAD_AWAITING_APPROVAL_DOCUMENT_SUCCESS:
      return { ...state, awaitingApprovalDocument: action.payload };
    case GeneralActionTypes.LOAD_BIRTH_STATES_READY:
      return {
        ...state,
        birthStateList: action.payload.birthStateList,
        birthCityList: []
      };
    case GeneralActionTypes.LOAD_BIRTH_CITIES_READY:
      return { ...state, birthCityList: action.payload.birthCityList };
    case GeneralActionTypes.LOAD_STATE_OF_ORIGIN_READY:
      return {
        ...state,
        stateOfOriginList: action.payload.stateOfOriginList,
        lgaList: []
      };
    case GeneralActionTypes.LOAD_LGAs_READY:
      return { ...state, lgaList: action.payload.lgaList };
    case GeneralActionTypes.CLEAR_DATA:
      return { ...state, approvedData: null, awaitingApprovalData: null, awaitingApprovalDocument: null };
    default: {
      return state;
    }
  }
}
