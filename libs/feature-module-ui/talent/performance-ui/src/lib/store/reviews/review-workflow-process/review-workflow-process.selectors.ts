import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPerformanceState } from '../../root';
import { IReviewWorkflowProcessState } from './review-workflow-process.state';

const getState = createFeatureSelector<IPerformanceState>('performance');
const getReviewWorkflowProcessState = createSelector(getState, (state: IPerformanceState) => state.reviewWorkflowProcess);

export const getDataReviewWorkflowProcess = createSelector(getReviewWorkflowProcessState, (state: IReviewWorkflowProcessState) => state.data);

export const isLoadingDataReviewWorkflowProcess = createSelector(getReviewWorkflowProcessState, (state: IReviewWorkflowProcessState) => state.isLoading);

export const getResultCommand = createSelector(getReviewWorkflowProcessState, (state: IReviewWorkflowProcessState) => state.resultCommand);
