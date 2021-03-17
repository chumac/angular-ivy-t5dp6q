import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IObjectiveApprovalState } from './objective-approval.state';
import { IPerformanceState, getPerformanceState } from '../../root/performance.state';




export const getObjectiveApprovalState = createSelector(
    getPerformanceState,
    (state: IPerformanceState) => state.objectiveApproval
);

export const showViewerObjectiveApproval = createSelector(
  getObjectiveApprovalState,
  (state: IObjectiveApprovalState) => state.showViewer
);

export const showEditorObjectiveApproval = createSelector(
  getObjectiveApprovalState,
  (state: IObjectiveApprovalState) => state.showEditor
);

export const isProcessingObjectiveApproval = createSelector(
  getObjectiveApprovalState,
  (state: IObjectiveApprovalState) => state.isProcessing
);

export const isProcessingDataGridObjectiveApproval = createSelector(
  getObjectiveApprovalState,
  (state: IObjectiveApprovalState) => state.isProcessingDataGrid
);

export const getObjectiveApprovalObjectiveMasterData = createSelector(
  getObjectiveApprovalState,
  (state: IObjectiveApprovalState) => state.objectiveMasterData
);

export const getObjectiveApprovalWorkflowData = createSelector(
  getObjectiveApprovalState,
  (state: IObjectiveApprovalState) => state.workflowInfo
);

export const getObjectiveApprovalPerspectiveList = createSelector(
  getObjectiveApprovalState,
  (state: IObjectiveApprovalState) => state.perspectiveList
);

export const getObjectiveApprovalWeightBalance = createSelector(
  getObjectiveApprovalState,
  (state: IObjectiveApprovalState) => state.perspectiveWeightBalance
)


