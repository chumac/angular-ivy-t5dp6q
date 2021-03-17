import { createSelector } from '@ngrx/store';

import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';

import { ICompetencyProfileState } from './competency-profile.state';

export const getCompetencyProfileState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.competencyProfile
);

export const showEditorCompetencyProfile = createSelector(
  getCompetencyProfileState,
  (state: ICompetencyProfileState) => state.showEditor
);

export const showViewerCompetencyProfile = createSelector(
  getCompetencyProfileState,
  (state: ICompetencyProfileState) => state.showViewer
);

export const isCompetencyProfileProcessing = createSelector(
  getCompetencyProfileState,
  (state: ICompetencyProfileState) => state.showViewer
);

export const getCompetencyProfileApprovedData = createSelector(
  getCompetencyProfileState,
  (state: ICompetencyProfileState) => state.approvedData
);

export const getCompetencyProfileAwaitingApprovalData = createSelector(
  getCompetencyProfileState,
  (state: ICompetencyProfileState) => state.awaitingApprovalData
);