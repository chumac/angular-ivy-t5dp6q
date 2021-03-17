import {
  initialLeaveDailyState,
  ILeaveDailyState
} from './leave-daily.state';
import {
  LeaveDailyActions,
  LeaveDailyActionTypes
} from './leave-daily.actions';
import { ILeaveEntitlement, ILeaveContactInfo } from '@nutela/models/workforce/leave';

export function leaveDailyReducer(state = initialLeaveDailyState, action: LeaveDailyActions): ILeaveDailyState {
  switch (action.type) {
    case LeaveDailyActionTypes.LOAD_ENTITLEMENTS_SUCCESS:
      return { ...state, leaveEntitlements: <ILeaveEntitlement[]>action.payload };
    case LeaveDailyActionTypes.LOAD_ENTITLEMENTS_FAILURE:
      return state;
    case LeaveDailyActionTypes.LOAD_CONTACT_INFO_SUCCESS:
      return { ...state, contactInfo: <ILeaveContactInfo>action.payload };
    case LeaveDailyActionTypes.LOADING_LEAVE_DAILY:
      return { ...state, isLoading: true };
    case LeaveDailyActionTypes.NOT_LOADING_LEAVE_DAILY:
      return { ...state, isLoading: false };
    default: {
      return state;
    }
  }
}

