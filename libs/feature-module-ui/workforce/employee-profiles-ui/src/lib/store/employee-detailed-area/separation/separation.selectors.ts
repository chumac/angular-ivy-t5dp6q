import { createSelector } from '@ngrx/store';

import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';

import { ISeparationState } from './separation.state';

export const getSeparationState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.separation
);

export const showEditorSeparation = createSelector(
  getSeparationState,
  (state: ISeparationState) => state.showEditor
);

export const showViewerSeparation = createSelector(
  getSeparationState,
  (state: ISeparationState) => state.showViewer
);

export const isSeparationProcessing = createSelector(
  getSeparationState,
  (state: ISeparationState) => state.showViewer
);

export const getSeparationApprovedData = createSelector(
  getSeparationState,
  (state: ISeparationState) => state.approvedData
);

export const getSeparationAwaitingApprovalData = createSelector(
  getSeparationState,
  (state: ISeparationState) => state.awaitingApprovalData
);