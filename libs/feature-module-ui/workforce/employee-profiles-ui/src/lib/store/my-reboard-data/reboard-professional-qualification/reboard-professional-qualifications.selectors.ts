import { createSelector } from '@ngrx/store';


import { IReboardProfessionalQualificationsState } from './reboard-professional-qualifications.state';

import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getReboardProfessionalQualificationsState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.reboardProfessionalQualification
);

export const isProcessingReboardProfessionalQualifications = createSelector(
  getReboardProfessionalQualificationsState,
  (state: IReboardProfessionalQualificationsState) => state.isProcessing
);

export const showEditorReboardProfessionalQualifications = createSelector(
  getReboardProfessionalQualificationsState,
  (state: IReboardProfessionalQualificationsState) => state.showEditor
);

export const showViewerReboardProfessionalQualifications = createSelector(
  getReboardProfessionalQualificationsState,
  (state: IReboardProfessionalQualificationsState) => state.showViewer
);

export const getReboardProfessionalQualificationsGridData = createSelector(
  getReboardProfessionalQualificationsState,
  (state: IReboardProfessionalQualificationsState) => state.gridData
);

export const getReboardProfessionalQualificationsData = createSelector(
  getReboardProfessionalQualificationsState,
  (state: IReboardProfessionalQualificationsState) => state.data
);

export const getReboardProfessionalQualificationsDocument = createSelector(
  getReboardProfessionalQualificationsState,
  (state: IReboardProfessionalQualificationsState) => state.document
);

export const getReboardProfessionalQualificationsInlineDocument = createSelector(
  getReboardProfessionalQualificationsState,
  (state: IReboardProfessionalQualificationsState) => state.inlineDocument
);
