import { initialConfirmationInformationState, IConfirmationInformationState } from "./confirmation-information.state";
import { ConfirmationInformationActions, ConfirmationInformationActionTypes } from "./confirmation-information.actions";

export function confirmationInformationReducer(state = initialConfirmationInformationState, action: ConfirmationInformationActions): IConfirmationInformationState {
  switch (action.type) {
    case ConfirmationInformationActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true }
    case ConfirmationInformationActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false }
    case ConfirmationInformationActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true }
    case ConfirmationInformationActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false }
    case ConfirmationInformationActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true }
    case ConfirmationInformationActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false }
    case ConfirmationInformationActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload }
    case ConfirmationInformationActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload }
    case ConfirmationInformationActionTypes.HR_RESET_DATA:
      return {
        ...state,
        approvedData: null,
        awaitingApprovalData: null,
        isProcessing: false,
        showEditor: false,
        showViewer: false
      }
    default: {
      return state;
    }
  }
}