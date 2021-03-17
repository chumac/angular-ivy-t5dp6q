import { createSelector } from '@ngrx/store';
import { getEmployeesProfileState, IEmployeesProfileState } from '../../root/employees-profile.state';
import { IContactState } from './contact.state';

export const getContactState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.contact
);

export const showEditorContact = createSelector(
  getContactState,
  (state: IContactState) => state.showEditor
);

export const isContactProcessing = createSelector(
  getContactState,
  (state: IContactState) => state.isProcessing
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
