import {
  initialLeaveDaysState,
  ILeaveDaysState
} from './leave-days.state';
import {
  LeaveDaysActionTypes, LeaveDaysActions
} from './leave-days.actions';

export function leaveDaysReducer(
  state = initialLeaveDaysState,
  action: LeaveDaysActions
): ILeaveDaysState {
  switch (action.type) {
    case LeaveDaysActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LeaveDaysActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case LeaveDaysActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LeaveDaysActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LeaveDaysActionTypes.LOAD_DAYS_DATA_SUCCESS:
      return {...state, daysData: action.payload};
    default: {
      return state;
    }
  }
}
