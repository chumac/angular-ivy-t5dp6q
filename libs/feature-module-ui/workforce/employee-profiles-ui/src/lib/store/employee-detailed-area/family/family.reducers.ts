import { initialFamilyState, IFamilyState } from './family.state';
import { FamilyActions, FamilyActionTypes, LoadApprovedDataItemFamilySuccess } from './family.actions';

export function familyReducer(
  state = initialFamilyState,
  action: FamilyActions
): IFamilyState {
  switch (action.type) {
    case FamilyActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case FamilyActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case FamilyActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case FamilyActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case FamilyActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case FamilyActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case FamilyActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case FamilyActionTypes.LOAD_APPROVED_DATA_ITEM_SUCCESS:
      const newState = updateState(state, <LoadApprovedDataItemFamilySuccess>action);
      return newState;
    case FamilyActionTypes.CLEAR_APPROVED_DATA_MAP:
      return { ...state, approvedDataMap: {} };
    case FamilyActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case FamilyActionTypes.LOAD_STATES_READY:
      return { ...state, stateList: action.payload.stateList, cityList: [] };
    case FamilyActionTypes.LOAD_CITIES_READY:
      return { ...state, cityList: action.payload.cityList };
    case FamilyActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case FamilyActionTypes.LOAD_APPROVED_PHOTO_SUCCESS:
      return { ...state, approvedPhoto: action.payload };
    case FamilyActionTypes.LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS:
      return { ...state, awaitingApprovalPhoto: action.payload };
    case FamilyActionTypes.REMOVE_APPROVED_DATA:
      return { ...state, approvedData: state.approvedData.filter(item => item.family_id !== action.payload.recordId) };
    case FamilyActionTypes.REMOVE_AWAITING_APPROVAL_DATA:
      const a1 = state.awaitingApprovalData.filter(item => item.family_id !== action.payload.recordId);
      return { ...state, awaitingApprovalData: a1 };
    case FamilyActionTypes.CLEAR_VIEWER_PHOTO:
      return { ...state, approvedPhoto: null, awaitingApprovalPhoto: null };
    case FamilyActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

function updateState(
  state: IFamilyState,
  action: LoadApprovedDataItemFamilySuccess
): IFamilyState {
  const data = action.payload;

  const newState = Object.assign({}, state);

  newState.approvedDataMap[data.family_id] = data;

  return newState;
}
