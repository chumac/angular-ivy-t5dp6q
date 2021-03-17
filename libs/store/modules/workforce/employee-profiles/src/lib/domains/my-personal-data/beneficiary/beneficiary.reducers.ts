import { initialBeneficiaryState, IBeneficiaryState } from './beneficiary.state';
import { BeneficiaryActions, BeneficiaryActionTypes, LoadApprovedDataItemBeneficiarySuccess } from './beneficiary.actions';

export function beneficiaryReducer(
  state = initialBeneficiaryState,
  action: BeneficiaryActions
): IBeneficiaryState {
  switch (action.type) {
    case BeneficiaryActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case BeneficiaryActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case BeneficiaryActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case BeneficiaryActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case BeneficiaryActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case BeneficiaryActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case BeneficiaryActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case BeneficiaryActionTypes.LOAD_APPROVED_DATA_ITEM_SUCCESS:
      const newState = updateState(state, <LoadApprovedDataItemBeneficiarySuccess>action);
      return newState;
    case BeneficiaryActionTypes.LOAD_APPROVED_PHOTO_SUCCESS:
      return { ...state, approvedPhoto: action.payload };
    case BeneficiaryActionTypes.LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS:
      return { ...state, awaitingApprovalPhoto: action.payload };
    case BeneficiaryActionTypes.CLEAR_APPROVED_DATA_MAP:
      return { ...state, approvedDataMap: {} };
    case BeneficiaryActionTypes.LOAD_STATES_READY:
      return {
        ...state,
        stateList: action.payload.stateList,
        cityList: []
      };
    case BeneficiaryActionTypes.LOAD_CITIES_READY:
      return { ...state, cityList: action.payload.cityList };
    case BeneficiaryActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case BeneficiaryActionTypes.REMOVE_APPROVED_DATA:
      return { ...state, approvedData: state.approvedData.filter(item => item.beneficiary_id !== action.payload.recordId) };
    case BeneficiaryActionTypes.REMOVE_AWAITING_APPROVAL_DATA:
      const a1 = state.awaitingApprovalData.filter(item => item.beneficiary_id !== action.payload.recordId);
      return { ...state, awaitingApprovalData: a1 };
    case BeneficiaryActionTypes.CLEAR_VIEWER_PHOTO:
      return { ...state, approvedPhoto: null, awaitingApprovalPhoto: null };
    default: {
      return state;
    }
  }
}

function updateState(
  state: IBeneficiaryState,
  action: LoadApprovedDataItemBeneficiarySuccess
): IBeneficiaryState {
  const data = action.payload;
  const newState = Object.assign({}, state);
  newState.approvedDataMap[data.beneficiary_id] = data;
  return newState;
}