
import { ILeaveDefinition} from '@nutela/models/workforce/leave';


export interface ILeaveDefinitionState {
  definitionData: ILeaveDefinition[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;

}

export const initialLeaveDefinitionState: ILeaveDefinitionState = {
  definitionData: [],
  isLoading: false,
  isProcessing: false,
  showEditor: false,
  showViewer:false,
}

