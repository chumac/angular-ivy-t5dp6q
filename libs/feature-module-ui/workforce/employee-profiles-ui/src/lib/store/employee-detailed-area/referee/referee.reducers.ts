import { initialRefereeState, IRefereeState } from './referee.state';
import { RefereeActions, RefereeActionTypes } from './referee.actions';

export function refereeReducer(
  state = initialRefereeState,
  action: RefereeActions
): IRefereeState {
  switch (action.type) {
    case RefereeActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case RefereeActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case RefereeActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case RefereeActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case RefereeActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case RefereeActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case RefereeActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case RefereeActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case RefereeActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case RefereeActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS:
      return { ...state, inlineDocument: action.payload };
    case RefereeActionTypes.LOAD_APPROVED_PHOTO_SUCCESS:
      return { ...state, approvedPhoto: action.payload };
    case RefereeActionTypes.LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS:
      return { ...state, awaitingApprovalPhoto: action.payload };
    case RefereeActionTypes.REMOVE_APPROVED_DATA:
      return { ...state, approvedData: state.approvedData.filter(item => item.ref_id !== action.payload.recordId) };
    case RefereeActionTypes.REMOVE_AWAITING_APPROVAL_DATA:
      const a1 = state.awaitingApprovalData.filter(item => item.ref_id !== action.payload.recordId);
      return { ...state, awaitingApprovalData: a1 };
    case RefereeActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    case RefereeActionTypes.CLEAR_VIEWER_PHOTO:
      return { ...state, approvedPhoto: null, awaitingApprovalPhoto: null };
    default: {
      return state;
    }
  }
}
