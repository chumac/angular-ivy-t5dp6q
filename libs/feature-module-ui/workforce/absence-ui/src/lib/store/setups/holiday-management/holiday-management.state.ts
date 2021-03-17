
import { IPublicHoliday} from '@nutela/models/workforce/leave';


export interface IPublicHolidayState {
  holidayData: IPublicHoliday[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;

}

export const initialPublicHolidayState: IPublicHolidayState = {
  holidayData: [],
  isProcessing: false,
  isLoading: false,
  showEditor: false,
}

