import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEmployeesProfileState } from '../../root';
import { IDisciplinaryActionsState } from './disciplinary-action.state';

const getState = createFeatureSelector<IEmployeesProfileState>('employeesProfile');
const getDisciplinaryActionState = createSelector(getState, (state: IEmployeesProfileState) => state.disciplinaryAction);


export const showEditorDisciplinaryAction = createSelector(
  getDisciplinaryActionState,
  (state: IDisciplinaryActionsState) => state.showEditor
);

export const showViewerDisciplinaryAction = createSelector(
  getDisciplinaryActionState,
  (state: IDisciplinaryActionsState) => state.showViewer
);

export const isLoadingDisciplinaryAction = createSelector(
  getDisciplinaryActionState,
  (state: IDisciplinaryActionsState) => state.isLoading
);

export const isProcessingDisciplinaryAction = createSelector(
  getDisciplinaryActionState,
  (state: IDisciplinaryActionsState) => state.isProcessing
);

export const getApprovedDataDisciplinaryAction = createSelector(
  getDisciplinaryActionState,
  (state: IDisciplinaryActionsState) => state.approvedData
);

export const getAwaitingApprovalDataDisciplinaryAction = createSelector(
  getDisciplinaryActionState,
  (state: IDisciplinaryActionsState) => state.awaitingApprovalData
);

export const getTakeActionSelectOptionDataDisciplinaryAction = createSelector(
  getDisciplinaryActionState,
  (state: IDisciplinaryActionsState) => state.takeActionData
);

export const getActionRolesSelectOptionDataDisciplinaryAction = createSelector(
  getDisciplinaryActionState,
  (state: IDisciplinaryActionsState) => state.actionRolesData
);

export const getRecommendationSelectOptionDataDisciplinaryAction = createSelector(
  getDisciplinaryActionState,
  (state: IDisciplinaryActionsState) => state.recommendationList
);

export const getRecommendationDataDisciplinaryAction = createSelector(
  getDisciplinaryActionState,
  (state: IDisciplinaryActionsState) => state.recommendation
);

