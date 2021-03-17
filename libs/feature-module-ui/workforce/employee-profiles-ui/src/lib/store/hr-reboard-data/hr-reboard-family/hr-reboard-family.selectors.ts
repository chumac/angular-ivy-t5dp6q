import { createSelector } from '@ngrx/store';

import { IHrReboardFamilyState } from './hr-reboard-family.state';
import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getHrReboardFamilyState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.hrReboardFamily
);


export const isProcessingHrReboardFamily = createSelector(
  getHrReboardFamilyState,
  (state: IHrReboardFamilyState) => state.isProcessing
);

export const showEditorHrReboardFamily = createSelector(
  getHrReboardFamilyState,
  (state: IHrReboardFamilyState) => state.showEditor
);

export const showViewerHrReboardFamily = createSelector(
  getHrReboardFamilyState,
  (state: IHrReboardFamilyState) => state.showViewer
);

export const getHrReboardFamilyData = createSelector(
  getHrReboardFamilyState,
  (state: IHrReboardFamilyState) => state.data
);

export const getHrReboardFamilyStateList = createSelector(
  getHrReboardFamilyState,
  (state: IHrReboardFamilyState) => state.stateList
);

export const getHrReboardFamilyCityList = createSelector(
  getHrReboardFamilyState,
  (state: IHrReboardFamilyState) => state.cityList
);

export const getHrReboardFamilyDocument = createSelector(
  getHrReboardFamilyState,
  (state: IHrReboardFamilyState) => state.document
);

export const getHrReboardFamilyInlineDocument = createSelector(
  getHrReboardFamilyState,
  (state: IHrReboardFamilyState) => state.inlineDocument
);

export const getHrReboardFamilyPhoto = createSelector(
  getHrReboardFamilyState,
  (state: IHrReboardFamilyState) => state.photo
);
