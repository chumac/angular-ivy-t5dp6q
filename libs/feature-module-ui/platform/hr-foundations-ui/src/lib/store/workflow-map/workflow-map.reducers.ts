import { initialWorkflowMapState, IWorkflowMapState } from './workflow-map.state';
import { WorkflowMapActions, WorkflowMapActionTypes } from './workflow-map.actions';

export function workFlowMapReducer(
  state = initialWorkflowMapState,
  action: WorkflowMapActions
): IWorkflowMapState {
  switch (action.type) {
    case WorkflowMapActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case WorkflowMapActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case WorkflowMapActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case WorkflowMapActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case WorkflowMapActionTypes.LOAD_WORK_MAP_DATA_SUCCESS:
      return { ...state, workFlowMapData: action.payload.map(data => Object.assign({}, data, {
        SysEntities: data.SysEntitesInfo.entitydescription},
        {WorkflowDefintion:data.WorkflowDefintionInfo.description}))};
    case WorkflowMapActionTypes.LOAD_SYSTEM_DATA_SUCCESS:
      return { ...state, systemData: action.payload };
    case WorkflowMapActionTypes.LOAD_WORK_DEFINITION_DATA_SUCCESS:
      return { ...state, workDefinitionData: action.payload };
    default: {
      return state;
    }
  }
}
