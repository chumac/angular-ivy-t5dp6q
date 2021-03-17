import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IDepartmentState } from './department.state';
import { ILookupState } from '../../store';


const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getDepartmentState = createSelector(getState, (state: ILookupState) => state.department);

export const getDepartment = createSelector(
  getDepartmentState,
  (state: IDepartmentState) => state.departmentData
);


export const showEditorDepartment = createSelector(
  getDepartmentState,
  (state: IDepartmentState) => state.showEditor
);


export const isProcessingDepartment = createSelector(
  getDepartmentState,
  (state: IDepartmentState) => state.isProcessing
);

export const isLoadingDepartment = createSelector(
  getDepartmentState,
  (state: IDepartmentState) => state.isLoading
);

