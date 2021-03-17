import { initialDependantsState, IDependantState } from './dependant.state';
import { DependantsActions, DependantActionTypes, LoadApprovedDataItemDependantSuccess } from './dependant.actions';

export function dependantsReducer(
  state = initialDependantsState,
  action: DependantsActions
): IDependantState {
  switch (action.type) {
    case DependantActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case DependantActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case DependantActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case DependantActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case DependantActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case DependantActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case DependantActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case DependantActionTypes.LOAD_APPROVED_DATA_ITEM_SUCCESS:
      const newState = updateState(state, <LoadApprovedDataItemDependantSuccess>action);
      return newState;
    case DependantActionTypes.CLEAR_APPROVED_DATA_MAP:
      return { ...state, approvedDataMap: {} };
    case DependantActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case DependantActionTypes.LOAD_STATES_READY:
      return { ...state, stateList: action.payload.stateList, cityList: [] };
    case DependantActionTypes.LOAD_CITIES_READY:
      return { ...state, cityList: action.payload.cityList };
    case DependantActionTypes.LOAD_APPROVED_PHOTO_SUCCESS:
      return { ...state, approvedPhoto: action.payload };
    case DependantActionTypes.LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS:
      return { ...state, awaitingApprovalPhoto: action.payload };
    case DependantActionTypes.REMOVE_APPROVED_DATA:
      return { ...state, approvedData: state.approvedData.filter(item => item.dependent_id !== action.payload.recordId) };
    case DependantActionTypes.REMOVE_AWAITING_APPROVAL_DATA:
      const a1 = state.awaitingApprovalData.filter(item => item.dependent_id !== action.payload.recordId);
      return { ...state, awaitingApprovalData: a1 };
    case DependantActionTypes.CLEAR_VIEWER_PHOTO:
      return { ...state, approvedPhoto: null, awaitingApprovalPhoto: null };
    default: {
      return state;
    }
  }
}

function updateState(
  state: IDependantState,
  action: LoadApprovedDataItemDependantSuccess
): IDependantState {
  const data = action.payload;

  const newState = Object.assign({}, state);

  newState.approvedDataMap[data.dependent_id] = data;

  return newState;
}