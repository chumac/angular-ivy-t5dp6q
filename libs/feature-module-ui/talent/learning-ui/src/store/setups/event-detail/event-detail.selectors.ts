import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IEventDetailState } from './event-detail.state';
import { getLearningState, ILearningState } from '../../root/learning.state';

export const getEventDetailState = createSelector(
  getLearningState,
  (state: ILearningState) => state.eventDetail
);

export const getEventDetailData = createSelector(
  getEventDetailState,
  (state: IEventDetailState) => state.EventDetailData
);

export const eventDetailData = createSelector(
  getEventDetailState,
  (state: IEventDetailState) => state.getEventData
);

export const isProcessingEventDetail = createSelector(
  getEventDetailState,
  (state: IEventDetailState) => state.isProcessing
);

export const showEditorEventDetail = createSelector(
  getEventDetailState,
  (state: IEventDetailState) => state.showEditor
);

export const showViewerEventDetail = createSelector(
  getEventDetailState,
  (state: IEventDetailState) => state.showViewer
);

export const getEventDetailType = createSelector(
  getEventDetailState,
  (state: IEventDetailState) => state.getEventType
);

export const getEventDetailFaculty = createSelector(
  getEventDetailState,
  (state: IEventDetailState) => state.getEventFaculty
);

export const showCloseEditorEvent = createSelector(
  getEventDetailState,
  (state: IEventDetailState) => state.showCloseEditor
);

export const showNominationEditorEvent = createSelector(
  getEventDetailState,
  (state: IEventDetailState) => state.showNominationEditor
);

export const getEventParticipants = createSelector(
  getEventDetailState,
  (state: IEventDetailState) => state.getEventParticipants
);

export const getEventEmployee = createSelector(
  getEventDetailState,
  (state: IEventDetailState) => state.getEventEmployee
);