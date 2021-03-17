import { initialReboardPaymentState, IReboardPaymentState } from './reboard-payment.state';
import { ReboardPaymentActions, ReboardPaymentActionTypes } from './reboard-payment.actions';

export function reboardPaymentReducer(state = initialReboardPaymentState, action: ReboardPaymentActions): IReboardPaymentState {
  switch (action.type) {
    case ReboardPaymentActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReboardPaymentActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReboardPaymentActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReboardPaymentActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReboardPaymentActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReboardPaymentActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReboardPaymentActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    default: {
      return state;
  }
  }
}
