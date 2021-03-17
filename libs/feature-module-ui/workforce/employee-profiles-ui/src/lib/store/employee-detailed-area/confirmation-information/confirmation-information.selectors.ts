import { createSelector } from '@ngrx/store';

import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';

import { IConfirmationInformationState } from './confirmation-information.state';

export const getConfirmationInformationState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.confirmationInformation
);

export const showEditorConfirmationInformation = createSelector(
  getConfirmationInformationState,
  (state: IConfirmationInformationState) => state.showEditor
);

export const showViewerConfirmationInformation = createSelector(
  getConfirmationInformationState,
  (state: IConfirmationInformationState) => state.showViewer
);

export const isConfirmationInformationProcessing = createSelector(
  getConfirmationInformationState,
  (state: IConfirmationInformationState) => state.showViewer
);

export const getConfirmationInformationApprovedData = createSelector(
  getConfirmationInformationState,
  (state: IConfirmationInformationState) => state.approvedData
);

export const getConfirmationInformationAwaitingApprovalData = createSelector(
  getConfirmationInformationState,
  (state: IConfirmationInformationState) => state.awaitingApprovalData
);