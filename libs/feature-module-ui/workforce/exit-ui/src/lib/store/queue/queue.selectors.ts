import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IQueueState } from './queue.state';
import { getState } from '../root/exit.selector';
import { IExitState } from '../root/exit.state';

export const getResignationState = createSelector(
  getState,
  (state: IExitState) => state.queue
);

export const isLoadingQueueItems = createSelector(
  getResignationState,
  (state: IQueueState) => state.isLoading
);

export const isProcessingQueueItems = createSelector(
  getResignationState,
  (state: IQueueState) => state.isProcessing
);

export const getMyQueueItems = createSelector(
  getResignationState,
  (state: IQueueState) => state.myQueue
);

export const getInterviewUrl = createSelector(
  getResignationState,
  (state: IQueueState) => state.interviewUrl
);

