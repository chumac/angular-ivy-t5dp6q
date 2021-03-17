import { createSelector } from '@ngrx/store';
import { IEmployeesProfileState, getEmployeesProfileState } from '../../root/employees-profile.state';


import { IEducationState } from './education.state';

export const getEducationState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.education
);


export const isProcessingEducation = createSelector(
  getEducationState,
  (state: IEducationState) => state.isProcessing
);

export const showEditorEducation = createSelector(
  getEducationState,
  (state: IEducationState) => state.showEditor
);

export const showViewerEducation = createSelector(
  getEducationState,
  (state: IEducationState) => state.showViewer
);

export const getEducationApprovedData = createSelector(
  getEducationState,
  (state: IEducationState) => state.approvedData
);

export const getEducationAwaitingApprovalData = createSelector(
  getEducationState,
  (state: IEducationState) => state.awaitingApprovalData
);

export const getEducationDocument = createSelector(
  getEducationState,
  (state: IEducationState) => state.document
);

export const getEducationInstitutions = createSelector(
  getEducationState,
  (state: IEducationState) => state.institutionsList
);

export const getEducationCountryList = createSelector(
  getEducationState,
  (state: IEducationState) => state.countryList
);

export const getEducationApprovedDataMap = createSelector(getEducationState, (state: IEducationState) => state.approvedDataMap);
