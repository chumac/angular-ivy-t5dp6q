import { createSelector } from '@ngrx/store';

import { IReboardFamilyState } from './reboard-family.state';
import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getReboardFamilyState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.reboardFamily
);


export const isProcessingReboardFamily = createSelector(
  getReboardFamilyState,
  (state: IReboardFamilyState) => state.isProcessing
);

export const showEditorReboardFamily = createSelector(
  getReboardFamilyState,
  (state: IReboardFamilyState) => state.showEditor
);

export const showViewerReboardFamily = createSelector(
  getReboardFamilyState,
  (state: IReboardFamilyState) => state.showViewer
);

export const getReboardFamilyData = createSelector(
  getReboardFamilyState,
  (state: IReboardFamilyState) => state.data
);

export const getReboardFamilyStateList = createSelector(
  getReboardFamilyState,
  (state: IReboardFamilyState) => state.stateList
);

export const getReboardFamilyCityList = createSelector(
  getReboardFamilyState,
  (state: IReboardFamilyState) => state.cityList
);

export const getReboardFamilyDocument = createSelector(
  getReboardFamilyState,
  (state: IReboardFamilyState) => state.document
);

export const getReboardFamilyInlineDocument = createSelector(
  getReboardFamilyState,
  (state: IReboardFamilyState) => state.inlineDocument
);

export const getReboardFamilyPhoto = createSelector(
  getReboardFamilyState,
  (state: IReboardFamilyState) => state.photo
);
