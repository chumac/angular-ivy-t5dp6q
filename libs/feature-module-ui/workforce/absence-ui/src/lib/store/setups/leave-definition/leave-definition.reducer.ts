import {
  initialLeaveDefinitionState,
  ILeaveDefinitionState
} from './leave-definition.state';
import {
  LeaveDefinitionActionTypes, LeaveDefinitionActions
} from './leave-definition.actions';

export function leaveDefinitionReducer(
  state = initialLeaveDefinitionState,
  action: LeaveDefinitionActions
): ILeaveDefinitionState {
  switch (action.type) {
    case LeaveDefinitionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case LeaveDefinitionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case LeaveDefinitionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case LeaveDefinitionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case LeaveDefinitionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LeaveDefinitionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LeaveDefinitionActionTypes.LOADING_LEAVE_DEFINITION:
      return { ...state, isLoading: true };
    case LeaveDefinitionActionTypes.NOT_LOADING_LEAVE_DEFINITION:
      return { ...state, isLoading: false };
    case LeaveDefinitionActionTypes.LOAD_DEFINITION_DATA_SUCCESS:
      return {...state, definitionData: action.payload};
    default: {
      return state;
    }
  }
}
