import { initialCalendarState, ICalendarState } from './calendar.state';
import { CalendarActions, CalendarActionTypes } from './calendar.actions';

export function calendarReducer(
  state = initialCalendarState,
  action: CalendarActions
): ICalendarState {
  switch (action.type) {
    case CalendarActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case CalendarActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case CalendarActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case CalendarActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case CalendarActionTypes.SHOW_PROFILE_EDITOR:
      return { ...state, showProfileEditor: true };
    case CalendarActionTypes.HIDE_PROFILE_EDITOR:
      return { ...state, showProfileEditor: false };
    case CalendarActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case CalendarActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case CalendarActionTypes.LOADING:
      return { ...state, isLoading: true };
    case CalendarActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case CalendarActionTypes.LOAD_CALENDAR_DATA_SUCCESS:
      return { ...state, [`${action.payload.workType}Data`]: action.payload.data };
    case CalendarActionTypes.LOAD_SINGLE_CALENDAR_SUCCESS:
      return { ...state, singleData: action.payload };
    case CalendarActionTypes.LOAD_PAYROLL_PROFILE_DATA_SUCCESS:
      return { ...state, payProfiles: action.payload };
    case CalendarActionTypes.LOAD_PAYROLL_PROFILE_LIST_SUCCESS:
      return { ...state, payProfileList: action.payload };
    case CalendarActionTypes.LOAD_ALLOWANCE_LIST_SUCCESS:
      return { ...state, allowanceList: action.payload };
    case CalendarActionTypes.LOAD_DEDUCTION_LIST_SUCCESS:
      return { ...state, deductionList: action.payload };
    case CalendarActionTypes.LOAD_PAYGROUP_LIST_SUCCESS:
      return { ...state, paygroupList: action.payload };
    default: {
      return state;
    }
  }
}
