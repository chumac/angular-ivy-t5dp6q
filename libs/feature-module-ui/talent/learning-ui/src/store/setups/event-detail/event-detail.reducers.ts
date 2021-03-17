import { initialEventDetailState, IEventDetailState } from './event-detail.state';
import { EventDetailActions, EventDetailActionTypes } from './event-detail.actions';

export function EventDetailReducer(
  state = initialEventDetailState,
  action: EventDetailActions
): IEventDetailState {
  switch (action.type) {
    case EventDetailActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case EventDetailActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case EventDetailActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case EventDetailActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case EventDetailActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case EventDetailActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case EventDetailActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, EventDetailData: action.payload };
    case EventDetailActionTypes.GET_EVENT_TYPE_SUCCESS:
      return { ...state, getEventType: action.payload };
    case EventDetailActionTypes.GET_EVENT_FACULTY_SUCCESS:
      return { ...state, getEventFaculty: action.payload };
    case EventDetailActionTypes.GET_DATA_SUCCESS:
      return { ...state, getEventData: action.payload };
    case EventDetailActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case EventDetailActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    case EventDetailActionTypes.SHOW_CLOSE_EDITOR:
      return { ...state, showCloseEditor: true };
    case EventDetailActionTypes.HIDE_CLOSE_EDITOR:
      return { ...state, showCloseEditor: false };
    case EventDetailActionTypes.SHOW_NOMINATION_EDITOR:
      return { ...state, showNominationEditor: true };
    case EventDetailActionTypes.HIDE_NOMINATION_EDITOR:
      return { ...state, showNominationEditor: false };
    case EventDetailActionTypes.GET_PARTICIPANTS_DATA_SUCCESS:
      return { ...state, getEventParticipants: action.payload };
    case EventDetailActionTypes.GET_EMPLOYEE_DATA_SUCCESS:
      return { ...state, getEventEmployee: action.payload };
    default: {
      return state;
    }
  }
}

