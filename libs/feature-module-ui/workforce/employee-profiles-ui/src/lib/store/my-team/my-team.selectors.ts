import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEmployeesProfileState } from '../root';
import { IMyTeamState } from './my-team.state';

const getState = createFeatureSelector<IEmployeesProfileState>('employeesProfile');
const getMyTeamState = createSelector(getState, (state: IEmployeesProfileState) => state.myTeam);

export const isLoadingMyTeam = createSelector(
  getMyTeamState,
  (state: IMyTeamState) => state.isLoading
);

export const getDataTeam = createSelector(
  getMyTeamState,
  (state: IMyTeamState) => state.data
);

export const getProfilePicMap = createSelector(
  getMyTeamState,
  (state: IMyTeamState) => state.profilePicMap
);
