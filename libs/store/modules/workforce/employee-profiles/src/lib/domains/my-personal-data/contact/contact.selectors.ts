import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IContactState } from './contact.state';

export const getContactState = createFeatureSelector<IContactState>('contact');

export const isContactProcessing = createSelector(
  getContactState,
  (state: IContactState) => state.isProcessing
);

export const showEditorContact = createSelector(
  getContactState,
  (state: IContactState) => state.showEditor
);

export const showViewerContact = createSelector(
  getContactState,
  (state: IContactState) => state.showViewer
);

export const getResidentialStateList = createSelector(
  getContactState,
  (state: IContactState) => state.raStateList
);

export const getResidentialCityList = createSelector(
  getContactState,
  (state: IContactState) => state.raCityList
);

export const getPermanentStateList = createSelector(
  getContactState,
  (state: IContactState) => state.paStateList
);

export const getPermanentCityList = createSelector(
  getContactState,
  (state: IContactState) => state.paCityList
);

export const getNextOfKinStateList = createSelector(
  getContactState,
  (state: IContactState) => state.nokStateList
);

export const getNextOfKinCityList = createSelector(
  getContactState,
  (state: IContactState) => state.nokCityList
);

export const getContactApprovedData = createSelector(
  getContactState,
  (state: IContactState) => state.approvedData
);

export const getContactAwaitingApprovalData = createSelector(
  getContactState,
  (state: IContactState) => state.awaitingApprovalData
);

export const getNextOfKinPhoto = createSelector(
  getContactState,
  (state: IContactState) => state.nokPhoto
);

export const getAwaitingApprovalNextOfKinPhoto = createSelector(
  getContactState,
  (state: IContactState) => state.awaitingApprovalNokPhoto
);

export const getContactDocument = createSelector(
  getContactState,
  (state: IContactState) => state.document
);

export const getContactInlineDocument = createSelector(
  getContactState,
  (state: IContactState) => state.inlineDocument
);
