import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILmManageObjectivesState } from './lm-manage-objectives.state';
import { IPerformanceState, getPerformanceState } from '../../root/performance.state';


export const getLmManageObjectivesState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.lmManageObjectives
);

export const isProcessingLmManageObjectives = createSelector(
  getLmManageObjectivesState,
  (state: ILmManageObjectivesState) => state.isProcessing
);

export const getPlanListLmManageObjectives = createSelector(
  getLmManageObjectivesState,
  (state: ILmManageObjectivesState) => state.planlist
);

export const getEmployeeListLmManageObjectives = createSelector(
  getLmManageObjectivesState,
  (state: ILmManageObjectivesState) => state.employeeList
);

export const getLmManageObjectivesObjectiveMasterData = createSelector(
  getLmManageObjectivesState,
  (state: ILmManageObjectivesState) => state.objectiveMasterData
);

export const getSelectedEmployeeObjectiveMasterData = createSelector(
  getLmManageObjectivesState,
  (state: ILmManageObjectivesState) => state.selectedEmployeeId
);

export const getLmManageObjectivesPreScoredObjectiveMasterData = createSelector(
  getLmManageObjectivesState,
  (state: ILmManageObjectivesState) => state.preScoredObjectiveMasterData
);
