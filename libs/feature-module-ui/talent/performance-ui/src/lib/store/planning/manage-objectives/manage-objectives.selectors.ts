import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IManageObjectivesState } from './manage-objectives.state';
import { IPerformanceState, getPerformanceState } from '../../root/performance.state';




export const getManageObjectivesState = createSelector(
    getPerformanceState,
    (state: IPerformanceState) => state.manageObjectives
);


export const showEditorManageObjectives = createSelector(
  getManageObjectivesState,
  (state: IManageObjectivesState) => state.showEditor
);

export const showRecallManageObjectives = createSelector(
  getManageObjectivesState,
  (state: IManageObjectivesState) => state.showRecall
);

export const showViewerManageObjectives = createSelector(
  getManageObjectivesState,
  (state: IManageObjectivesState) => state.showViewer
);

export const isProcessingManageObjectives = createSelector(
  getManageObjectivesState,
  (state: IManageObjectivesState) => state.isProcessing
);

export const isProcessingDataGridManageObjectives = createSelector(
  getManageObjectivesState,
  (state: IManageObjectivesState) => state.isProcessingDataGrid
);

export const getManageObjectivesInfo = createSelector(
  getManageObjectivesState,
  (state: IManageObjectivesState) => state.objectiveInfo
);

export const getManageObjectivesPlanList = createSelector(
  getManageObjectivesState,
  (state: IManageObjectivesState) => state.planlist
);

export const getManageObjectivesPerspectiveList = createSelector(
  getManageObjectivesState,
  (state: IManageObjectivesState) => state.perspectiveList
);

export const getManageObjectivesObjectiveMasterData = createSelector(
  getManageObjectivesState,
  (state: IManageObjectivesState) => state.objectiveMasterData
);

export const getManageObjectivesPreScoredObjectiveMasterData = createSelector(
  getManageObjectivesState,
  (state: IManageObjectivesState) => state.preScoredobjectivesMasterData
);

export const getWeightBalance = createSelector(
  getManageObjectivesState,
  (state: IManageObjectivesState) => state.perspectiveWeightBalance
);

export const getLMWeightBalance = createSelector(
  getManageObjectivesState,
  (state: IManageObjectivesState) => state.lmPerspectiveWeightBalance
);

export const addBtnManageObjectives = createSelector(getManageObjectivesState, (state: IManageObjectivesState) => state.addBtn);
export const recallBtnManageObjectives = createSelector(getManageObjectivesState, (state: IManageObjectivesState) => state.recallBtn);
export const submitBtnManageObjectives = createSelector(getManageObjectivesState, (state: IManageObjectivesState) => state.submitBtn);
export const editBtnManageObjectives = createSelector(getManageObjectivesState, (state: IManageObjectivesState) => state.editBtn);
export const viewBtnManageObjectives = createSelector(getManageObjectivesState, (state: IManageObjectivesState) => state.viewBtn);
export const deleteBtnManageObjectives = createSelector(getManageObjectivesState, (state: IManageObjectivesState) => state.deleteBtn);
export const progressBtnManageObjectives = createSelector(getManageObjectivesState, (state: IManageObjectivesState) => state.progressBtn);
export const resetBtnManageObjectives = createSelector(getManageObjectivesState, (state: IManageObjectivesState) => state.resetBtn);
