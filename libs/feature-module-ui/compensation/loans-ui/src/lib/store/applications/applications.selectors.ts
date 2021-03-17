import { createSelector } from '@ngrx/store';

import { ILoanState, getLoanState } from '../root/root.state';
import { IApplicationsState } from './applications.state';

export const getApplicationState = createSelector(
  getLoanState,
  (state: ILoanState) => state.applications
);

export const isProcessingApplication = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.isProcessing
);

export const isLoadingApplication = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.isLoading
);

export const showEditorApplication = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.showEditor
);

export const showViewerActualSchedule = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.showActualScheduleViewer
);

export const showViewerGenericSchedule = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.showGenericScheduleViewer
);

export const showViewerStandardSchedule = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.showStandardScheduleViewer
);

export const showViewerRepaymentSchedule = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.showRepaymentScheduleViewer
);

export const showApplyViewer = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.showViewer
);

export const saveSuccess = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.saveSuccess
);

export const getAllDataApplication = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.allApplicationsData
);

export const getMonthlyDeductionAmount = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.monthlyDeduction
);

export const getApprovedDataApplication = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.approvedData
);

export const getAwaitingApprovalDataApplication = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.awaitingApprovalData
);

export const getLoanDefinitionsDataApplication = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.definitionsList
);

export const getLoanCurrenciesDataApplication = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.currenciesList
);

export const getStandardScheduleData = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.standardScheduleData
);

export const getRepaymentSchedule = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.repaymentScheduleData
);

export const getActualSchedule = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.actualScheduleData
);

export const getGenericSchedule = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.genericScheduleData
);

export const getClosedDataApplications = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.closedData
);

export const getApplicationDocument = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.document
);

export const getLoanTypesSelect = createSelector(
  getApplicationState,
  (state: IApplicationsState) => state.loanTypesSelect
);
