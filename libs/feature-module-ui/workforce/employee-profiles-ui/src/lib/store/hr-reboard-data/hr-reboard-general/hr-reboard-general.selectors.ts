import { createSelector } from '@ngrx/store';

import { IHrReboardGeneralState } from './hr-reboard-general.state';

import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getHrReboardGeneralState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.hrReboardGeneral
);

export const isProcessingHrReboardGeneral = createSelector(
  getHrReboardGeneralState,
  (state: IHrReboardGeneralState) => state.isProcessing
);

export const showEditorHrReboardGeneral = createSelector(
  getHrReboardGeneralState,
  (state: IHrReboardGeneralState) => state.showEditor
);

export const showViewerHrReboardGeneral = createSelector(
  getHrReboardGeneralState,
  (state: IHrReboardGeneralState) => state.showViewer
);

export const getHrReboardGeneralBirthStateList = createSelector(
  getHrReboardGeneralState,
  (state: IHrReboardGeneralState) => state.birthStateList
);

export const getHrReboardGeneralBirthCityList = createSelector(
  getHrReboardGeneralState,
  (state: IHrReboardGeneralState) => state.birthCityList
);

export const getHrReboardGeneralStateOfOriginList = createSelector(
  getHrReboardGeneralState,
  (state: IHrReboardGeneralState) => state.stateOfOriginList
);

export const getHrReboardGeneralLGAList = createSelector(
  getHrReboardGeneralState,
  (state: IHrReboardGeneralState) => state.lgaList
);

export const getHrReboardGeneralData = createSelector(
  getHrReboardGeneralState,
  (state: IHrReboardGeneralState) => state.data
);

export const getHrReboardGeneralDocument = createSelector(
  getHrReboardGeneralState,
  (state: IHrReboardGeneralState) => state.document
);
