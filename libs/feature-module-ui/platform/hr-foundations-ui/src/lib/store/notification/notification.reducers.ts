import { initialNotificationState, INotificationState } from './notification.state';
import { NotificationActions, NotificationActionTypes } from './notification.actions';

export function notificationReducer(
  state = initialNotificationState,
  action: NotificationActions
): INotificationState {
  switch (action.type) {
    case NotificationActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case NotificationActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case NotificationActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case NotificationActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case NotificationActionTypes.LOADING:
      return { ...state, isLoading: true };
    case NotificationActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case NotificationActionTypes.LOAD_NOTIFICATION_DATA_SUCCESS:
      return { ...state, notificationData: action.payload };
    case NotificationActionTypes.LOAD_POSITION_DATA_SUCCESS:
      return { ...state, position: action.payload };
    case NotificationActionTypes.LOAD_NOTIFICATION_TO_SUCCESS:
      return { ...state, notificationTo: action.payload };
    case NotificationActionTypes.LOAD_PROCESS_SUCCESS:
      return { ...state, process: action.payload };
    case NotificationActionTypes.LOAD_ROLES_SUCCESS:
      return { ...state, roles: action.payload };
    default: {
      return state;
    }
  }
}
