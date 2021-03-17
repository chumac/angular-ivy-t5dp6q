import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IReboardContactState } from './reboard-contact.state';

import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getReboardContactState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.reboardContact
);


export const isReboardContactProcessing = createSelector(
  getReboardContactState,
  (state: IReboardContactState) => state.isProcessing
);

export const showEditorReboardContact = createSelector(
  getReboardContactState,
  (state: IReboardContactState) => state.showEditor
);

export const showViewerReboardContact = createSelector(
  getReboardContactState,
  (state: IReboardContactState) => state.showViewer
);

export const getReboardResidentialStateList = createSelector(
  getReboardContactState,
  (state: IReboardContactState) => state.raStateList
);

export const getReboardResidentialCityList = createSelector(
  getReboardContactState,
  (state: IReboardContactState) => state.raCityList
);

export const getReboardPermanentStateList = createSelector(
  getReboardContactState,
  (state: IReboardContactState) => state.paStateList
);

export const getReboardPermanentCityList = createSelector(
  getReboardContactState,
  (state: IReboardContactState) => state.paCityList
);

export const getReboardNextOfKinStateList = createSelector(
  getReboardContactState,
  (state: IReboardContactState) => state.nokStateList
);

export const getReboardNextOfKinCityList = createSelector(
  getReboardContactState,
  (state: IReboardContactState) => state.nokCityList
);

export const getReboardContactData = createSelector(
  getReboardContactState,
  (state: IReboardContactState) => state.data
);

export const getReboardNextOfKinPhoto = createSelector(
  getReboardContactState,
  (state: IReboardContactState) => state.nokPhoto
);

export const getReboardContactDocument = createSelector(
  getReboardContactState,
  (state: IReboardContactState) => state.document
);

export const getReboardContactInlineDocument = createSelector(
  getReboardContactState,
  (state: IReboardContactState) => state.inlineDocument
);
