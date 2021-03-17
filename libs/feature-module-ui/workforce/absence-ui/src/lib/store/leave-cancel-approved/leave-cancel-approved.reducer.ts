import {
  initialLeaveCancelApprovedState,
  ILeaveCancelApprovedState
} from './leave-cancel-approved.state';
import {
  LeaveCancelApprovedActionTypes, LeaveCancelApprovedActions
} from './leave-cancel-approved.actions';

export function leaveCancelApprovedReducer(
  state = initialLeaveCancelApprovedState,
  action: LeaveCancelApprovedActions
): ILeaveCancelApprovedState {
  switch (action.type) {
    case LeaveCancelApprovedActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LeaveCancelApprovedActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case LeaveCancelApprovedActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LeaveCancelApprovedActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };

    default: {
      return state;
    }
  }
}
