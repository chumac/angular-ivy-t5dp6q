import {
  initialLeaveLimitsState,
  ILeaveLimitsState
} from './leave-limit.state';
import {
  LeaveLimitsActionTypes, LeaveLimitsActions
} from './leave-limit.actions';

export function leaveLimitsReducer(
  state = initialLeaveLimitsState,
  action: LeaveLimitsActions
): ILeaveLimitsState {
  switch (action.type) {
    case LeaveLimitsActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LeaveLimitsActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case LeaveLimitsActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LeaveLimitsActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LeaveLimitsActionTypes.LOADING:
      return { ...state, isLoading: true };
    case LeaveLimitsActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case LeaveLimitsActionTypes.LOAD_LIMITS_DATA_SUCCESS:
      return {...state, limitData: action.payload.map(data => Object.assign({}, data, {
        leaveInfo: data.LeaveInfo.description,
      gradeInfo: data.GradeInfo.description}))};
    case LeaveLimitsActionTypes.LOAD_LEAVE_DATA_SUCCESS:
      return {...state, leave: action.payload};
    case LeaveLimitsActionTypes.LOAD_GRADE_DATA_SUCCESS:
      return {...state, grade: action.payload};
    default: {
      return state;
    }
  }
}
