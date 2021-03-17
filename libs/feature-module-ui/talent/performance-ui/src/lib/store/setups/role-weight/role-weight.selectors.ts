import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IRoleWeightState } from './role-weight.state';
import { IRoleWeight } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getRoleWeightState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.roleWeightSetup
);

export const isProcessingRoleWeight = createSelector(
  getRoleWeightState,
  (state: IRoleWeightState) => state.isProcessing
);

export const showEditorRoleWeight = createSelector(
  getRoleWeightState,
  (state: IRoleWeightState) => state.showEditor
);

export const showViewerRoleWeight = createSelector(
  getRoleWeightState,
  (state: IRoleWeightState) => state.showViewer
);

export const getRoleWeightData = createSelector(
  getRoleWeightState,
  (state: IRoleWeightState) => state.roleWeightData
);

export const getRoleWeightDocument = createSelector(
  getRoleWeightState,
  (state: IRoleWeightState) => state.document
);

export const getAnalysisListRoleWeight = createSelector(
  getRoleWeightState,
  (state: IRoleWeightState) => state.analysisList
);

export const getAnalysisDetListRoleWeight = createSelector(
  getRoleWeightState,
  (state: IRoleWeightState) => state.analysisDetList
);

export const getPositionListRoleWeight = createSelector(
  getRoleWeightState,
  (state: IRoleWeightState) => state.positionList
);

export const getDesignationListRoleWeight = createSelector(
  getRoleWeightState,
  (state: IRoleWeightState) => state.designationList
);

export const getGradeListRoleWeight = createSelector(
  getRoleWeightState,
  (state: IRoleWeightState) => state.gradeList
);

export const getEmployeeListRoleWeight = createSelector(
  getRoleWeightState,
  (state: IRoleWeightState) => state.employeeList
);
