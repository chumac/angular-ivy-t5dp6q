import { ICity} from "@nutela/models/platform/lookup";
import { ISelectOption } from "@nutela/models/core-data";

export interface ICityState {
  cityData: ICity[];
  showEditor:boolean;
  isProcessing: boolean;
  nationality:ISelectOption[];
  stateData:ISelectOption[];
 
}

export const initialCityState: ICityState = {
  cityData: [],
  showEditor: false,
  isProcessing: false,
  nationality:[],
  stateData:[],
}

