import { createSelector } from '@ngrx/store';

import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';

import { ITeamState } from './team.state';

export const getTeamState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.team
);

export const showEditorTeam = createSelector(
  getTeamState,
  (state: ITeamState) => state.showEditor
);

export const showViewerTeam = createSelector(
  getTeamState,
  (state: ITeamState) => state.showViewer
);

export const isTeamProcessing = createSelector(
  getTeamState,
  (state: ITeamState) => state.showViewer
);

export const getTeamApprovedData = createSelector(
  getTeamState,
  (state: ITeamState) => state.approvedData
);

export const getTeamAwaitingApprovalData = createSelector(
  getTeamState,
  (state: ITeamState) => state.awaitingApprovalData
);