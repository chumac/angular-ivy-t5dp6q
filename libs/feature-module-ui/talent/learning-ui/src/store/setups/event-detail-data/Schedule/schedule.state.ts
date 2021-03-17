
import { IEventDetail, IEventDetailData, IEventDetailType } from '@nutela/models/talent/learning';
import { IEventHall } from 'libs/models/talent/learning/src/lib/interfaces/event-hall.interface';
import { IEventSchedule } from 'libs/models/talent/learning/src/lib/interfaces/schedule.interface';

export interface IEventScheduleState {
  isProcessing: boolean;
  isLoading: boolean;
  eventSchedule: IEventSchedule[];
  showEventScheduleEditor : boolean;
  eventHall: IEventHall[];
  showEventScheduleView : boolean;
}

export const initialEventScheduleState: IEventScheduleState = {
  isProcessing: false,
  isLoading: false,
  eventSchedule: [],
  showEventScheduleEditor : false,
  eventHall : [],
  showEventScheduleView : false
}
