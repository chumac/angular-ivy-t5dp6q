import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IHrReboardContactState } from './hr-reboard-contact.state';

import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getHrReboardContactState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.hrReboardContact
);


export const isHrReboardContactProcessing = createSelector(
  getHrReboardContactState,
  (state: IHrReboardContactState) => state.isProcessing
);

export const showEditorHrReboardContact = createSelector(
  getHrReboardContactState,
  (state: IHrReboardContactState) => state.showEditor
);

export const showViewerHrReboardContact = createSelector(
  getHrReboardContactState,
  (state: IHrReboardContactState) => state.showViewer
);

export const getHrReboardResidentialStateList = createSelector(
  getHrReboardContactState,
  (state: IHrReboardContactState) => state.raStateList
);

export const getHrReboardResidentialCityList = createSelector(
  getHrReboardContactState,
  (state: IHrReboardContactState) => state.raCityList
);

export const getHrReboardPermanentStateList = createSelector(
  getHrReboardContactState,
  (state: IHrReboardContactState) => state.paStateList
);

export const getHrReboardPermanentCityList = createSelector(
  getHrReboardContactState,
  (state: IHrReboardContactState) => state.paCityList
);

export const getHrReboardNextOfKinStateList = createSelector(
  getHrReboardContactState,
  (state: IHrReboardContactState) => state.nokStateList
);

export const getHrReboardNextOfKinCityList = createSelector(
  getHrReboardContactState,
  (state: IHrReboardContactState) => state.nokCityList
);

export const getHrReboardContactData = createSelector(
  getHrReboardContactState,
  (state: IHrReboardContactState) => state.data
);

export const getHrReboardNextOfKinPhoto = createSelector(
  getHrReboardContactState,
  (state: IHrReboardContactState) => state.nokPhoto
);

export const getHrReboardContactDocument = createSelector(
  getHrReboardContactState,
  (state: IHrReboardContactState) => state.document
);

export const getHrReboardContactInlineDocument = createSelector(
  getHrReboardContactState,
  (state: IHrReboardContactState) => state.inlineDocument
);
