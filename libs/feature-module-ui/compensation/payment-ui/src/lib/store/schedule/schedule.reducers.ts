import {
  initialScheduleState,
  IScheduleState
} from './schedule.state';
import {
  ScheduleActions,
  ScheduleActionTypes
} from './schedule.actions';

export function scheduleReducer(
  state = initialScheduleState,
  action: ScheduleActions
): IScheduleState {
  switch (action.type) {
    case ScheduleActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ScheduleActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };

    case ScheduleActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ScheduleActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };

    case ScheduleActionTypes.PROCESSING_DATA:
      return { ...state, isProcessing: true };
    case ScheduleActionTypes.NOT_PROCESSING_DATA:
      return { ...state, isProcessing: false };

    case ScheduleActionTypes.LOADING_DATA:
      return { ...state, isLoading: true };
    case ScheduleActionTypes.NOT_LOADING_DATA:
      return { ...state, isLoading: false };

    case ScheduleActionTypes.LOAD_APPROVED_DATA_SUCCESS:
      return { ...state, approvedData: action.payload };

    case ScheduleActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS:
      return { ...state, awaitingData: action.payload };

    case ScheduleActionTypes.LOAD_CLOSED_DATA_SUCCESS:
      return { ...state, closedData: action.payload };

    case ScheduleActionTypes.LOAD_COMPLETED_DATA_SUCCESS:
      return { ...state, completedData: action.payload };

    case ScheduleActionTypes.LOAD_PAYMENT_PLATFORM_DATA_SUCCESS:
      return { ...state, paymentPlatformData: action.payload };

    case ScheduleActionTypes.LOAD_CURRENCY_DATA_SUCCESS:
      return { ...state, currencyData: action.payload };

    case ScheduleActionTypes.LOAD_ACCOUNT_TYPE_DATA_SUCCESS:
      return { ...state, accountTypeData: action.payload };

    case ScheduleActionTypes.LOAD_PAYMENT_SOURCE_DATA_SUCCESS:
      return { ...state, paymentSourceData: action.payload };

    case ScheduleActionTypes.LOAD_PAYROLL_PROFILE_DATA_SUCCESS:
      return { ...state, payrollProfileData: action.payload };

    case ScheduleActionTypes.LOAD_PAYROLL_SOURCE_DATA_SUCCESS:
      return { ...state, payrollSourceData: action.payload };

    case ScheduleActionTypes.SAVING_SCHEDULE:
      return { ...state, isSaving: true };

    case ScheduleActionTypes.NOT_SAVING_SCHEDULE:
      return { ...state, isSaving: false };

    default: {
      return state;
    }
  }
}
