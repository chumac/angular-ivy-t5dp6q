import {
  initialLeaveHistoricalState,
  ILeaveHistoricalState
} from './leave-historical.state';
import {
  LeaveHistoricalActionTypes, LeaveHistoricalActions
} from './leave-historical.actions';

export function leaveHistoricalReducer(
  state = initialLeaveHistoricalState,
  action: LeaveHistoricalActions
): ILeaveHistoricalState {
  switch (action.type) {
    case LeaveHistoricalActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LeaveHistoricalActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case LeaveHistoricalActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LeaveHistoricalActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    default: {
      return state;
    }
  }
}
