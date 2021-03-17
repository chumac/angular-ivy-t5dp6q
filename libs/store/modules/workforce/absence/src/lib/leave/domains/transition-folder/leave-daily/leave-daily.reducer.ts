import {
  initialLeaveDailyState,
  ILeaveDailyState
} from './leave-daily.state';
import {
  LeaveDailyActions,
  LeaveDailyActionTypes
} from './leave-daily.actions';
import { ILeaveEntitlement } from '@nutela/models/workforce/leave';

export function leaveDailyReducer(state = initialLeaveDailyState, action: LeaveDailyActions): ILeaveDailyState {
  switch (action.type) {
    case LeaveDailyActionTypes.LOAD_ENTITLEMENTS_SUCCESS:
      return {...state, leaveEntitlements: <ILeaveEntitlement[]>action.payload };
    case LeaveDailyActionTypes.LOAD_ENTITLEMENTS_FAILURE:
      return state;
    default: {
      return state;
    }
  }
}

