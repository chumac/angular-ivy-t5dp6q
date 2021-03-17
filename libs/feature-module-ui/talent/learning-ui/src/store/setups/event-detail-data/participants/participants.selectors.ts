import { createSelector } from '@ngrx/store';
import { IEventParticipantsState } from './participants.state';
import { getLearningState, ILearningState } from '../../../root/learning.state';

export const getEventParticipantsState = createSelector(
  getLearningState,
  (state: ILearningState) => state.eventParticipants
);

export const isLoadingEventParticipants = createSelector(
  getEventParticipantsState,
  (state: IEventParticipantsState) => state.isLoading
);

export const getEventParticipantsData = createSelector(
  getEventParticipantsState,
  (state: IEventParticipantsState) => state.eventParticipants
);

export const isProcessingEventParticipants = createSelector(
  getEventParticipantsState,
  (state: IEventParticipantsState) => state.isProcessing
);

export const showEventParticipantsEditor = createSelector(
  getEventParticipantsState,
  (state: IEventParticipantsState) => state.showEventParticipantsEditor
);

export const showEventParticipantsView = createSelector(
  getEventParticipantsState,
  (state: IEventParticipantsState) => state.showEventParticipantsView
);

export const getEventParticipantSourceData = createSelector(
  getEventParticipantsState,
  (state: IEventParticipantsState) => state.eventParticipantSource
);

export const getEventParticipantEmployeeData = createSelector(
  getEventParticipantsState,
  (state: IEventParticipantsState) => state.eventParticipantEmployee
);

export const getEventParticipantScheduleData = createSelector(
  getEventParticipantsState,
  (state: IEventParticipantsState) => state.eventParticipantSchedule
);

export const showEventParticipantCriteria = createSelector(
  getEventParticipantsState,
  (state: IEventParticipantsState) => state.showEventParticipantCriteria
);

export const getEventParticipantGradeData = createSelector(
  getEventParticipantsState,
  (state: IEventParticipantsState) => state.eventParticipantGrade
);

export const getEventParticipantStructureTypeData = createSelector(
  getEventParticipantsState,
  (state: IEventParticipantsState) => state.eventParticipantStructureType
);

export const getEventParticipantCriteriaEmployee = createSelector(
  getEventParticipantsState,
  (state: IEventParticipantsState) => state.eventParticipantCriteriaEmployee
);

export const getEventParticipantCriteriaKey = createSelector(
  getEventParticipantsState,
  (state: IEventParticipantsState) => state.eventParticipantCriteriaKey
);

export const getEventParticipantCriteriaItems = createSelector(
  getEventParticipantsState,
  (state: IEventParticipantsState) => state.eventParticipantCriteriaKeyItems
);