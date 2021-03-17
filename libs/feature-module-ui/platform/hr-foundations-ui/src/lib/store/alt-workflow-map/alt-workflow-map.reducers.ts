import { initialWorkflowMapAlternateState, IWorkflowMapAlternateState } from './alt-workflow-map.state';
import { WorkflowAlternatesActionTypes, IWorkflowAlternatesActions } from './alt-workflow-map.actions';

export function workFlowMapAlternateReducer(
  state = initialWorkflowMapAlternateState,
  action: IWorkflowAlternatesActions
): IWorkflowMapAlternateState {
  switch (action.type) {
    case  WorkflowAlternatesActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case  WorkflowAlternatesActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case  WorkflowAlternatesActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case  WorkflowAlternatesActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case  WorkflowAlternatesActionTypes.LOADING:
      return { ...state, isLoading: true };
    case  WorkflowAlternatesActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case  WorkflowAlternatesActionTypes.LOAD_ALT_WORK_MAP_SINGLE_DATA_SUCCESS:
      return { ...state, singleMapData: action.payload };
    case  WorkflowAlternatesActionTypes.LOAD_ALT_WORK_MAP_DATA_SUCCESS:
      return { ...state, altWorkMapData: action.payload };
    case WorkflowAlternatesActionTypes.LOAD_SYSTEM_DATA_SUCCESS:
      return { ...state, systemData: action.payload };
    case WorkflowAlternatesActionTypes.LOAD_WORK_DEFINITION_DATA_SUCCESS:
      return { ...state, workDefinitionData: action.payload };
    case WorkflowAlternatesActionTypes.LOAD_COST_CENTER_SUCCESS:
      return { ...state, costCenter: action.payload };
    case WorkflowAlternatesActionTypes.LOAD_GRADE_SUCCESS:
      return { ...state, grade: action.payload };
    case WorkflowAlternatesActionTypes.LOAD_FOR_EMPLOYEE_SUCCESS:
      return { ...state, forEmployee: action.payload };
    case WorkflowAlternatesActionTypes.LOAD_POSITION_SUCCESS:
      return { ...state, position: action.payload };
    case WorkflowAlternatesActionTypes.LOAD_POSITION_CATEGORY_SUCCESS:
      return { ...state, positionCategory: action.payload };
    case WorkflowAlternatesActionTypes.LOAD_CATEGORY_SUCCESS:
      return { ...state, category: action.payload };
    case WorkflowAlternatesActionTypes.LOAD_DESIGNATION_SUCCESS:
      return { ...state, designation: action.payload };
    case WorkflowAlternatesActionTypes.LOAD_STAFF_GROUP_SUCCESS:
      return { ...state, staffGroup: action.payload };
    default: {
      return state;
    }
  }
}
