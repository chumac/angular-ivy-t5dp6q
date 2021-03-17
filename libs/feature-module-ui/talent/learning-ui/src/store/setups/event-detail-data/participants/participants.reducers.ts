import { EventParticipantsActions, EventParticipantsActionTypes } from "./participants.actions";
import { IEventParticipantsState, initialEventParticipantsState } from "./participants.state";

export function EventParticipantsReducer(
  state = initialEventParticipantsState,
  action: EventParticipantsActions
): IEventParticipantsState {
  switch (action.type) {
    case EventParticipantsActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case EventParticipantsActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case EventParticipantsActionTypes.LOADING:
      return { ...state, isLoading: true };
    case EventParticipantsActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANTS_DATA_SUCCESS:
      return { ...state, eventParticipants: action.payload };
    case EventParticipantsActionTypes.SHOW_EVENT_PARTICIPANTS_EDITOR:
      return { ...state, showEventParticipantsEditor: true };
    case EventParticipantsActionTypes.HIDE_EVENT_PARTICIPANTS_EDITOR:
      return { ...state, showEventParticipantsEditor: false };
    case EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANTS_SOURCE_DATA_SUCCESS:
      return { ...state, eventParticipantSource: action.payload };
    case EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANTS_EMPLOYEE_DATA_SUCCESS:
      return { ...state, eventParticipantEmployee: action.payload };
    case EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANTS_SCHEDULE_DATA_SUCCESS:
      return { ...state, eventParticipantSchedule: action.payload };
    case EventParticipantsActionTypes.SHOW_EVENT_PARTICIPANTS_VIEW:
      return { ...state, showEventParticipantsView: true };
    case EventParticipantsActionTypes.HIDE_EVENT_PARTICIPANTS_VIEW:
      return { ...state, showEventParticipantsView: false };
    case EventParticipantsActionTypes.SHOW_EVENT_PARTICIPANTS_CRITERIA:
      return { ...state, showEventParticipantCriteria: true };
    case EventParticipantsActionTypes.HIDE_EVENT_PARTICIPANTS_CRITERIA:
      return { ...state, showEventParticipantCriteria: false };
    case EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_GRADE_DATA_SUCCESS:
      return { ...state, eventParticipantGrade: action.payload };
    case EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_STRUCTURE_TYPE_DATA_SUCCESS:
      return { ...state, eventParticipantStructureType: action.payload };
    case EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_CRITERIA_EMPLOYEE_DATA_SUCCESS:
      return { ...state, eventParticipantCriteriaEmployee: action.payload };
    case EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_CRITERIA_KEY_DATA_SUCCESS:
      return { ...state, eventParticipantCriteriaKey: action.payload };
    case EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_CRITERIA_KEY_ITEMS_DATA_SUCCESS:
      return { ...state, eventParticipantCriteriaKeyItems: action.payload };
    default: {
      return state;
    }
  }
}

