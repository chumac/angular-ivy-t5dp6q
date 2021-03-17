
import { ILeaveProrate} from '@nutela/models/workforce/leave';


export interface ILeaveProrateState {
  prorateData: ILeaveProrate[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;

}

export const initialLeaveProrateState: ILeaveProrateState = {
  prorateData: [],
  isLoading: false,
  isProcessing: false,
  showEditor: false,
}

