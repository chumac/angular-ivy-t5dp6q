import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ISelectOptionDataState } from './select-option-data.state';
import { ISelectOptionData } from '@nutela/models/common';
import * as constants from '@nutela/shared/app-global';

export const selectOptionDataState = createFeatureSelector<ISelectOptionDataState>('selectOptionData');

export const selectOptionData = (state: ISelectOptionDataState): ISelectOptionData =>
  state.entities[constants.GENERAL.defaultEntityId] || null;

export const getSelectOptionData = createSelector(selectOptionDataState, selectOptionData);

export const getInstitutions = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.institutions);
export const getProfessionalQualifications = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.professionalQualifications);
export const getProfessionalInstitutions = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.professionalInstitutions);

export const getCourses = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.courses);
export const getLeaveTypes = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.leaveTypes);
export const getHourlyLeaveTypes = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.hourlyLeaveTypes);
export const getDailyLeaveTypes = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.dailyLeaveTypes);

export const getActivePersonnel = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.activePersonnel);
export const getActivePersonnelHR = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.activePersonnelHR);
export const getPerformancePlans = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.performancePlans);
export const getCurrentPerformancePlans = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.currentPerformancePlans);

export const getFaculties = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.faculties);
export const getDepartments = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.departments);
export const getOrganisations = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.organisations);
export const getCountries = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.countries);


export const getWorkflowEntityList = createSelector(getSelectOptionData, (data: ISelectOptionData) => data.WorkflowEntityList);

export const getProjects = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.projects);
export const getCostCenters = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.costCenters);
export const getWorkHourTypes = createSelector(selectOptionDataState, (state: ISelectOptionDataState) => state.workHourTypes);
