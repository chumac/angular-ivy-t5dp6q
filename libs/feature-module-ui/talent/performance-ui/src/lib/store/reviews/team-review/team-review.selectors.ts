import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPerformanceState } from '../../root';
import { ITeamReviewState } from './team-review.state';

const getState = createFeatureSelector<IPerformanceState>('performance');
const getTeamReviewState = createSelector(getState, (state: IPerformanceState) => state.teamReview);

export const isLoadingTeamReview = createSelector(
  getTeamReviewState,
  (state: ITeamReviewState) => state.isLoading
);
export const getDataTeamReview = createSelector(
  getTeamReviewState,
  (state: ITeamReviewState) => state.data
);
