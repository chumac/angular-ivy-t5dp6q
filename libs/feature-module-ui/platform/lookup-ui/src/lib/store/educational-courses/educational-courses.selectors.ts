import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEducationalCoursesState } from './educational-courses.state';
import { ILookupState } from '../../store';


const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getEducationalCoursesState = createSelector(getState, (state: ILookupState) => state.educationalCourses);

export const getEducationalCourses = createSelector(
  getEducationalCoursesState,
  (state: IEducationalCoursesState) => state.educationalCoursesData
);

export const isProcessingEducationalCourses = createSelector(
  getEducationalCoursesState,
  (state: IEducationalCoursesState) => state.isProcessing
);

export const showEditorEducationalCourses = createSelector(
  getEducationalCoursesState,
  (state: IEducationalCoursesState) => state.showEditor

);

export const getEducationalCoursesCategory = createSelector(
  getEducationalCoursesState,
  (state: IEducationalCoursesState) => state.category
);
