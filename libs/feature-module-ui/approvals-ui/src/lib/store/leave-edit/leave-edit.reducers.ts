import { ILeaveEditState, initialLeaveEditState } from "./leave-edit.state";
import { LeaveEditActions, LeaveEditActionTypes } from "./leave-edit.actions";


export function leaveEditReducer(
  state = initialLeaveEditState,
  action: LeaveEditActions
): ILeaveEditState {
  switch (action.type) {
    case LeaveEditActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LeaveEditActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };

    case LeaveEditActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LeaveEditActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LeaveEditActionTypes.RESET_LEAVE_DATA:
      return { ...state, data: null };

    case LeaveEditActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };
    default: {
      return state;
    }
  }
}
