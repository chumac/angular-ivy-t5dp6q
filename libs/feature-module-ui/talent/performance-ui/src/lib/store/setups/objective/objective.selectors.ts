import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IObjectiveState } from './objective.state';
import { IObjectiveDto } from '@nutela/models/talent/performance';
import { getPerformanceState, IPerformanceState } from '../../root/performance.state';

export const getObjectiveState = createSelector(
  getPerformanceState,
  (state: IPerformanceState) => state.objectiveSetup
);

export const isProcessingObjective = createSelector(
  getObjectiveState,
  (state: IObjectiveState) => state.isProcessing
);

export const showEditorObjective = createSelector(
  getObjectiveState,
  (state: IObjectiveState) => state.showEditor
);

export const showViewerObjective = createSelector(
  getObjectiveState,
  (state: IObjectiveState) => state.showViewer
);

export const getObjectiveData = createSelector(
  getObjectiveState,
  (state: IObjectiveState) => state.objectiveData
);

export const getObjectiveDocument = createSelector(
  getObjectiveState,
  (state: IObjectiveState) => state.document
);
