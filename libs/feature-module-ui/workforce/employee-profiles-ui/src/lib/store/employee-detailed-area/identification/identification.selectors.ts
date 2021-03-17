import { createSelector } from '@ngrx/store';

import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';

import { IIdentificationState } from './identification.state';

export const getIdentificationState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.identification
);

export const showEditorIdentification = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.showEditor
);

export const showViewerIdentification = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.showViewer
);

export const getIdentificationApprovedData = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.approvedData
);

export const getIdentificationAwaitingApprovalData = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.awaitingApprovalData
);

export const isProcessingIdentification = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.isProcessing
);

export const getIdentificationGrade = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.grade
);

export const getIdentificationPosition = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.position
);

export const getIdentificationPayGroup = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.payGroup
);

export const getIdentificationJobTitle = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.jobTitle
);

export const getIdentificationActingJobTitle = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.actingJobTitle
);

export const getIdentificationPaymentMode = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.paymentMode
);

export const getIdentificationReportTo = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.reportsTo
);


export const getIdentificationBackUpOfficer = createSelector(
  getIdentificationState,
  (state: IIdentificationState) => state.backupOfficer
);
