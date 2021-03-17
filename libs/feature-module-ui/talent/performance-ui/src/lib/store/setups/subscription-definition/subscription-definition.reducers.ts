import { initialSubscriptionDefinitionState, ISubscriptionDefinitionState } from './subscription-definition.state';
import { SubscriptionDefinitionActions, SubscriptionDefinitionActionTypes } from './subscription-definition.actions';

export function subscriptionDefinitionReducer(
  state = initialSubscriptionDefinitionState,
  action: SubscriptionDefinitionActions
): ISubscriptionDefinitionState {
  switch (action.type) {
    case SubscriptionDefinitionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case SubscriptionDefinitionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case SubscriptionDefinitionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case SubscriptionDefinitionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case SubscriptionDefinitionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case SubscriptionDefinitionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case SubscriptionDefinitionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, subscriptionDefinitionData: action.payload };
    case SubscriptionDefinitionActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case SubscriptionDefinitionActionTypes.LOAD_SUBSCRIPTION_PAGE_LIST_SUCCESS:
      return { ...state, subscriptionPagesList: action.payload };
    case SubscriptionDefinitionActionTypes.REMOVE_DATA:
      return { ...state, subscriptionDefinitionData: state.subscriptionDefinitionData.filter(item => item.id !== action.payload.recordId)};
    case SubscriptionDefinitionActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state; 
    }
  }
}

