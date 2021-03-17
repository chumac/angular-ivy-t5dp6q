import { createSelector } from '@ngrx/store';

import { getEmployeesProfileState, IEmployeesProfileState } from '../../root/employees-profile.state';
import { IGeneralState } from './general.state';

export const getGeneralState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.general
);

export const getGeneralApprovedData = createSelector(
  getGeneralState,
  (state: IGeneralState) => state.approvedData
);

export const getGeneralAwaitingApprovalData = createSelector(
  getGeneralState,
  (state: IGeneralState) => state.awaitingApprovalData
);

export const showEditor = createSelector(
  getGeneralState,
  (state: IGeneralState) => state.showEditor
);

export const showViewer = createSelector(
  getGeneralState,
  (state: IGeneralState) => state.showViewer
);

export const isProcessing = createSelector(
  getGeneralState,
  (state: IGeneralState) => state.isProcessing
);

export const getBirthStateList = createSelector(
  getGeneralState,
  (state: IGeneralState) => state.birthStateList
);

export const getBirthCityList = createSelector(
  getGeneralState,
  (state: IGeneralState) => state.birthCityList
);

export const getStateOfOriginList = createSelector(
  getGeneralState,
  (state: IGeneralState) => state.stateOfOriginList
);

export const getLGAList = createSelector(
  getGeneralState,
  (state: IGeneralState) => state.lgaList
);