import { ILga } from "@nutela/models/platform/lookup";
import { ISelectOption } from "@nutela/models/core-data";

export interface ILgaState {
  lgaData: ILga[];
  showEditor:boolean;
  isProcessing: boolean;
  nationality:ISelectOption[];
  stateData:ISelectOption[];
}

export const initialLgaState: ILgaState = {
  lgaData: [],
  showEditor: false,
  isProcessing: false,
  nationality:[],
  stateData:[],
}

