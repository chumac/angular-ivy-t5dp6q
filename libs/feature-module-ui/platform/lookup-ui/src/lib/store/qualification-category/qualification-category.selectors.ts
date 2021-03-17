import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IQualificationCategoryState } from './qualification-category.state';
import { ILookupState } from '../../store';


const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getQualificationCategoryState = createSelector(getState, (state: ILookupState) => state.qualificationCategory);

export const getQualificationCategory = createSelector(
  getQualificationCategoryState,
  (state: IQualificationCategoryState) => state.category
);

export const isProcessingQualificationCategory = createSelector(
  getQualificationCategoryState,
  (state: IQualificationCategoryState) => state.isProcessing
);

export const showEditorQualificationCategory = createSelector(
  getQualificationCategoryState,
  (state: IQualificationCategoryState) => state.showEditor
);



