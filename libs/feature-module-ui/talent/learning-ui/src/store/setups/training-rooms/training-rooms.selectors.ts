import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ITrainingRoomsState } from './training-rooms.state';
import { getLearningState, ILearningState } from '../../root/learning.state';

export const getTrainingRoomsState = createSelector(
  getLearningState,
  (state: ILearningState) => state.trainignRooms
);

export const getTrainingRoomsData = createSelector(
  getTrainingRoomsState,
  (state: ITrainingRoomsState) => state.TrainingRoomsData
);

export const isProcessingTrainingRooms = createSelector(
  getTrainingRoomsState,
  (state: ITrainingRoomsState) => state.isProcessing
);

export const showEditorTrainingRooms = createSelector(
  getTrainingRoomsState,
  (state: ITrainingRoomsState) => state.showEditor
);

export const showViewerTrainingRooms = createSelector(
  getTrainingRoomsState,
  (state: ITrainingRoomsState) => state.showViewer
);