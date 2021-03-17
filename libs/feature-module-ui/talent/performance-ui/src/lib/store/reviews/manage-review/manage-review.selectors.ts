import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IManageReviewState } from './manage-review.state';
import { IPerformanceState } from '../../root';
import { IObjectiveMaster } from '@nutela/models/talent/performance';
import { OBJECTIVE_MASTER_STATUS_TYPES, REVIEW_STATUS_TYPES } from '../../../constants/common';
import { APPROVAL_STATUS } from '@nutela/shared/app-global';

const getState = createFeatureSelector<IPerformanceState>('performance');
const getManageReviewState = createSelector(getState, (state: IPerformanceState) => state.manageReview);

export const isProcessingManageReview = createSelector(
  getManageReviewState,
  (state: IManageReviewState) => state.isProcessing
);

export const showViewerManageReview = createSelector(
  getManageReviewState,
  (state: IManageReviewState) => state.showViewer
);

export const getObjectiveMaster = createSelector(
  getManageReviewState,
  (state: IManageReviewState) => state.objectiveMaster
);

export const loadingObjectiveMasterManageReview = createSelector(
  getManageReviewState,
  (state: IManageReviewState) => state.loadingObjectiveMaster
);

export const getObjectives = createSelector(
  getManageReviewState,
  (state: IManageReviewState) => state.objectives
);

export const getPreScoredObjectives = createSelector(
  getManageReviewState,
  (state: IManageReviewState) => state.preScoredObjectives
);

export const loadingObjectivesManageReview = createSelector(
  getManageReviewState,
  (state: IManageReviewState) => state.loadingObjectives
);

export const getInitiateOrContinueStatus = createSelector(getObjectiveMaster, (data: IObjectiveMaster) => {
  if (data) {
    if (data.approval_status === APPROVAL_STATUS.approved && data.status === OBJECTIVE_MASTER_STATUS_TYPES.planningClosed) {
      return true; // REVIEW_STATUS_TYPES.initiate
    } else if (data.approval_status === APPROVAL_STATUS.approved && data.status === OBJECTIVE_MASTER_STATUS_TYPES.reviewInProgress) {
      return false; // REVIEW_STATUS_TYPES.continue
    } else {
      return true; // REVIEW_STATUS_TYPES.initiate
    }
  } else {
    return true; // REVIEW_STATUS_TYPES.initiate
  }
});

export const canInitiateReview = createSelector(getObjectiveMaster, (data: IObjectiveMaster) => {
  if (data) {
    if ((data.approval_status === APPROVAL_STATUS.approved && data.status === OBJECTIVE_MASTER_STATUS_TYPES.planningClosed)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
});
