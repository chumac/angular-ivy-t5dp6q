import { ReportActions, ReportActionTypes } from './report.actions';
import { initialReportState, IReportState } from './report.state';

export function reportReducer(
  state = initialReportState,
  action: ReportActions
): IReportState {
  switch (action.type) {
    case ReportActionTypes.LOAD_DATA_SUCCESS:
      return { ...state, reportData: action.payload };
    case ReportActionTypes.LOAD_DATA_SINGLE_SUCCESS:
      return { ...state, reportSingleData: action.payload };
    case ReportActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReportActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReportActionTypes.LOAD_REPORT_URL_SUCCESS:
      return { ...state, reportUrl: action.payload };

    default: {
      return state;
    }
  }
}
