import { IPfa } from "@nutela/models/compensation/payroll";
import { ISelectOption } from "@nutela/models/core-data";



export interface IPfaState {
  data: IPfa[];
  showEditor:boolean;
  isProcessing: boolean;
  isLoading:boolean;
  nationality:ISelectOption[];
  stateData:ISelectOption[];
  cityData:ISelectOption[];

}

export const initialPfaState: IPfaState = {
  data: [],
  showEditor: false,
  isProcessing: false,
  isLoading:false,
  nationality:[],
  stateData:[],
  cityData:[],
}

