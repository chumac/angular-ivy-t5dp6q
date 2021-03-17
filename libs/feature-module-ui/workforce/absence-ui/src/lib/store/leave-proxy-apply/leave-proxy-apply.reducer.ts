import {
  initialLeaveProxyApplyState,
  ILeaveProxyApplyState
} from './leave-proxy-apply.state';
import {
  LeaveProxyApplyActionTypes, LeaveProxyApplyActions
} from './leave-proxy-apply.actions';

export function leaveProxyApplyReducer(
  state = initialLeaveProxyApplyState,
  action: LeaveProxyApplyActions
): ILeaveProxyApplyState {
  switch (action.type) {
    case LeaveProxyApplyActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LeaveProxyApplyActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case LeaveProxyApplyActionTypes.SHOW_EDITOR_RESET:
      return { ...state, showResetEditor: true };
    case LeaveProxyApplyActionTypes.HIDE_EDITOR_RESET:
      return { ...state, showResetEditor: false };
    case LeaveProxyApplyActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case LeaveProxyApplyActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case LeaveProxyApplyActionTypes.SHOW_FULL_FORM:
      return { ...state, showFullForm: true };
    case LeaveProxyApplyActionTypes.HIDE_FULL_FORM:
      return { ...state, showFullForm: false };
    case LeaveProxyApplyActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LeaveProxyApplyActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LeaveProxyApplyActionTypes.LOADING:
      return { ...state, isLoading: true };
    case LeaveProxyApplyActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case LeaveProxyApplyActionTypes.PROCESSING_FORM:
      return { ...state, isProcessingForm: true };
    case LeaveProxyApplyActionTypes.NOT_PROCESSING_FORM:
      return { ...state, isProcessingForm: false };
    case LeaveProxyApplyActionTypes.LOAD_LEAVE_SUBDETAIL_SUCCESS:
      return { ...state, leaveEntitlementSubdetail: action.payload };
    case LeaveProxyApplyActionTypes.LOAD_LEAVE_ENTITLEMENT_SUCCESS:
      return { ...state, leaveEntitlement: action.payload.leaveEntitlement };
    case LeaveProxyApplyActionTypes.LOAD_LEAVE_APPLY_STATES_READY:
      return {
        ...state,
        stateList: action.payload.stateList,
        cityList: []
      };
    case LeaveProxyApplyActionTypes.LOAD_LEAVE_APPLY_CITIES_READY:
      return { ...state, cityList: action.payload.cityList };

    case LeaveProxyApplyActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload, isProcessing: false };
    case LeaveProxyApplyActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload, isProcessing: false };

    default: {
      return state;
    }
  }
}
