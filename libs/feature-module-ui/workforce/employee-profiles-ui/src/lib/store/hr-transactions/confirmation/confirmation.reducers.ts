import { initialConfirmationState, IConfirmationState } from './confirmation.state';
import { ConfirmationActions, ConfirmationActionTypes } from './confirmation.actions';

export function confirmationReducer(
  state = initialConfirmationState,
  action: ConfirmationActions
): IConfirmationState {
  switch (action.type) {
    case ConfirmationActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ConfirmationActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ConfirmationActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ConfirmationActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ConfirmationActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ConfirmationActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ConfirmationActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case ConfirmationActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case ConfirmationActionTypes.LOAD_TRANSACTION_TYPES_SUCCESS:
      return { ...state, transctionTypes: action.payload };
    case ConfirmationActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case ConfirmationActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}