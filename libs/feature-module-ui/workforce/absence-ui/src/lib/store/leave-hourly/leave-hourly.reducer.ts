import {
  initialLeaveHourlyState,
  ILeaveHourlyState
} from './leave-hourly.state';
import {
  LeaveHourlyActionTypes, LeaveHourlyActions
} from './leave-hourly.actions';

export function leaveHourlyReducer(
  state = initialLeaveHourlyState,
  action: LeaveHourlyActions
): ILeaveHourlyState {
  switch (action.type) {
    case LeaveHourlyActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LeaveHourlyActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };

    case LeaveHourlyActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LeaveHourlyActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LeaveHourlyActionTypes.LOADING_LEAVE_HOURLY:
      return { ...state, isLoading: true };
    case LeaveHourlyActionTypes.NOT_LOADING_LEAVE_HOURLY:
      return { ...state, isLoading: false };
    case LeaveHourlyActionTypes.LOAD_LEAVE_ENTITLEMENT_SUCCESS:
      return { ...state, hourlyLeaveEntitlement: action.payload };

    case LeaveHourlyActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case LeaveHourlyActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };

    default: {
      return state;
    }
  }
}
