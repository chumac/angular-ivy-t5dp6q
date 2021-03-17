import {
  initialPayDeskState,
  IPayDeskState
} from './pay-desk.state';
import {
  PayDeskActions,
  PayDeskActionTypes
} from './pay-desk.actions';

export function payDeskReducer(
  state = initialPayDeskState,
  action: PayDeskActions
): IPayDeskState {
  switch (action.type) {
    case PayDeskActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PayDeskActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };

    case PayDeskActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case PayDeskActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };

    case PayDeskActionTypes.PROCESSING_DATA:
      return { ...state, isProcessing: true };
    case PayDeskActionTypes.NOT_PROCESSING_DATA:
      return { ...state, isProcessing: false };

    case PayDeskActionTypes.LOADING_DATA:
      return { ...state, isLoading: true };
    case PayDeskActionTypes.NOT_LOADING_DATA:
      return { ...state, isLoading: false };

    case PayDeskActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };

    case PayDeskActionTypes.LOAD_PAYMENT_PLATFORM_DATA_SUCCESS:
      return { ...state, paymentPlatforms: action.payload };

    default: {
      return state;
    }
  }
}
