import { initialHRBeneficiaryState, IHRBeneficiaryState } from './beneficiary.state';
import { HRBeneficiaryActions, HRBeneficiaryActionTypes, LoadApprovedDataItemHRBeneficiarySuccess } from './beneficiary.actions';

export function HRbeneficiaryReducer(
  state = initialHRBeneficiaryState,
  action: HRBeneficiaryActions
): IHRBeneficiaryState {
  switch (action.type) {
    case HRBeneficiaryActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HRBeneficiaryActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HRBeneficiaryActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HRBeneficiaryActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HRBeneficiaryActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HRBeneficiaryActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HRBeneficiaryActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case HRBeneficiaryActionTypes.LOAD_APPROVED_DATA_ITEM_SUCCESS:
      const newState = updateState(state, <LoadApprovedDataItemHRBeneficiarySuccess>action);
      return newState;
    case HRBeneficiaryActionTypes.LOAD_APPROVED_PHOTO_SUCCESS:
      return { ...state, approvedPhoto: action.payload };
    case HRBeneficiaryActionTypes.LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS:
      return { ...state, awaitingApprovalPhoto: action.payload };
    case HRBeneficiaryActionTypes.CLEAR_APPROVED_DATA_MAP:
      return { ...state, approvedDataMap: {} };
    case HRBeneficiaryActionTypes.LOAD_STATES_READY:
      return {
        ...state,
        stateList: action.payload.stateList,
        cityList: []
      };
    case HRBeneficiaryActionTypes.LOAD_CITIES_READY:
      return { ...state, cityList: action.payload.cityList };
    case HRBeneficiaryActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case HRBeneficiaryActionTypes.REMOVE_APPROVED_DATA:
      return { ...state, approvedData: state.approvedData.filter(item => item.beneficiary_id !== action.payload.recordId) };
    case HRBeneficiaryActionTypes.REMOVE_AWAITING_APPROVAL_DATA:
      const a1 = state.awaitingApprovalData.filter(item => item.beneficiary_id !== action.payload.recordId);
      return { ...state, awaitingApprovalData: a1 };
    case HRBeneficiaryActionTypes.CLEAR_VIEWER_PHOTO:
      return { ...state, approvedPhoto: null, awaitingApprovalPhoto: null };
    default: {
      return state;
    }
  }
}

function updateState(
  state: IHRBeneficiaryState,
  action: LoadApprovedDataItemHRBeneficiarySuccess
): IHRBeneficiaryState {
  const data = action.payload;
  const newState = Object.assign({}, state);
  newState.approvedDataMap[data.beneficiary_id] = data;
  return newState;
}
