import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ICourseState } from './course.state';
import { getLearningState, ILearningState } from '../../root/learning.state';

export const getcourseState = createSelector(
  getLearningState,
  (state: ILearningState) => state.course
);

export const getcourseData = createSelector(
  getcourseState,
  (state: ICourseState) => state.CourseData
);

export const isProcessingcourse = createSelector(
  getcourseState,
  (state: ICourseState) => state.isProcessing
);

export const showEditorcourse = createSelector(
  getcourseState,
  (state: ICourseState) => state.showEditor
);

export const showViewercourse = createSelector(
  getcourseState,
  (state: ICourseState) => state.showViewer
);