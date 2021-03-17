import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ILearningPlanState } from './learning-plan.state';
import { getLearningState, ILearningState } from '../../root/learning.state';

export const getLearningPlanState = createSelector(
  getLearningState,
  (state: ILearningState) => state.eventLearningPlan
);

export const getLearningPlanData = createSelector(
  getLearningPlanState,
  (state: ILearningPlanState) => state.LearningPlanData
);

export const getLearningPlanGoto = createSelector(
  getLearningPlanState,
  (state: ILearningPlanState) => state.LearningPlanGoto
);

export const isProcessingLearningPlan = createSelector(
  getLearningPlanState,
  (state: ILearningPlanState) => state.isProcessing
);

export const showOptOutEditorLearningPlan = createSelector(
  getLearningPlanState,
  (state: ILearningPlanState) => state.showEditor
);

export const showEditEditorLearningPlan = createSelector(
  getLearningPlanState,
  (state: ILearningPlanState) => state.showEditEditor
);

export const showApplyEditorLearningLibrary = createSelector(
  getLearningPlanState,
  (state: ILearningPlanState) => state.showApplyEditor
);

export const showEnrollEditorLearningLibrary = createSelector(
  getLearningPlanState,
  (state: ILearningPlanState) => state.showEnrollEditor
);
