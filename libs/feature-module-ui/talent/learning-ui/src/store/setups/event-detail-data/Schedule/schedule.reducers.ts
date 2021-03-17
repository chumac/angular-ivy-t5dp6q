import { initialEventScheduleState, IEventScheduleState } from './schedule.state';
import { EventScheduleActions, EventScheduleActionTypes } from './schedule.actions';

export function EventScheduleReducer(
  state = initialEventScheduleState,
  action: EventScheduleActions
): IEventScheduleState {
  switch (action.type) {
    case EventScheduleActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case EventScheduleActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case EventScheduleActionTypes.LOADING:
      return { ...state, isLoading: true };
    case EventScheduleActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case EventScheduleActionTypes.LOAD_EVENT_SCHEDULE_DATA_SUCCESS:
      return { ...state, eventSchedule: action.payload };
    case EventScheduleActionTypes.SHOW_EVENT_SCHEDULE_EDITOR:
      return { ...state, showEventScheduleEditor: true };
    case EventScheduleActionTypes.HIDE_EVENT_SCHEDULE_EDITOR:
      return { ...state, showEventScheduleEditor: false };
    case EventScheduleActionTypes.LOAD_EVENT_HALL_DATA_SUCCESS:
      return { ...state, eventHall: action.payload };
      case EventScheduleActionTypes.SHOW_EVENT_SCHEDULE_VIEW:
        return { ...state, showEventScheduleView: true };
      case EventScheduleActionTypes.HIDE_EVENT_SCHEDULE_VIEW:
        return { ...state, showEventScheduleView: false };
    default: {
      return state;
    }
  }
}

