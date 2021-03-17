import { createSelector } from '@ngrx/store';
import { IHrReboardEducationState } from './hr-reboard-education.state';
import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getHrReboardEducationState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.hrReboardEducation
);


export const isProcessingHrReboardEducation = createSelector(
  getHrReboardEducationState,
  (state: IHrReboardEducationState) => state.isProcessing
);

export const showEditorHrReboardEducation = createSelector(
  getHrReboardEducationState,
  (state: IHrReboardEducationState) => state.showEditor
);

export const showViewerHrReboardEducation = createSelector(
  getHrReboardEducationState,
  (state: IHrReboardEducationState) => state.showViewer
);

export const getHrReboardEducationData = createSelector(
  getHrReboardEducationState,
  (state: IHrReboardEducationState) => state.data
);

export const getHrReboardEducationDocument = createSelector(
  getHrReboardEducationState,
  (state: IHrReboardEducationState) => state.document
);

export const getHrReboardEducationInstitutions = createSelector(
  getHrReboardEducationState,
  (state: IHrReboardEducationState) => state.institutionsList
);

export const getHrReboardEducationCountryList = createSelector(
  getHrReboardEducationState,
  (state: IHrReboardEducationState) => state.countryList
);
