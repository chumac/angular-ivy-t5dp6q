import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ILearningLibraryState } from './learning-library.state';
import { getLearningState, ILearningState } from '../../root/learning.state';

export const getLearningLibraryState = createSelector(
  getLearningState,
  (state: ILearningState) => state.eventLearningLibrary
);

export const getLearningLibraryData = createSelector(
  getLearningLibraryState,
  (state: ILearningLibraryState) => state.LearningLibraryData
);

export const isProcessingLearningLibrary = createSelector(
  getLearningLibraryState,
  (state: ILearningLibraryState) => state.isProcessing
);

export const showApplyLearningLibrary = createSelector(
  getLearningLibraryState,
  (state: ILearningLibraryState) => state.showApplyEditor
);

export const showEnrollLearningLibrary = createSelector(
  getLearningLibraryState,
  (state: ILearningLibraryState) => state.showEnrollEditor
);
