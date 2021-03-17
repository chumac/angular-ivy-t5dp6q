import { initialTransferHistoryState, ITransferHistoryState } from "./transfer-history.state";
import { TransferHistoryActions, TransferHistoryActionTypes } from "./transfer-history.actions";

export function transferHistoryReducer(state = initialTransferHistoryState, action: TransferHistoryActions): ITransferHistoryState {
  switch (action.type) {
    case TransferHistoryActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true }
    case TransferHistoryActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false }
    case TransferHistoryActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true }
    case TransferHistoryActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false }
    case TransferHistoryActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true }
    case TransferHistoryActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false }
    case TransferHistoryActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload }
    case TransferHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload }
    case TransferHistoryActionTypes.HR_RESET_DATA:
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