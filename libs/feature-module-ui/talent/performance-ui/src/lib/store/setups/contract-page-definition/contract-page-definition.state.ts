
import { IContractPageDefinition, IPage } from '@nutela/models/talent/performance';

export interface IContractPageDefinitionState {
  contractPageDefinitionData: IContractPageDefinition[];
  contractPagesList: IPage[];
  document: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialContractPageDefinitionState: IContractPageDefinitionState = {
  contractPageDefinitionData: [],
  contractPagesList: [],
  document: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false 
}

