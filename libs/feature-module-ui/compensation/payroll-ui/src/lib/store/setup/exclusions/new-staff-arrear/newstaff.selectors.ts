import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IRootState } from '../../../root/root.state';
import { IStaffState } from './newstaff.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getRunState = createSelector(getState, (state: IRootState) => state.staff);

// List
export const getStaffEmployeeData = createSelector(
  getRunState,
  (state: IStaffState) => state.staffemployeeList
);

// Dropdown
export const getEmployeeGroupSelectOption = createSelector(
  getRunState,
  (state: IStaffState) => state.employeeGroupSelectOption
);

// Bind active payroll profiles
export const getEmployeePayrollProfiles = createSelector(
  getRunState,
  (state: IStaffState) => state.employeePayrollProfile
);

export const showEditorStaff = createSelector(
  getRunState,
  (state: IStaffState) => state.showEditor
);

// Added by Akash Desai
export const isProcessingStaffRun = createSelector(
  getRunState,
  (state: IStaffState) => state.isProcessing
);

export const isLoadingStaffRun = createSelector(
  getRunState,
  (state: IStaffState) => state.isLoading
);

export const getPayGradeSelectOption = createSelector(
  getRunState,
  (state: IStaffState) => state.gradeSelectOption
);

export const getBrResponseBeforeRun = createSelector(
  getRunState,
  (state: IStaffState) => state.canRun
);

export const getListOfPossibleReturns = createSelector(
  getRunState,
  (state: IStaffState) => state.possibleReturns
);

export const getLoadReturnData = createSelector(
  getRunState,
  (state: IStaffState) => state.getPayrollProfile
);
