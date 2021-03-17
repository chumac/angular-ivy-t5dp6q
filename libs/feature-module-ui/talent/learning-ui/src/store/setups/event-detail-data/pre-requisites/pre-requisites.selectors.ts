import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPreRequisitesState } from './pre-requisites.state';
import { getLearningState, ILearningState } from '../../../root/learning.state';

export const getPreRequisitesState = createSelector(
  getLearningState,
  (state: ILearningState) => state.eventPreRequisites
);

export const getPreRequisitesData = createSelector(
  getPreRequisitesState,
  (state: IPreRequisitesState) => state.PreRequisitesData
);

export const getPreRequisitesTypeData = createSelector(
  getPreRequisitesState,
  (state: IPreRequisitesState) => state.PreRequisitesTypeData
);

export const isProcessingPreRequisites = createSelector(
  getPreRequisitesState,
  (state: IPreRequisitesState) => state.isProcessing
);

export const showEditorPreRequisites = createSelector(
  getPreRequisitesState,
  (state: IPreRequisitesState) => state.showEditor
);

export const showViewerPreRequisites = createSelector(
  getPreRequisitesState,
  (state: IPreRequisitesState) => state.showViewer
);