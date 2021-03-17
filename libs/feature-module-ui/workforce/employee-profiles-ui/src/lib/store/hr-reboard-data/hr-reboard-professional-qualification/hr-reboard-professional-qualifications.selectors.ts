import { createSelector } from '@ngrx/store';


import { IHrReboardProfessionalQualificationsState } from './hr-reboard-professional-qualifications.state';

import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getHrReboardProfessionalQualificationsState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.hrReboardProfessionalQualification
);

export const isProcessingHrReboardProfessionalQualifications = createSelector(
  getHrReboardProfessionalQualificationsState,
  (state: IHrReboardProfessionalQualificationsState) => state.isProcessing
);

export const showEditorHrReboardProfessionalQualifications = createSelector(
  getHrReboardProfessionalQualificationsState,
  (state: IHrReboardProfessionalQualificationsState) => state.showEditor
);

export const showViewerHrReboardProfessionalQualifications = createSelector(
  getHrReboardProfessionalQualificationsState,
  (state: IHrReboardProfessionalQualificationsState) => state.showViewer
);

export const getHrReboardProfessionalQualificationsData = createSelector(
  getHrReboardProfessionalQualificationsState,
  (state: IHrReboardProfessionalQualificationsState) => state.data
);

export const getHrReboardProfessionalQualificationsDocument = createSelector(
  getHrReboardProfessionalQualificationsState,
  (state: IHrReboardProfessionalQualificationsState) => state.document
);

export const getHrReboardProfessionalQualificationsInlineDocument = createSelector(
  getHrReboardProfessionalQualificationsState,
  (state: IHrReboardProfessionalQualificationsState) => state.inlineDocument
);
