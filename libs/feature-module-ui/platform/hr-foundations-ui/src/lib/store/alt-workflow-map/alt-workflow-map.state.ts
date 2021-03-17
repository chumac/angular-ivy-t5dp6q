import {IWorkflowAlternates} from '@nutela/models/foundation';
import { ISelectOption } from '@nutela/models/core-data';




export interface IWorkflowMapAlternateState  {
  altWorkMapData: IWorkflowAlternates[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  singleMapData:IWorkflowAlternates[];
  systemData: ISelectOption[];
  workDefinitionData: ISelectOption[];
  costCenter:ISelectOption[];
  grade:ISelectOption[];
  forEmployee:ISelectOption[];
  positionCategory:ISelectOption[],
  position:ISelectOption[],
  designation:ISelectOption[],
  category:ISelectOption[],
  staffGroup:ISelectOption[],

}

export const initialWorkflowMapAlternateState: IWorkflowMapAlternateState = {
  altWorkMapData: [],
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  singleMapData:[],
  systemData:[],
  workDefinitionData:[],
  costCenter:[],
  grade:[],
  forEmployee:[],
  positionCategory:[],
  position:[],
  designation:[],
  category:[],
  staffGroup:[],
}


