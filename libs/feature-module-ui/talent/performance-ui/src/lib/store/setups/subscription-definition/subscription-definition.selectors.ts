import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ISubscriptionDefinitionState } from './subscription-definition.state';
import { ISubscriptionDefinition } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getSubscriptionDefinitionState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.subscriptionDefinitionSetup
);

export const isProcessingSubscriptionDefinition = createSelector(
  getSubscriptionDefinitionState,
  (state: ISubscriptionDefinitionState) => state.isProcessing
);

export const showEditorSubscriptionDefinition = createSelector(
  getSubscriptionDefinitionState,
  (state: ISubscriptionDefinitionState) => state.showEditor
);

export const showViewerSubscriptionDefinition = createSelector(
  getSubscriptionDefinitionState,
  (state: ISubscriptionDefinitionState) => state.showViewer
);

export const getSubscriptionDefinitionData = createSelector(
  getSubscriptionDefinitionState,
  (state: ISubscriptionDefinitionState) => state.subscriptionDefinitionData
);

export const getSubscriptionDefinitionDocument = createSelector(
  getSubscriptionDefinitionState,
  (state: ISubscriptionDefinitionState) => state.document
); 

export const getSubscriptionPageListSubscriptionDefinition = createSelector(
  getSubscriptionDefinitionState,
  (state: ISubscriptionDefinitionState) => state.subscriptionPagesList
);
