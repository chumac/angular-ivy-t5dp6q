import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ISubscriptionState } from './subscription.state';
import { ISubscriptionsState } from '../../store/root';

// export const getSubscriptionState = createFeatureSelector<ISubscriptionState>(
//   'subscription'
// );

export const getState = createFeatureSelector<ISubscriptionsState>('subscriptions');
export const getSubscriptionState = createSelector(getState, (state: ISubscriptionsState) => state.subscription);

 
export const isProcessingSubscription = createSelector( 
  getSubscriptionState,
  (state: ISubscriptionState) => state.isProcessing
);

export const showEditorSubscription = createSelector(
  getSubscriptionState,
  (state: ISubscriptionState) => state.showEditor
);

export const showViewerSubscription = createSelector(
  getSubscriptionState,
  (state: ISubscriptionState) => state.showViewer
);

export const getSubscriptionApprovedData = createSelector(
  getSubscriptionState,
  (state: ISubscriptionState) => state.approvedData
);

export const getSubscriptionAwaitingApprovalData = createSelector(
  getSubscriptionState,
  (state: ISubscriptionState) => state.awaitingApprovalData
);

export const getSubscriptionProcessedData = createSelector(
  getSubscriptionState,
  (state: ISubscriptionState) => state.processedData
);


export const getSubscriptionTypeSubscription = createSelector(
  getSubscriptionState,
  (state: ISubscriptionState) => state.subscriptionType
);

export const getSubscriptionMembershipList = createSelector(
  getSubscriptionState,
  (state: ISubscriptionState) => state.membershipList
);

export const getSubscriptionCurrencyList = createSelector(
  getSubscriptionState,
  (state: ISubscriptionState) => state.currencyList
);

