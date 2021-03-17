import {
  initialLeaveStaggeredState,
  ILeaveStaggeredState
} from './leave-staggered.state';
import {
  LeaveStaggeredActionTypes, LeaveStaggeredActions
} from './leave-staggered.actions';

export function leaveStaggeredReducer(
  state = initialLeaveStaggeredState,
  action: LeaveStaggeredActions
): ILeaveStaggeredState {
  switch (action.type) {
    case LeaveStaggeredActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LeaveStaggeredActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case LeaveStaggeredActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case LeaveStaggeredActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case LeaveStaggeredActionTypes.SHOW_MODAL:
      return { ...state, showModal: true };
    case LeaveStaggeredActionTypes.HIDE_MODAL:
      return { ...state, showModal: false };
    case LeaveStaggeredActionTypes.SHOW_DETAIL_EDITOR:
      return { ...state, showDetailEditor: true };
    case LeaveStaggeredActionTypes.HIDE_DETAIL_EDITOR:
      return { ...state, showDetailEditor: false };
    case LeaveStaggeredActionTypes.LOAD_CURRENCY_LIST_SUCCESS:
      return { ...state, currencyList: action.payload.currencyList };
    case LeaveStaggeredActionTypes.LOAD_LEAVE_ENTITLEMENT_SUCCESS:
      return { ...state, leaveEntitlement: action.payload.leaveEntitlement };
    case LeaveStaggeredActionTypes.LOAD_LEAVE_IDENTITY:
      return { ...state, leaveStaggeredIdentity: null };
    case LeaveStaggeredActionTypes.LOAD_LEAVE_IDENTITY_SUCCESS:
      return { ...state, leaveStaggeredIdentity: action.payload.leaveStaggeredId };
    case LeaveStaggeredActionTypes.LOAD_LEAVE_STAGGERED_TYPE_SUCCESS:
      return { ...state, leaveType: action.payload.leaveType };
    case LeaveStaggeredActionTypes.LOAD_LEAVE_APPLY_STATES_READY:
      return {
        ...state,
        stateList: action.payload.stateList,
        cityList: []
      };
    case LeaveStaggeredActionTypes.LOAD_LEAVE_APPLY_CITIES_READY:
      return { ...state, cityList: action.payload.cityList };
    case LeaveStaggeredActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LeaveStaggeredActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LeaveStaggeredActionTypes.LOADING_LEAVE:
      return { ...state, isLoading: true };
    case LeaveStaggeredActionTypes.NOT_LOADING_LEAVE:
      return { ...state, isLoading: false };
    case LeaveStaggeredActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload.map(data => Object.assign({}, data, { leave_type: data.LeaveInfo ? data.LeaveInfo.description : null })) };
    case LeaveStaggeredActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload.map(data => Object.assign({}, data, { leave_type: data.LeaveInfo ? data.LeaveInfo.description : null })) };

    default: {
      return state;
    }
  }
}
