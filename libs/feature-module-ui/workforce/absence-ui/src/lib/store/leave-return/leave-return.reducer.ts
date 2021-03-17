import {
  initialLeaveReturnState,
  ILeaveReturnState
} from './leave-return.state';
import {
  LeaveReturnActionTypes, LeaveReturnActions
} from './leave-return.actions';

export function leaveReturnReducer(
  state = initialLeaveReturnState,
  action: LeaveReturnActions
): ILeaveReturnState {
  switch (action.type) {
    case LeaveReturnActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LeaveReturnActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case LeaveReturnActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LeaveReturnActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LeaveReturnActionTypes.LOADING_LEAVE_RETURN:
      return { ...state, isLoading: true };
    case LeaveReturnActionTypes.NOT_LOADING_LEAVE_RETURN:
      return { ...state, isLoading: false };

    default: {
      return state;
    }
  }
}
