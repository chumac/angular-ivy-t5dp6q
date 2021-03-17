import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ICourseCategoryState } from './course-category.state';
import { getLearningState, ILearningState } from '../../root/learning.state';

export const getCourseCategoryState = createSelector(
  getLearningState,
  (state: ILearningState) => state.courseCategory
);

export const getcourseCategoryData = createSelector(
  getCourseCategoryState,
  (state: ICourseCategoryState) => state.courseCategoryData
);

export const isProcessingCourseCategory = createSelector(
  getCourseCategoryState,
  (state: ICourseCategoryState) => state.isProcessing
);

export const showEditorCourseCategory = createSelector(
  getCourseCategoryState,
  (state: ICourseCategoryState) => state.showEditor
);

export const showViewerCourseCategory = createSelector(
  getCourseCategoryState,
  (state: ICourseCategoryState) => state.showViewer
);