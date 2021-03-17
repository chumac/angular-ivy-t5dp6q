import { initialChecklistState, IChecklistState } from './checklist.state';
import { ChecklistActions, ChecklistActionTypes } from './checklist.actions';

export function checklistReducer(
  state = initialChecklistState,
  action: ChecklistActions
): IChecklistState {
  switch (action.type) {
    case ChecklistActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ChecklistActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ChecklistActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ChecklistActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ChecklistActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ChecklistActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ChecklistActionTypes.LOAD_CHECKLIST_DATA_SUCCESS:
      return { ...state, checklist: action.payload };
    case ChecklistActionTypes.LOAD_VALIDATION_ROLE_DATA_SUCCESS:
      return { ...state, validationRoleData: action.payload };
    case ChecklistActionTypes.LOAD_WORKFLOW_DEFINITION_DATA_SUCCESS:
      return { ...state, workflowDefinitions: action.payload };
    case ChecklistActionTypes.LOAD_ROLES_SELECT_OPTION_DATA_SUCCESS:
      return { ...state, roles: action.payload };
    case ChecklistActionTypes.LOAD_POSITION_SELECT_OPTION_DATA_SUCCESS:
      return { ...state, positions: action.payload };
    default: {
      return state;
    }
  }
}
