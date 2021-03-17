import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPerformanceState } from '../../root';
import { IHRQueueState } from './hr-queue.state';

const getState = createFeatureSelector<IPerformanceState>('performance');
const getHRQueueState = createSelector(getState, (state: IPerformanceState) => state.hrQueue);

export const getDataHRQueue = createSelector(getHRQueueState, (state: IHRQueueState) => state.data);
