import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IHrResponseQueueState } from './hr-response-queue.state';
import { getState } from '../root/exit.selector';
import { IExitState } from '../root/exit.state';

export const getHrResponseQueueState = createSelector(
  getState,
  (state: IExitState) => state.hrResponseQueue
);

export const isLoadingQueueItems = createSelector(
  getHrResponseQueueState,
  (state: IHrResponseQueueState) => state.isLoading
);

export const isProcessingQueueItems = createSelector(
  getHrResponseQueueState,
  (state: IHrResponseQueueState) => state.isProcessing
);

export const getHrResponseQueueItems = createSelector(
  getHrResponseQueueState,
  (state: IHrResponseQueueState) => state.hrResponseQueue
);

export const getInterviewUrl = createSelector(
  getHrResponseQueueState,
  (state: IHrResponseQueueState) => state.interviewUrl
);

