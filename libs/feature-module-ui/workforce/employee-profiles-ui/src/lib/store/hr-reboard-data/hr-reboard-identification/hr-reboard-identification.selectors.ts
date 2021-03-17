import { createSelector } from '@ngrx/store';

import { IHrReboardIdentificationState } from './hr-reboard-identification.state';

import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getHrReboardIdentificationState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.hrReboardIdentification
);


export const isProcessingHrReboardIdentification = createSelector(
  getHrReboardIdentificationState,
  (state: IHrReboardIdentificationState) => state.isProcessing
);

export const isLoadingHrReboardIdentification = createSelector(
  getHrReboardIdentificationState,
  (state: IHrReboardIdentificationState) => state.isLoading
);

export const showEditorHrReboardIdentification = createSelector(
  getHrReboardIdentificationState,
  (state: IHrReboardIdentificationState) => state.showEditor
);

export const showViewerHrReboardIdentification = createSelector(
  getHrReboardIdentificationState,
  (state: IHrReboardIdentificationState) => state.showViewer
);

export const getHrReboardIdentificationData = createSelector(
  getHrReboardIdentificationState,
  (state: IHrReboardIdentificationState) => state.data
);

export const getSignatureImageHrReboardIdentification = createSelector(
  getHrReboardIdentificationState,
  (state: IHrReboardIdentificationState) => state.signature
);

export const getHrReboardPayGroup = createSelector(
  getHrReboardIdentificationState,
  (state: IHrReboardIdentificationState) => state.paygroupList
);

export const getHrReboardPaygrade = createSelector(
  getHrReboardIdentificationState,
  (state: IHrReboardIdentificationState) => state.gradeList
);

export const getHrReboardPositions = createSelector(
  getHrReboardIdentificationState,
  (state: IHrReboardIdentificationState) => state.positionList
);

export const getHrReboardJobTitles = createSelector(
  getHrReboardIdentificationState,
  (state: IHrReboardIdentificationState) => state.jobTitles
);

export const getHrReboardActingJobTitles = createSelector(
  getHrReboardIdentificationState,
  (state: IHrReboardIdentificationState) => state.actingJobTitles
);

export const getHrReboardReportTos = createSelector(
  getHrReboardIdentificationState,
  (state: IHrReboardIdentificationState) => state.reportTos
);

export const getHrReboardBackupOfficers = createSelector(
  getHrReboardIdentificationState,
  (state: IHrReboardIdentificationState) => state.backupOfficers
);

export const getHrReboardPaymentModes = createSelector(
  getHrReboardIdentificationState,
  (state: IHrReboardIdentificationState) => state.paymentModes
);
