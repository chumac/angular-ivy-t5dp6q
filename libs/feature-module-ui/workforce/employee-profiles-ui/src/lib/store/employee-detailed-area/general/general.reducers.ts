import { initialGeneralState, IGeneralState } from './general.state';
import { GeneralActions, GeneralActionTypes } from './general.actions';

export function generalReducer(
  state = initialGeneralState,
  action: GeneralActions
): IGeneralState {
  switch (action.type) {
    case GeneralActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true };
    case GeneralActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false };
    case GeneralActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true };
    case GeneralActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false };
    case GeneralActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true };
    case GeneralActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case GeneralActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case GeneralActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case GeneralActionTypes.HR_LOAD_AWAITING_APPROVAL_DOCUMENT_SUCCESS:
      return { ...state, awaitingApprovalDocument: action.payload };
    case GeneralActionTypes.HR_LOAD_BIRTH_STATES_READY:
      return {
        ...state,
        birthStateList: action.payload.birthStateList,
        birthCityList: []
      };
    case GeneralActionTypes.HR_LOAD_BIRTH_CITIES_READY:
      return { ...state, birthCityList: action.payload.birthCityList };
    case GeneralActionTypes.HR_LOAD_STATE_OF_ORIGIN_READY:
      return {
        ...state,
        stateOfOriginList: action.payload.stateOfOriginList,
        lgaList: []
      };
    case GeneralActionTypes.HR_LOAD_LGAs_READY:
      return { ...state, lgaList: action.payload.lgaList };
    case GeneralActionTypes.HR_RESET_DATA:
      return {
        ...state,
        approvedData: null,
        awaitingApprovalData: null,
        awaitingApprovalDocument: null,
        birthStateList: [],
        birthCityList: [],
        stateOfOriginList: [],
        lgaList: [],
        isProcessing: false,
        showEditor: false,
        showViewer: false
      }
    default: {
      return state;
    }
  }
}
