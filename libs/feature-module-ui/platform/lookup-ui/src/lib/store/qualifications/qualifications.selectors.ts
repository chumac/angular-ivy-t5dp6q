import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IQualificationState } from './qualifications.state';
import { ILookupState } from '../../store';


const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getQualificationState = createSelector(getState, (state: ILookupState) => state.qualification);

export const getQualification = createSelector(
  getQualificationState,
  (state: IQualificationState) => state.qualificationData
);

export const isProcessingQualification = createSelector(
  getQualificationState,
  (state: IQualificationState) => state.isProcessing
);

export const showEditorQualification = createSelector(
  getQualificationState,
  (state: IQualificationState) => state.showEditor
);

export const getCategory = createSelector(
  getQualificationState,
  (state: IQualificationState) => state.quaCategory
);


