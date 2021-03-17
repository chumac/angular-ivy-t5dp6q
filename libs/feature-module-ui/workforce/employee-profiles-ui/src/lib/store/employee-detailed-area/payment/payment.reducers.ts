import { initialPaymentState, IPaymentState } from './payment.state';
import { PaymentActions, PaymentActionTypes } from './payment.actions';

export function paymentReducer(state = initialPaymentState, action: PaymentActions): IPaymentState {
  switch (action.type) {
    case PaymentActionTypes.HR_SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PaymentActionTypes.HR_HIDE_EDITOR:
      return { ...state, showEditor: false };
    case PaymentActionTypes.HR_SHOW_VIEWER:
      return { ...state, showViewer: true };
    case PaymentActionTypes.HR_HIDE_VIEWER:
      return { ...state, showViewer: false };
    case PaymentActionTypes.HR_PROCESSING:
      return { ...state, isProcessing: true };
    case PaymentActionTypes.HR_NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case PaymentActionTypes.HR_LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case PaymentActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case PaymentActionTypes.HR_RESET_DATA:
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
