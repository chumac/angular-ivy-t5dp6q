import {
  initialLeaveApplyState,
  ILeaveApplyState
} from './leave-apply.state';
import {
  LeaveApplyActionTypes, LeaveApplyActions
} from './leave-apply.actions';

export function leaveApplyReducer(
  state = initialLeaveApplyState,
  action: LeaveApplyActions
): ILeaveApplyState {
  switch (action.type) {
    case LeaveApplyActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LeaveApplyActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };

    case LeaveApplyActionTypes.SHOW_FULL_FORM:
      return { ...state, showFullForm: true };
    case LeaveApplyActionTypes.HIDE_FULL_FORM:
      return { ...state, showFullForm: false };

    case LeaveApplyActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LeaveApplyActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LeaveApplyActionTypes.LOAD_LEAVE_ENTITLEMENT_SUCCESS:
      return { ...state, leaveEntitlement: action.payload.leaveEntitlement };
    case LeaveApplyActionTypes.LOAD_LEAVE_APPLY_STATES_READY:
      return {
        ...state,
        stateList: action.payload.stateList,
        cityList: []
      };
    case LeaveApplyActionTypes.LOAD_LEAVE_APPLY_CITIES_READY:
      return { ...state, cityList: action.payload.cityList };

    case LeaveApplyActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };
    case LeaveApplyActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload };

    default: {
      return state;
    }
  }
}
