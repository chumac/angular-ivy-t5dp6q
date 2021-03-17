import { createSelector } from '@ngrx/store';

import { IReboardDependantState } from './reboard-dependant.state';

import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getReboardDependantsState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.reboardDependant
);


export const isProcessingReboardDependant = createSelector(
  getReboardDependantsState,
  (state: IReboardDependantState) => state.isProcessing
);

export const showEditorReboardDependant = createSelector(
  getReboardDependantsState,
  (state: IReboardDependantState) => state.showEditor
);

export const showViewerReboardDependant = createSelector(
  getReboardDependantsState,
  (state: IReboardDependantState) => state.showViewer
);

export const getReboardDependantStateList = createSelector(
  getReboardDependantsState,
  (state: IReboardDependantState) => state.stateList
);

export const getReboardDependantCityList = createSelector(
  getReboardDependantsState,
  (state: IReboardDependantState) => state.cityList
);

export const getReboardDependantData = createSelector(
  getReboardDependantsState,
  (state: IReboardDependantState) => state.data
);

export const getReboardDependantPhoto = createSelector(
  getReboardDependantsState,
  (state: IReboardDependantState) => state.photo
);
