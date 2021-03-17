
import { IOptions } from '@nutela/models/foundation';


export interface IOptionsState {
  customData: IOptions[];
  globalData: IOptions[];
  description:any;
  option_value:any;
  isProcessing: boolean;
  showEditor: boolean;
}

export const initialOptionsState: IOptionsState = {
  customData: [],
  globalData:[],
  description: null,
  option_value: null,
  isProcessing: false,
  showEditor: false,
}

