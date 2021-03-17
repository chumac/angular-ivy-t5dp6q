import { ActionReducerMap } from "@ngrx/store";
import { courseCategoryReducer, CourseReducer, LearningLibraryReducer, LearningPlanReducer, FeedbackFormsReducer, TrainingRoomsReducer, EventDetailReducer, PreRequisitesReducer, AssetsReducer, FacilitatorsActionTypes, FacilitatorsReducer, EventParticipantsReducer } from "../setups";
import { EventScheduleReducer } from "../setups/event-detail-data/Schedule";
import { MyActionReducer } from "../setups/my-action/my-action.reducers";
import { ILearningState } from "./learning.state";

export const learningReducers: ActionReducerMap<ILearningState> = {
  courseCategory: courseCategoryReducer,
  course: CourseReducer,
  trainignRooms: TrainingRoomsReducer,
  eventDetail: EventDetailReducer,
  eventSchedule: EventScheduleReducer,
  eventPreRequisites: PreRequisitesReducer,
  eventAssets: AssetsReducer,
  eventFacilitators: FacilitatorsReducer,
  eventFeedbackForms: FeedbackFormsReducer,
  eventLearningPlan: LearningPlanReducer,
  eventLearningLibrary: LearningLibraryReducer,
  eventMyAction: MyActionReducer,
  eventParticipants: EventParticipantsReducer,
};
