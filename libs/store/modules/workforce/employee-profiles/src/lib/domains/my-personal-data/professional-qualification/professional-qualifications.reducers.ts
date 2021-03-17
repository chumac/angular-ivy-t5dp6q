import { initialProfessionalQualificationsState, IProfessionalQualificationsState } from './professional-qualifications.state';
import { ProfessionalQualificationsActions, ProfessionalQualificationsActionTypes, LoadApprovedDataItemProfessionalQualificationsSuccess } from './professional-qualifications.actions';

export function professionalQualificationsReducer(
  state = initialProfessionalQualificationsState,
  action: ProfessionalQualificationsActions
): IProfessionalQualificationsState {
  switch (action.type) {
    case ProfessionalQualificationsActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ProfessionalQualificationsActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ProfessionalQualificationsActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ProfessionalQualificationsActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ProfessionalQualificationsActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ProfessionalQualificationsActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ProfessionalQualificationsActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case ProfessionalQualificationsActionTypes.LOAD_APPROVED_DATA_ITEM_SUCCESS:
      const newState = updateState(state, <LoadApprovedDataItemProfessionalQualificationsSuccess>action);
      return newState;
    case ProfessionalQualificationsActionTypes.CLEAR_APPROVED_DATA_MAP:
      return { ...state, approvedDataMap: {} };
    case ProfessionalQualificationsActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case ProfessionalQualificationsActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ProfessionalQualificationsActionTypes.REMOVE_APPROVED_DATA:
      return { ...state, approvedData: state.approvedData.filter(item => item.proqual_id !== action.payload.recordId) };
    case ProfessionalQualificationsActionTypes.REMOVE_AWAITING_APPROVAL_DATA:
      const a1 = state.awaitingApprovalData.filter(item => item.proqual_id !== action.payload.recordId);
      return { ...state, awaitingApprovalData: a1 };
    case ProfessionalQualificationsActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

function updateState(
  state: IProfessionalQualificationsState,
  action: LoadApprovedDataItemProfessionalQualificationsSuccess
): IProfessionalQualificationsState {
  const data = action.payload;

  const newState = Object.assign({}, state);

  newState.approvedDataMap[data.proqual_id] = data;

  return newState;
}