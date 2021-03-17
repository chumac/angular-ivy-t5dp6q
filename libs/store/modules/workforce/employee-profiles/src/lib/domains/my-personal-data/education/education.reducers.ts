import { initialEducationState, IEducationState } from './education.state';
import { EducationActions, EducationActionTypes, LoadApprovedDataItemEducationSuccess } from './education.actions';

export function educationReducer(
  state = initialEducationState,
  action: EducationActions
): IEducationState {
  switch (action.type) {
    case EducationActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case EducationActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case EducationActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case EducationActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case EducationActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case EducationActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case EducationActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case EducationActionTypes.LOAD_INSTITUTION_LIST_SUCCESS:
      return { ...state, institutionsList: action.payload };
    case EducationActionTypes.LOAD_INSTITUTION_LIST:
      return { ...state, institutionsList: [] };
    case EducationActionTypes.LOAD_ALL_INSTITUTION_LIST:
      return { ...state, institutionsList: [] };
    case EducationActionTypes.LOAD_COUNTRY_LIST_SUCCESS:
      return { ...state, countryList: action.payload };
    case EducationActionTypes.LOAD_APPROVED_DATA_ITEM_SUCCESS:
      const newState = updateState(state, <LoadApprovedDataItemEducationSuccess>action);
      return newState;
    case EducationActionTypes.CLEAR_APPROVED_DATA_MAP:
      return { ...state, approvedDataMap: {} };
    case EducationActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case EducationActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case EducationActionTypes.REMOVE_APPROVED_DATA:
      return { ...state, approvedData: state.approvedData.filter(item => item.edu_id !== action.payload.recordId) };
    case EducationActionTypes.REMOVE_AWAITING_APPROVAL_DATA:
      const filteredData = state.awaitingApprovalData.filter(item => item.edu_id !== action.payload.recordId);
      return { ...state, awaitingApprovalData: filteredData };
    case EducationActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

function updateState(
  state: IEducationState,
  action: LoadApprovedDataItemEducationSuccess
): IEducationState {
  const data = action.payload;

  const newState = Object.assign({}, state);

  newState.approvedDataMap[data.edu_id] = data;

  return newState;
}
