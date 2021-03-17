import { createSelector } from '@ngrx/store';

import { IReboardGeneralState } from './reboard-general.state';

import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getReboardGeneralState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.reboardGeneral
);

export const isProcessingReboardGeneral = createSelector(
  getReboardGeneralState,
  (state: IReboardGeneralState) => state.isProcessing
);

export const showEditorReboardGeneral = createSelector(
  getReboardGeneralState,
  (state: IReboardGeneralState) => state.showEditor
);

export const showViewerReboardGeneral = createSelector(
  getReboardGeneralState,
  (state: IReboardGeneralState) => state.showViewer
);

export const getReboardGeneralBirthStateList = createSelector(
  getReboardGeneralState,
  (state: IReboardGeneralState) => state.birthStateList
);

export const getReboardGeneralBirthCityList = createSelector(
  getReboardGeneralState,
  (state: IReboardGeneralState) => state.birthCityList
);

export const getReboardGeneralStateOfOriginList = createSelector(
  getReboardGeneralState,
  (state: IReboardGeneralState) => state.stateOfOriginList
);

export const getReboardGeneralLGAList = createSelector(
  getReboardGeneralState,
  (state: IReboardGeneralState) => state.lgaList
);

export const getReboardGeneralData = createSelector(
  getReboardGeneralState,
  (state: IReboardGeneralState) => state.data
);

export const getReboardGeneralDocument = createSelector(
  getReboardGeneralState,
  (state: IReboardGeneralState) => state.document
);
