import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ILookupDataState } from './lookup-data.state';
import { lookupDataAdapter, selectLookupEntities } from './lookup-data.adapter';
import { ILookupData, IOrganization } from '@nutela/models/common';
import * as constants from '@nutela/shared/app-global';

export const selectLookupDataState = createFeatureSelector<ILookupDataState>('lookupData');

export const selectTitles = (data: ILookupData): string[] => data.Titles;

export const selectLookupData = (state: ILookupDataState): ILookupData =>
  state.entities[constants.GENERAL.defaultEntityId] || null;

export const institutions = createSelector(selectLookupDataState, (state: ILookupDataState) => state.institutions);
export const courses = createSelector(selectLookupDataState, (state: ILookupDataState) => state.courses);
export const leaveTypes = createSelector(selectLookupDataState, (state: ILookupDataState) => state.leaveTypes);
export const hourlyLeaveTypes = createSelector(selectLookupDataState, (state: ILookupDataState) => state.hourlyLeaveTypes);
export const dailyLeaveTypes = createSelector(selectLookupDataState, (state: ILookupDataState) => state.dailyLeaveTypes);
export const activePersonnel = createSelector(selectLookupDataState, (state: ILookupDataState) => state.activePersonnel);
export const activePersonnelHR = createSelector(selectLookupDataState, (state: ILookupDataState) => state.activePersonnelHR);
export const orgData = createSelector(selectLookupDataState, (state: ILookupDataState) => state.orgData);

export const faculties = createSelector(selectLookupDataState, (state: ILookupDataState) => state.faculties);
export const departments = createSelector(selectLookupDataState, (state: ILookupDataState) => state.departments);
export const organisations = createSelector(selectLookupDataState, (state: ILookupDataState) => state.organisations);
export const countries = createSelector(selectLookupDataState, (state: ILookupDataState) => state.countries);


export const selectAllLookupDataItems: (state: object) => ILookupData[] = lookupDataAdapter.getSelectors(selectLookupDataState)
  .selectAll;

export const selectLkupEntities = createSelector(selectLookupDataState, selectLookupEntities);

export const getOrgData = createSelector(
  selectLkupEntities, (userEntities) => userEntities[1].OrgInfo
);

export const selectMaxDocSize = createSelector(selectLkupEntities, (userEntites) => userEntites[1] ? userEntites[1].DocMaxSize: null);
