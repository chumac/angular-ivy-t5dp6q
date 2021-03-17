import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEducationGradesState } from './educational-grade.state';
import { ILookupState } from '../../store';


const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getEducationGradesState = createSelector(getState, (state: ILookupState) => state.educationGrades);

export const getEducationGrades = createSelector(
  getEducationGradesState,
  (state: IEducationGradesState) => state.gradeData
);

export const showEditorEducationGrades = createSelector(
  getEducationGradesState,
  (state: IEducationGradesState) => state.showEditor
);


export const isProcessingEducationGrades = createSelector(
  getEducationGradesState,
  (state: IEducationGradesState) => state.isProcessing
);


