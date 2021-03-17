import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IOrganizationState } from './organization.state';
import { IHRFoundationState } from '../root';

const getState = createFeatureSelector<IHRFoundationState>('hr-foundations');
const getOrganizationState = createSelector(getState, (state: IHRFoundationState) => state.organization);

export const isProcessingOrganization = createSelector(
  getOrganizationState,
  (state: IOrganizationState) => state.isProcessing
);

export const showEditorOrganization = createSelector(
  getOrganizationState,
  (state: IOrganizationState) => state.showEditor
);

export const getOrganizationApprovedData = createSelector(
  getOrganizationState,
  (state: IOrganizationState) => state.organizationData
);

export const getOrganizationStateList = createSelector(
  getOrganizationState,
  (state: IOrganizationState) => state.stateList
);

export const getOrganizationCityList = createSelector(
  getOrganizationState,
  (state: IOrganizationState) => state.cityList
);








