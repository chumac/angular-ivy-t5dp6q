import {
  initialSubscriptionState,
  ISubscriptionState
} from './subscription.state';
import {
  SubscriptionActions,
  SubscriptionActionTypes
} from './subscription.actions';

export function subscriptionReducer(
  state = initialSubscriptionState,
  action: SubscriptionActions
): ISubscriptionState {
  switch (action.type) {
    case SubscriptionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case SubscriptionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case SubscriptionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case SubscriptionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case SubscriptionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case SubscriptionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case SubscriptionActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case SubscriptionActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };
    case SubscriptionActionTypes.LOAD_PROCESSED_DATA_SUCCESS:
      return { ...state, processedData: action.payload };
    case SubscriptionActionTypes.LOAD_SUBSCRIPTION_TYPE_SUCCESS:
      return { ...state, subscriptionType: action.payload };
    case SubscriptionActionTypes.LOAD_MEMBERSHIP_LIST_SUCCESS:
      return { ...state, membershipList: action.payload };
    case SubscriptionActionTypes.LOAD_CURRENCY_LIST_SUCCESS:
      return { ...state, currencyList: action.payload };
    default: {
      return state;
    }
  }
}
