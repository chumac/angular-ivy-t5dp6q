import { initialTimeAttendanceState, ITimeAttendanceState } from './time-attendance.state';
import { TimeAttendanceActions, TimeAttendanceActionTypes } from './time-attendance.actions';

export function timeAttendanceReducer(
  state = initialTimeAttendanceState,
  action: TimeAttendanceActions
): ITimeAttendanceState {
  switch (action.type) {
    case TimeAttendanceActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case TimeAttendanceActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case TimeAttendanceActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case TimeAttendanceActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case TimeAttendanceActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case TimeAttendanceActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case TimeAttendanceActionTypes.LOADING:
      return { ...state, isLoading: true };
    case TimeAttendanceActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case TimeAttendanceActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, timeAttendanceData: action.payload };
    case TimeAttendanceActionTypes.LOAD_STATUS_LIST_SUCCESS:
      return { ...state, attendanceStatuslist: action.payload };
    case TimeAttendanceActionTypes.REMOVE_DATA:
      return { ...state, timeAttendanceData: [] };
    default: {
      return state;
    }
  }
}

