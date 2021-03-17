import { createSelector } from '@ngrx/store';

import { IChecklistState } from './checklist.state';
import { IExitState } from '../../root/exit.state';
import { getState } from '../../root/exit.selector'


export const getChecklistState = createSelector(
  getState,
  (state: IExitState) => state.checklist
);

export const isProcessingChecklistSetup = createSelector(
  getChecklistState,
  (state: IChecklistState) => state.isProcessing
);

export const isLoadingChecklistSetup = createSelector(
  getChecklistState,
  (state: IChecklistState) => state.isLoading
);

export const showEditorChecklistSetup = createSelector(
  getChecklistState,
  (state: IChecklistState) => state.showEditor
);

export const showViewerChecklistSetup = createSelector(
  getChecklistState,
  (state: IChecklistState) => state.showViewer
);

export const getChecklistData = createSelector(
  getChecklistState,
  (state: IChecklistState) => state.checklist
);

export const getValidationRoleData = createSelector(
  getChecklistState,
  (state: IChecklistState) => state.validationRoleData
);

export const getWorkflowSelectOption = createSelector(
  getChecklistState,
  (state: IChecklistState) => state.workflowDefinitions
);

export const getRoleSelectOption = createSelector(
  getChecklistState,
  (state: IChecklistState) => state.roles
);

export const getPositionSelectOption = createSelector(
  getChecklistState,
  (state: IChecklistState) => state.positions
);
