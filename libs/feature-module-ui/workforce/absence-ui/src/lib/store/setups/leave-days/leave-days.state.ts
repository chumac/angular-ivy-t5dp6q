
import { ILeaveDays} from '@nutela/models/workforce/leave';


export interface ILeaveDaysState {
  daysData: ILeaveDays[];
  isProcessing: boolean;
  showEditor: boolean;

}

export const initialLeaveDaysState: ILeaveDaysState = {
  daysData: [],
  isProcessing: false,
  showEditor: false,
}

