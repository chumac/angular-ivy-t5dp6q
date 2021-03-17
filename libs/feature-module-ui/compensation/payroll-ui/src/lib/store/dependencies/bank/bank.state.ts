import { IBank } from "@nutela/models/compensation/payroll";
import { ISelectOption } from "@nutela/models/core-data";



export interface IBankState {
  data: IBank[];
  showEditor:boolean;
  isProcessing: boolean;
  isLoading:boolean;
  nationality:ISelectOption[];
  stateData:ISelectOption[];
}

export const initialBankState: IBankState = {
  data: [],
  showEditor: false,
  isProcessing: false,
  isLoading:false,
  nationality:[],
  stateData:[],
}

