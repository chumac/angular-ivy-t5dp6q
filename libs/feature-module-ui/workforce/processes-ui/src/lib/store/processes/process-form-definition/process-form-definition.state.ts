import { IProcessFormDefinition, IProcessFormArea } from '@nutela/models/workforce/employee-profiles';

export interface IProcessFormDefinitionState {
  processFormDefinitionData: IProcessFormDefinition[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  area: IProcessFormArea[];
}

export const initialProcessFormDefinitionState: IProcessFormDefinitionState = {
  processFormDefinitionData: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  area: []
}

