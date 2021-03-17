
import { ILeaveLimits, IGradeInfo, ILeaveInfo} from '@nutela/models/workforce/leave';
import { ISelectOption } from '@nutela/models/core-data';


export interface ILeaveLimitsState {
  limitData: ILeaveLimits[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  leave:ISelectOption[];
  grade:ISelectOption[];

}

export const initialLeaveLimitsState: ILeaveLimitsState = {
  limitData: [],
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  leave:[],
  grade:[],
}

