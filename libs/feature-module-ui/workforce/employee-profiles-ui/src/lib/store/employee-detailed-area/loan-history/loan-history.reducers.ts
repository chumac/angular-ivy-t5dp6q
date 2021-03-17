import { initialLoanHistoryState, ILoanHistoryState } from "./loan-history.state";
import { LoanHistoryActions, LoanHistoryActionTypes } from "./loan-history.actions";

export function loanHistoryReducer(state = initialLoanHistoryState, action: LoanHistoryActions): ILoanHistoryState {
  switch (action.type) {
    case LoanHistoryActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true }
    case LoanHistoryActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false }
    case LoanHistoryActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true }
    case LoanHistoryActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false }
    case LoanHistoryActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true }
    case LoanHistoryActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false }
    case LoanHistoryActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload }
    case LoanHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload }
    case LoanHistoryActionTypes.HR_RESET_DATA:
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