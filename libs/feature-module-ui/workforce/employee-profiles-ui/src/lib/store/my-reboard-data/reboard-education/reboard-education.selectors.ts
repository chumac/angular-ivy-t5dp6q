import { createSelector } from '@ngrx/store';
import { IReboardEducationState } from './reboard-education.state';
import { getEmployeesProfileState, IEmployeesProfileState } from 'libs/feature-module-ui/workforce/employee-profiles-ui/src/lib/store/root/employees-profile.state';

export const getReboardEducationState = createSelector(
  getEmployeesProfileState,
  (state: IEmployeesProfileState) => state.reboardEducation
);


export const isProcessingReboardEducation = createSelector(
  getReboardEducationState,
  (state: IReboardEducationState) => state.isProcessing
);

export const showEditorReboardEducation = createSelector(
  getReboardEducationState,
  (state: IReboardEducationState) => state.showEditor
);

export const showViewerReboardEducation = createSelector(
  getReboardEducationState,
  (state: IReboardEducationState) => state.showViewer
);

export const getReboardEducationData = createSelector(
  getReboardEducationState,
  (state: IReboardEducationState) => state.data
);

export const getReboardEducationDocument = createSelector(
  getReboardEducationState,
  (state: IReboardEducationState) => state.document
);

export const getReboardEducationInstitutions = createSelector(
  getReboardEducationState,
  (state: IReboardEducationState) => state.institutionsList
);

export const getReboardEducationCountryList = createSelector(
  getReboardEducationState,
  (state: IReboardEducationState) => state.countryList
);

export const getReboardEducationDataMap = createSelector(
  getReboardEducationState, (state: IReboardEducationState) => state.dataMap);
