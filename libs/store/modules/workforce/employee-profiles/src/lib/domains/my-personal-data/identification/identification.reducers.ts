import { initialIdentificationState, IIdentificationState } from './identification.state';
import { IdentificationActions, IdentificationActionTypes } from './identification.actions';

export function identificationReducer(state = initialIdentificationState, action: IdentificationActions): IIdentificationState {
  switch (action.type) {
    case IdentificationActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case IdentificationActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case IdentificationActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case IdentificationActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case IdentificationActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case IdentificationActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case IdentificationActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case IdentificationActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case IdentificationActionTypes.LOAD_SIGNATURE_IMAGE_SUCCESS:
      return { ...state, signature: action.payload };
    case IdentificationActionTypes.LOAD_AWAITING_APPROVAL_SIGNATURE_IMAGE_SUCCESS:
      return { ...state, awaitingApprovalSignature: action.payload };
    default: {
      return state;
    }
  }
}
