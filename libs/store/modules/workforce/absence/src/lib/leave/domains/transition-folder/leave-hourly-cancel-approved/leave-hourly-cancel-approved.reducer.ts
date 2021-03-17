import {
  initialLeaveHourlyCancelApprovedState,
  ILeaveHourlyCancelApprovedState
} from './leave-hourly-cancel-approved.state';
import {
  LeaveHourlyCancelApprovedActionTypes, LeaveHourlyCancelApprovedActions
} from './leave-hourly-cancel-approved.actions';

export function leaveHourlyCancelApprovedReducer(
  state = initialLeaveHourlyCancelApprovedState,
  action: LeaveHourlyCancelApprovedActions
): ILeaveHourlyCancelApprovedState {
  switch (action.type) {
    case LeaveHourlyCancelApprovedActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LeaveHourlyCancelApprovedActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case LeaveHourlyCancelApprovedActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LeaveHourlyCancelApprovedActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };

    default: {
      return state;
    }
  }
}
