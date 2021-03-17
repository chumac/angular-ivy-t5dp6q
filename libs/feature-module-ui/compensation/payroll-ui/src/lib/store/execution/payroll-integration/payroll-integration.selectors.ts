import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IPayrollIntegrationState } from './payroll-integration.state';
import { IRootState } from '../../root/root.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getPayrollIntegrationState = createSelector(getState, (state: IRootState) => state.payrollIntegration);

export const getPayrollIntegrationData = createSelector(
  getPayrollIntegrationState,
  (state: IPayrollIntegrationState) => state.data
);

export const showEditorPayrollIntegration = createSelector(
  getPayrollIntegrationState,
  (state: IPayrollIntegrationState) => state.showEditor
);

export const showViewerPayrollIntegration = createSelector(
  getPayrollIntegrationState,
  (state: IPayrollIntegrationState) => state.showViewer
);

export const isProcessingPayrollIntegration = createSelector(
  getPayrollIntegrationState,
  (state: IPayrollIntegrationState) => state.isProcessing
);

export const isLoadingPayrollIntegration = createSelector(
  getPayrollIntegrationState,
  (state: IPayrollIntegrationState) => state.isLoading
);

export const getMonthListPayrollIntegration = createSelector(
  getPayrollIntegrationState,
  (state: IPayrollIntegrationState) => state.monthList
);

export const getYearListPayrollIntegration = createSelector(
  getPayrollIntegrationState,
  (state: IPayrollIntegrationState) => state.yearList
);

export const getFormatListPayrollIntegration = createSelector(
  getPayrollIntegrationState,
  (state: IPayrollIntegrationState) => state.formatList
);

export const getSourceListPayrollIntegration = createSelector(
  getPayrollIntegrationState,
  (state: IPayrollIntegrationState) => state.sourceList
);

export const getPayrollProfileListPayrollIntegration = createSelector(
  getPayrollIntegrationState,
  (state: IPayrollIntegrationState) => state.payrollProfileList
);
