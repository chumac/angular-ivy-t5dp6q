import { IApprovalNotification } from "@nutela/models/common";

export interface INotificationState {
  queueData: IApprovalNotification[];
  numberOfResponses: number;
  numberOfHRResponses: number;
  initiatedProcess: boolean;
}

export const initialNotificationState: INotificationState = {
  queueData: [],
  numberOfResponses: null,
  numberOfHRResponses: null,
  initiatedProcess: null
}
