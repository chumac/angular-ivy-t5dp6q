import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IRunState } from './run.state';
import { IRootState } from '../../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getRunState = createSelector(getState, (state: IRootState) => state.run);

export const getPayrollProfileData = createSelector(
  getRunState,
  (state: IRunState) => state.payrollProfiles
);

export const showEditorPayrollRun = createSelector(
  getRunState,
  (state: IRunState) => state.showEditor
);

export const showRecoverEditorPayrollRun = createSelector(
  getRunState,
  (state: IRunState) => state.showRecoverEditor
);


export const isProcessingPayrollRun = createSelector(
  getRunState,
  (state: IRunState) => state.isProcessing
);

export const isLoadingPayrollRun = createSelector(
  getRunState,
  (state: IRunState) => state.isLoading
);

export const getPayrollRunGroupSelectOption = createSelector(
  getRunState,
  (state: IRunState) => state.payrollGroupSelectOption
);

export const getPaymentGroupSelectOption = createSelector(
  getRunState,
  (state: IRunState) => state.paygroupSelectOption
);

export const getPayGradeSelectOption = createSelector(
  getRunState,
  (state: IRunState) => state.gradeSelectOption
);

export const getBrResponseBeforeRun = createSelector(
  getRunState,
  (state: IRunState) => state.canRun
);

export const getEmployeeSelectOption = createSelector(
  getRunState,
  (state: IRunState) => state.employeeSelectOption
);

export const getListOfPossibleReturns = createSelector(
  getRunState,
  (state: IRunState) => state.possibleReturns
);
