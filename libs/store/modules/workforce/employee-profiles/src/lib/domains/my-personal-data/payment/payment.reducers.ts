import { initialPaymentState, IPaymentState } from './payment.state';
import { PaymentActions, PaymentActionTypes } from './payment.actions';

export function paymentReducer(state = initialPaymentState, action: PaymentActions): IPaymentState {
  switch (action.type) {
    case PaymentActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PaymentActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case PaymentActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case PaymentActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case PaymentActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case PaymentActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case PaymentActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case PaymentActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    default: {
      return state;
  }
  }
}
