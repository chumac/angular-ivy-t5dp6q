import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEmployeeStatusState } from './employee-status.state';
import { ILookupState } from '../../store';


const getState = createFeatureSelector<ILookupState>('hr-lookup');
const getEmployeeStatusState = createSelector(getState, (state: ILookupState) => state.employeeStatus);

export const getEmployeeStatus = createSelector(
  getEmployeeStatusState,
  (state: IEmployeeStatusState) => state.statusData
);

export const isProcessingEmployeeStatus = createSelector(
  getEmployeeStatusState,
  (state: IEmployeeStatusState) => state.isProcessing
);

export const showEditorEmployeeStatus = createSelector(
  getEmployeeStatusState,
  (state: IEmployeeStatusState) => state.showEditor
);


