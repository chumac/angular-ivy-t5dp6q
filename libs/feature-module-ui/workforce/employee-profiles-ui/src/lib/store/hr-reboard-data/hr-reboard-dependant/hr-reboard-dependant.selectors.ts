import { createSelector } from '@ngrx/store';

import { IHrReboardDependantState } from './hr-reboard-dependant.state';

import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getHrReboardDependantsState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.hrReboardDependant
);


export const isProcessingHrReboardDependant = createSelector(
  getHrReboardDependantsState,
  (state: IHrReboardDependantState) => state.isProcessing
);

export const showEditorHrReboardDependant = createSelector(
  getHrReboardDependantsState,
  (state: IHrReboardDependantState) => state.showEditor
);

export const showViewerHrReboardDependant = createSelector(
  getHrReboardDependantsState,
  (state: IHrReboardDependantState) => state.showViewer
);

export const getHrReboardDependantStateList = createSelector(
  getHrReboardDependantsState,
  (state: IHrReboardDependantState) => state.stateList
);

export const getHrReboardDependantCityList = createSelector(
  getHrReboardDependantsState,
  (state: IHrReboardDependantState) => state.cityList
);

export const getHrReboardDependantData = createSelector(
  getHrReboardDependantsState,
  (state: IHrReboardDependantState) => state.data
);

export const getHrReboardDependantPhoto = createSelector(
  getHrReboardDependantsState,
  (state: IHrReboardDependantState) => state.photo
);
