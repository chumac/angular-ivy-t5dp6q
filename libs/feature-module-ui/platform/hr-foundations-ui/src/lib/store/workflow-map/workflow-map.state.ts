import { IWorkflowMap } from '@nutela/models/foundation';
import { ISelectOption } from '@nutela/models/core-data';



export interface IWorkflowMapState  {
  workFlowMapData: IWorkflowMap[];
  isProcessing: boolean;
  showEditor: boolean;
  systemData: ISelectOption[];
  workDefinitionData: ISelectOption[];
}

export const initialWorkflowMapState: IWorkflowMapState = {
  workFlowMapData: [],
  isProcessing: false,
  showEditor: false,
  systemData:[],
  workDefinitionData:[],
}


