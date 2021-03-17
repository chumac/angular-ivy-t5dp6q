import { createSelector } from '@ngrx/store';

import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';

import { IDisciplinaryActionState } from './disciplinary-action.state';

export const getDisciplinaryActionState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.disciplinaryActions
);

export const showEditorDisciplinaryAction = createSelector(
  getDisciplinaryActionState,
  (state: IDisciplinaryActionState) => state.showEditor
);

export const showViewerDisciplinaryAction = createSelector(
  getDisciplinaryActionState,
  (state: IDisciplinaryActionState) => state.showViewer
);

export const isDisciplinaryActionProcessing = createSelector(
  getDisciplinaryActionState,
  (state: IDisciplinaryActionState) => state.showViewer
);

export const getDisciplinaryActionApprovedData = createSelector(
  getDisciplinaryActionState,
  (state: IDisciplinaryActionState) => state.approvedData
);

export const getDisciplinaryActionAwaitingApprovalData = createSelector(
  getDisciplinaryActionState,
  (state: IDisciplinaryActionState) => state.awaitingApprovalData
);