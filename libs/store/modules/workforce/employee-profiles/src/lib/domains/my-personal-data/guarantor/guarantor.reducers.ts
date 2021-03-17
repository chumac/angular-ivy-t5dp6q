import { initialGuarantorState, IGuarantorState } from './guarantor.state'
import { GuarantorActions, GuarantorActionTypes } from './guarantor.actions';

export function guarantorReducer(
  state = initialGuarantorState,
  action: GuarantorActions
): IGuarantorState {
  switch (action.type) {
    case GuarantorActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case GuarantorActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case GuarantorActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case GuarantorActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case GuarantorActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case GuarantorActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case GuarantorActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case GuarantorActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case GuarantorActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case GuarantorActionTypes.LOAD_INLINE_DOCUMENT:
      return { ...state, inlineDocument: [] };
    case GuarantorActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS:
      return { ...state, inlineDocument: action.payload };

    case GuarantorActionTypes.LOAD_APPROVED_PHOTO_SUCCESS:
      return { ...state, approvedPhoto: action.payload };
    case GuarantorActionTypes.LOAD_AWAITING_APPROVAL_PHOTO_SUCCESS:
      return { ...state, awaitingApprovalPhoto: action.payload };

    case GuarantorActionTypes.REMOVE_APPROVED_DATA:
      return { ...state, approvedData: state.approvedData.filter(item => item.guarantor_id !== action.payload.recordId) };
    case GuarantorActionTypes.REMOVE_AWAITING_APPROVAL_DATA:
      const a1 = state.awaitingApprovalData.filter(item => item.guarantor_id !== action.payload.recordId);
      return { ...state, awaitingApprovalData: a1 };
    case GuarantorActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    case GuarantorActionTypes.CLEAR_VIEWER_PHOTO:
      return { ...state, approvedPhoto: null, awaitingApprovalPhoto: null };

    default: {
      return state;
    }
  }
}
