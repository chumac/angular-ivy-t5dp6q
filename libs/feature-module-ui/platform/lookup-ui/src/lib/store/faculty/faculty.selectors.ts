import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IFacultyState } from './faculty.state';
import { ILookupState } from '../../store';


const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getFacultyState = createSelector(getState, (state: ILookupState) => state.faculty);

export const getFaculty = createSelector(
  getFacultyState,
  (state: IFacultyState) => state.facultyData
);


export const showEditorFaculty = createSelector(
  getFacultyState,
  (state: IFacultyState) => state.showEditor
);


export const isProcessingFaculty = createSelector(
  getFacultyState,
  (state: IFacultyState) => state.isProcessing
);

export const isLoadingFaculty = createSelector(
  getFacultyState,
  (state: IFacultyState) => state.isLoading
);

