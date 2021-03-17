import {
  initialPendingScheduleState,
  IPendingScheduleState
} from './pending.state';
import {
  PendingScheduleActions,
  PendingScheduleActionTypes
} from './pending.actions';

export function pendingScheduleReducer(
  state = initialPendingScheduleState,
  action: PendingScheduleActions
): IPendingScheduleState {
  switch (action.type) {
    case PendingScheduleActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case PendingScheduleActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };

    case PendingScheduleActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case PendingScheduleActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };

    case PendingScheduleActionTypes.PROCESSING_DATA:
      return { ...state, isProcessing: true };
    case PendingScheduleActionTypes.NOT_PROCESSING_DATA:
      return { ...state, isProcessing: false };

    case PendingScheduleActionTypes.LOADING_DATA:
      return { ...state, isLoading: true };
    case PendingScheduleActionTypes.NOT_LOADING_DATA:
      return { ...state, isLoading: false };

    case PendingScheduleActionTypes.SUBMITTING_DATA:
      return { ...state, isSubmitting: true };
    case PendingScheduleActionTypes.NOT_SUBMITTING_DATA:
      return { ...state, isSubmitting: false };

    case PendingScheduleActionTypes.LOAD_NEW_SCHEDULE_DATA_SUCCESS:
      return { ...state, newScheduleData: action.payload };

    case PendingScheduleActionTypes.LOAD_AWAITING_SUBMISSION_DATA_SUCCESS:
      return { ...state, awaitingSubmissionData: action.payload };

    case PendingScheduleActionTypes.LOAD_PAYMENT_PLATFORM_DATA_SUCCESS:
      return { ...state, paymentPlatformData: action.payload };

    case PendingScheduleActionTypes.LOAD_CURRENCY_DATA_SUCCESS:
      return { ...state, currencyData: action.payload };

    case PendingScheduleActionTypes.LOAD_ACCOUNT_TYPE_DATA_SUCCESS:
      return { ...state, accountTypeData: action.payload };

    case PendingScheduleActionTypes.LOAD_PAYMENT_SOURCE_DATA_SUCCESS:
      return { ...state, paymentSourceData: action.payload };

    case PendingScheduleActionTypes.LOAD_PAYROLL_PROFILE_DATA_SUCCESS:
      return { ...state, payrollProfileData: action.payload };

    case PendingScheduleActionTypes.LOAD_PAYROLL_SOURCE_DATA_SUCCESS:
      return { ...state, payrollSourceData: action.payload };

    case PendingScheduleActionTypes.LOAD_PAYROLL_DATE_DATA_SUCCESS:
      return { ...state, payrollDates: action.payload };

    default: {
      return state;
    }
  }
}
