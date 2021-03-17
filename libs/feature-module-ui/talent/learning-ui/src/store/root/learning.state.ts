import { createFeatureSelector } from '@ngrx/store';
import { ITrainingRoomsState } from '../setups/training-rooms/training-rooms.state';
import { ICourseCategoryState } from '../setups/course-category/course-category.state';
import { ICourseState } from '../setups/course/course.state';
import { IEventDetailState } from '../setups/event-detail';
import { IEventScheduleState } from '../setups/event-detail-data/Schedule';
import { IPreRequisitesState } from '../setups/event-detail-data/pre-requisites';
import { IAssetsState } from '../setups/event-detail-data/assets';
import { IFacilitatorsState } from '../setups/event-detail-data/facilitators';
import { IFeedbackFormsState } from '../setups/event-detail-data/feedback-forms';
import { ILearningPlanState } from '../setups/learning-plan/learning-plan.state';
import { IEventParticipantsState } from '../setups/event-detail-data/participants/participants.state';
import { ILearningLibraryState } from '../setups/learning-library/learning-library.state';
import { IMyActionState } from '../setups/my-action/my-action.state';

export const getLearningState = createFeatureSelector<ILearningState>('learning');

export interface ILearningState {
  courseCategory: ICourseCategoryState;
  course: ICourseState;
  trainignRooms: ITrainingRoomsState;
  eventDetail: IEventDetailState;
  eventSchedule: IEventScheduleState;
  eventPreRequisites: IPreRequisitesState;
  eventAssets: IAssetsState;
  eventFacilitators: IFacilitatorsState;
  eventFeedbackForms: IFeedbackFormsState;
  eventLearningPlan: ILearningPlanState;
  eventLearningLibrary: ILearningLibraryState;
  eventMyAction: IMyActionState;
  eventParticipants: IEventParticipantsState;
}

export const initialState: ILearningState = {
  courseCategory: null,
  course: null,
  trainignRooms: null,
  eventDetail: null,
  eventSchedule: null,
  eventPreRequisites: null,
  eventAssets: null,
  eventFacilitators: null,
  eventFeedbackForms: null,
  eventLearningPlan: null,
  eventLearningLibrary: null,
  eventMyAction: null,
  eventParticipants: null
};

