import { initialPayrollPaymentHistoryState, IPayrollPaymentHistoryState } from "./payroll-payment-history.state";
import { PayrollPaymentHistoryActions, PayrollPaymentHistoryActionTypes } from "./payroll-payment-history.actions";

export function payrollPaymentHistoryReducer(state = initialPayrollPaymentHistoryState, action: PayrollPaymentHistoryActions): IPayrollPaymentHistoryState {
  switch (action.type) {
    case PayrollPaymentHistoryActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true }
    case PayrollPaymentHistoryActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false }
    case PayrollPaymentHistoryActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true }
    case PayrollPaymentHistoryActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false }
    case PayrollPaymentHistoryActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true }
    case PayrollPaymentHistoryActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false }
    case PayrollPaymentHistoryActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload }
    case PayrollPaymentHistoryActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload }
    case PayrollPaymentHistoryActionTypes.HR_RESET_DATA:
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