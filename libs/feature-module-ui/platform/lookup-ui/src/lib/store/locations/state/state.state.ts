import { IState } from "@nutela/models/platform/lookup";
import { ISelectOption } from "@nutela/models/core-data";

export interface IStateState {
  stateData: IState[];
  showEditor:boolean;
  isProcessing: boolean;
  nationality:ISelectOption[];
 
}

export const initialStateState: IStateState = {
  stateData: [],
  showEditor: false,
  isProcessing: false,
  nationality:[],
}

