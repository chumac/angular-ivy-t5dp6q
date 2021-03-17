import { IWorkDefinition } from '@nutela/models/foundation';
import { ISelectOption } from '@nutela/models/core-data';



export interface IWorkDefinitionState  {
  workDefinitionData: IWorkDefinition[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showStep:boolean;
  position:ISelectOption[];
  individual:ISelectOption[];
  role:ISelectOption[];
  sendBack: any;

}

export const initialWorkDefinitionState: IWorkDefinitionState = {
  workDefinitionData: [],
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showStep:false,
  position:[],
  individual:[],
  role:[],
  sendBack:null,

}


