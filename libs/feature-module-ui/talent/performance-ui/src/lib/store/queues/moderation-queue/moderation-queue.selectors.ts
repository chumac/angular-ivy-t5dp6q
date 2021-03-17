import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPerformanceState } from '../../root';
import { IModerationQueueState } from './moderation-queue.state';

const getState = createFeatureSelector<IPerformanceState>('performance');
const getModerationQueueState = createSelector(getState, (state: IPerformanceState) => state.moderationQueue);

export const getDataModerationQueue = createSelector(getModerationQueueState, (state: IModerationQueueState) => state.data);
