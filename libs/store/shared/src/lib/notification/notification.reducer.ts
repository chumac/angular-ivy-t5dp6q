
import { INotificationState, initialNotificationState } from "./notification.state";
import { NotificationActions, NotificationActionTypes } from "./notification.actions";

export function notificationReducer(state: INotificationState = initialNotificationState, action: NotificationActions) {
  switch (action.type) {
    case NotificationActionTypes.LOAD_QUEUE_SUCCESS:
      return { ...state, queueData: action.payload.approvalQueueData };
    case NotificationActionTypes.LOAD_NUMBER_OF_RESPONSES_SUCCESS:
      return { ...state, numberOfResponses: action.payload };
    case NotificationActionTypes.LOAD_HR_NUMBER_OF_RESPONSES_SUCCESS:
      return { ...state, numberOfHRResponses: action.payload };
    case NotificationActionTypes.LOAD_INITIATION_STATUS_SUCCESS:
      return { ...state, initiatedProcess: action.payload };
    default:
      return state;
  }
}
