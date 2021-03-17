
import { INotification } from '@nutela/models/foundation';
import { ISelectOption } from '@nutela/models/core-data';


export interface INotificationState {
  notificationData: INotification[];
  description:any;
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  position:ISelectOption[];
  notificationTo:ISelectOption[];
  process: ISelectOption[];
  roles: ISelectOption[];
}

export const initialNotificationState: INotificationState = {
  notificationData: [],
  description: [],
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  position:[],
  notificationTo:[],
  process: [],
  roles: []
}

