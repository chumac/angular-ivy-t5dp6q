import { initialWorkflowStepState, IWorkflowStepState } from './workflow-step.state';
import { WorkflowStepActions, WorkflowStepActionTypes } from './workflow-step.actions';

export function workflowStepReducer(
  state = initialWorkflowStepState,
  action: WorkflowStepActions
): IWorkflowStepState {
  switch (action.type) {
    case WorkflowStepActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case WorkflowStepActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case WorkflowStepActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case WorkflowStepActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case WorkflowStepActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case WorkflowStepActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case WorkflowStepActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, workflowStepData: action.payload };
    case WorkflowStepActionTypes.LOAD_WORKFLOW_DEFINITION_SUCCESS:
      return { ...state, workflowDefList: action.payload };
    case WorkflowStepActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case WorkflowStepActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    default: {
      return state;
    }
  }
}

