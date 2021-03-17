import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEmployeesProfileState } from '../root';
import { ITeamDeploymentState } from './team-deployment.state';

const getState = createFeatureSelector<IEmployeesProfileState>('employeesProfile');
const getTeamDeploymentState = createSelector(getState, (state: IEmployeesProfileState) => state.teamDeployment);


export const getDeploymentDataTeamDeployment = createSelector(
  getTeamDeploymentState,
  (state: ITeamDeploymentState) => state.deploymentData
);

export const getTransactionDataTeamDeployment = createSelector(
  getTeamDeploymentState,
  (state: ITeamDeploymentState) => state.transactionData
);

export const getPositionListTeamDeployment = createSelector(
  getTeamDeploymentState,
  (state: ITeamDeploymentState) => state.positionList
);

export const getTeamMembersTeamDeployment = createSelector(
  getTeamDeploymentState,
  (state: ITeamDeploymentState) => state.team
);

export const isProcessingTeamDeployment = createSelector(
  getTeamDeploymentState,
  (state: ITeamDeploymentState) => state.isProcessing
);

export const loadingTeamDeployment = createSelector(
  getTeamDeploymentState,
  (state: ITeamDeploymentState) => state.loading
);

export const loadingSuggestionTeamDeployment = createSelector(
  getTeamDeploymentState,
  (state: ITeamDeploymentState) => state.loadingSuggestion
);

export const showEditorTeamDeployment = createSelector(
  getTeamDeploymentState,
  (state: ITeamDeploymentState) => state.showEditor
);

export const showViewerTeamDeployment = createSelector(
  getTeamDeploymentState,
  (state: ITeamDeploymentState) => state.showViewer
);

export const getSuggestedSupervisorTeamDeployment = createSelector(
  getTeamDeploymentState,
  (state: ITeamDeploymentState) => state.suggestedSupervisor
);
