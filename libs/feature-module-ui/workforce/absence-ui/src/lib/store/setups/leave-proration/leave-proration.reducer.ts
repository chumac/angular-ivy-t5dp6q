import {
  initialLeaveProrateState,
  ILeaveProrateState
} from './leave-proration.state';
import {
  LeaveProrateActionTypes, LeaveProrateActions
} from './leave-proration.actions';

export function leaveProrateReducer(
  state = initialLeaveProrateState,
  action: LeaveProrateActions
): ILeaveProrateState {
  switch (action.type) {
    case LeaveProrateActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LeaveProrateActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case LeaveProrateActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LeaveProrateActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LeaveProrateActionTypes.LOADING:
      return { ...state, isLoading: true };
    case LeaveProrateActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case LeaveProrateActionTypes.LOAD_PRORATE_DATA_SUCCESS:
      return {...state, prorateData: action.payload.map(data => Object.assign({}, data, {
       gradeInfo: data.GradeInfo.description}))};
    default: {
      return state;
    }
  }
}
