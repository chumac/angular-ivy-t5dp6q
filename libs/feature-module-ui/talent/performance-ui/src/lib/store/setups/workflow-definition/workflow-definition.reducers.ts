import { initialWorkflowDefinitionState, IWorkflowDefinitionState } from './workflow-definition.state';
import { WorkflowDefinitionActions, WorkflowDefinitionActionTypes } from './workflow-definition.actions';

export function workflowDefinitionReducer(
  state = initialWorkflowDefinitionState,
  action: WorkflowDefinitionActions
): IWorkflowDefinitionState {
  switch (action.type) {
    case WorkflowDefinitionActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case WorkflowDefinitionActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case WorkflowDefinitionActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case WorkflowDefinitionActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case WorkflowDefinitionActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case WorkflowDefinitionActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case WorkflowDefinitionActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, workflowDefinitionData: action.payload };
    case WorkflowDefinitionActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    case WorkflowDefinitionActionTypes.REMOVE_DATA:
      return { ...state, workflowDefinitionData: state.workflowDefinitionData.filter(item => item.id !== action.payload.recordId) };
    case WorkflowDefinitionActionTypes.CLEAR_DOCUMENT:
      return { ...state, document: null };
    case WorkflowDefinitionActionTypes.LOAD_ANALYSIS_LIST_SUCCESS:
      return { ...state, analysisList: action.payload };
    case WorkflowDefinitionActionTypes.LOAD_ANALYSIS_DETAIL_LIST_SUCCESS:
      return { ...state, analysisDetList: action.payload };
    case WorkflowDefinitionActionTypes.LOAD_POSITION_LIST_SUCCESS:
      return { ...state, positionList: action.payload };
    case WorkflowDefinitionActionTypes.LOAD_DESIGNATION_LIST_SUCCESS:
      return { ...state, designationList: action.payload };
    case WorkflowDefinitionActionTypes.LOAD_GRADE_LIST_SUCCESS:
      return { ...state, gradeList: action.payload };
    case WorkflowDefinitionActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS:
      return { ...state, employeeList: action.payload };
    default: {
      return state;
    }
  }
}

