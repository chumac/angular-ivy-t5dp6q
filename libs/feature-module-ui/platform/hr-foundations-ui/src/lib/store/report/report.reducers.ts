import { initialReportState, IReportState } from './report.state';
import { ReportActions, ReportActionTypes } from './report.actions';

export function reportReducer(
  state = initialReportState,
  action: ReportActions
): IReportState {
  switch (action.type) {
    case ReportActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ReportActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case ReportActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReportActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReportActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReportActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReportActionTypes.LOADING_REPORTS:
      return { ...state, isLoading: true };
    case ReportActionTypes.NOT_LOADING_REPORTS:
      return { ...state, isLoading: false };
    case ReportActionTypes.LOAD_STANDARD_REPORT_DATA_SUCCESS:
      return { ...state, standardReport: action.payload };
    case ReportActionTypes.LOAD_REPORT_PERMISSION_DATA_SUCCESS:
      return {
        ...state, reportPermission: action.payload.map(data => Object.assign({}, data, {
          rolename: data.RolesInfo ? data.RolesInfo.rolename : '',
          userRolename: data.RolesInfo ? data.RolesInfo.user_rolename : '',
          description: data.StandardReportPathsInfo ? data.StandardReportPathsInfo.description : '',
        }))
      };
    case ReportActionTypes.LOAD_ROLE_DATA_SUCCESS:
      return { ...state, role: action.payload };
    default: {
      return state;
    }
  }
}
