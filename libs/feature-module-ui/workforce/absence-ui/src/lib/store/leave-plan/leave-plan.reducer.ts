import {
  initialLeavePlanState,
  ILeavePlanState
} from './leave-plan.state';
import {
  LeavePlanActionTypes, LeavePlanActions
} from './leave-plan.actions';

export function leavePlanReducer(
  state = initialLeavePlanState,
  action: LeavePlanActions
): ILeavePlanState {
  switch (action.type) {
    case LeavePlanActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LeavePlanActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case LeavePlanActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case LeavePlanActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case LeavePlanActionTypes.SHOW_MODAL:
      return { ...state, showModal: true };
    case LeavePlanActionTypes.HIDE_MODAL:
      return { ...state, showModal: false };
    case LeavePlanActionTypes.SHOW_DETAIL_EDITOR:
      return { ...state, showDetailEditor: true };
    case LeavePlanActionTypes.HIDE_DETAIL_EDITOR:
      return { ...state, showDetailEditor: false };
    case LeavePlanActionTypes.LOAD_LEAVE_ENTITLEMENT_SUCCESS:
      return { ...state, leaveEntitlement: action.payload.leaveEntitlement };
    case LeavePlanActionTypes.LOAD_LEAVE_PLAN_IDENTITY:
      return { ...state, leavePlanIdentity: null };
    case LeavePlanActionTypes.LOAD_LEAVE_PLAN_IDENTITY_SUCCESS:
      return { ...state, leavePlanIdentity: action.payload.leavePlanId };
    case LeavePlanActionTypes.LOAD_LEAVE_PLAN_TYPE_SUCCESS:
      return { ...state, leaveType: action.payload.leavePlanType };
    case LeavePlanActionTypes.LOAD_LEAVE_APPLY_STATES_READY:
      return {
        ...state,
        stateList: action.payload.stateList,
        cityList: []
      };
    case LeavePlanActionTypes.LOAD_LEAVE_APPLY_CITIES_READY:
      return { ...state, cityList: action.payload.cityList };
    case LeavePlanActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LeavePlanActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LeavePlanActionTypes.LOADING_LEAVE:
      return { ...state, isLoading: true };
    case LeavePlanActionTypes.NOT_LOADING_LEAVE:
      return { ...state, isLoading: false };
    case LeavePlanActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload.map(data => Object.assign({}, data, { leave_type: data.LeaveInfo ? data.LeaveInfo.description : null })) };
    case LeavePlanActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload.map(data => Object.assign({}, data, { leave_type: data.LeaveInfo ? data.LeaveInfo.description : null })) };

    default: {
      return state;
    }
  }
}
