import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IEducationState } from './education.state';
import { IEducation } from '@nutela/models/workforce/employee-profiles';

export const getEducationState = createFeatureSelector<IEducationState>('education');

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
