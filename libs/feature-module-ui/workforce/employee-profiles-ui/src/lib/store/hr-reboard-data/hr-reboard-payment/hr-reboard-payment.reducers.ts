import { initialHrReboardPaymentState, IHrReboardPaymentState } from './hr-reboard-payment.state';
import { HrReboardPaymentActions, HrReboardPaymentActionTypes } from './hr-reboard-payment.actions';

export function hrReboardPaymentReducer(state = initialHrReboardPaymentState, action: HrReboardPaymentActions): IHrReboardPaymentState {
  switch (action.type) {
    case HrReboardPaymentActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case HrReboardPaymentActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case HrReboardPaymentActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case HrReboardPaymentActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case HrReboardPaymentActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case HrReboardPaymentActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case HrReboardPaymentActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    default: {
      return state;
  }
  }
}
