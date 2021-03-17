import {
  initialScheduleDetailState,
  IScheduleDetailState
} from './schedule-details.state';
import {
  ScheduleDetailActions,
  ScheduleDetailActionTypes
} from './schedule-details.actions';

export function scheduleDetailReducer(
  state = initialScheduleDetailState,
  action: ScheduleDetailActions
): IScheduleDetailState {
  switch (action.type) {
    case ScheduleDetailActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ScheduleDetailActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };

    case ScheduleDetailActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ScheduleDetailActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };

    case ScheduleDetailActionTypes.PROCESSING_DATA:
      return { ...state, isProcessing: true };
    case ScheduleDetailActionTypes.NOT_PROCESSING_DATA:
      return { ...state, isProcessing: false };

    case ScheduleDetailActionTypes.PROCESSING_DATA_GRID:
      return { ...state, isProcessingDataGrid: true };
    case ScheduleDetailActionTypes.NOT_PROCESSING_DATA_GRID:
      return { ...state, isProcessingDataGrid: false };

    case ScheduleDetailActionTypes.UPLOADING_DATA:
      return { ...state, isUploading: true };
    case ScheduleDetailActionTypes.NOT_UPLOADING_DATA:
      return { ...state, isUploading: false };

    case ScheduleDetailActionTypes.LOADING_DATA:
      return { ...state, isLoading: true };
    case ScheduleDetailActionTypes.NOT_LOADING_DATA:
      return { ...state, isLoading: false };

    case ScheduleDetailActionTypes.VALIDATING_RECORD_DATA:
      return { ...state, isValidatingRecord: true };
    case ScheduleDetailActionTypes.NOT_VALIDATING_RECORD_DATA:
      return { ...state, isValidatingRecord: false };

    case ScheduleDetailActionTypes.SUBMITTING_DATA:
      return { ...state, isSubmitting: true };
    case ScheduleDetailActionTypes.NOT_SUBMITTING_DATA:
      return { ...state, isSubmitting: false };

    case ScheduleDetailActionTypes.REQUEUEING_DATA:
      return { ...state, isRequeueing: true };
    case ScheduleDetailActionTypes.NOT_REQUEUEING_DATA:
      return { ...state, isRequeueing: false };

    case ScheduleDetailActionTypes.RESETING_DATA:
      return { ...state, isReseting: true };
    case ScheduleDetailActionTypes.NOT_RESETING_DATA:
      return { ...state, isReseting: false };

    case ScheduleDetailActionTypes.PAYMENT_SUCCESS:
      return { ...state, paySuccess: true };

    case ScheduleDetailActionTypes.PAYMENT_FAILURE:
      return { ...state, paySuccess: false };

    case ScheduleDetailActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, data: action.payload };

    case ScheduleDetailActionTypes.LOAD_SINGLE_SCHEDULE_DATA_SUCCESS:
      return { ...state, scheduleData: action.payload };

    case ScheduleDetailActionTypes.LOAD_CURRENCY_DATA_SUCCESS:
      return { ...state, currencyData: action.payload };

    case ScheduleDetailActionTypes.LOAD_ACCOUNT_TYPE_DATA_SUCCESS:
      return { ...state, accountTypeData: action.payload };

    default: {
      return state;
    }
  }
}
