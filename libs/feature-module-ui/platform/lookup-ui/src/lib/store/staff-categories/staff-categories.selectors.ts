import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IStaffCategoryState } from './staff-categories.state';
import { ILookupState } from '../../store';


const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getStaffCategoryState = createSelector(getState, (state: ILookupState) => state.staffCategory);

export const getStaffCategory = createSelector(
  getStaffCategoryState,
  (state: IStaffCategoryState) => state.staffData
);

export const isProcessingStaffCategory = createSelector(
  getStaffCategoryState,
  (state: IStaffCategoryState) => state.isProcessing
);

export const showEditorStaffCategory = createSelector(
  getStaffCategoryState,
  (state: IStaffCategoryState) => state.showEditor
);


