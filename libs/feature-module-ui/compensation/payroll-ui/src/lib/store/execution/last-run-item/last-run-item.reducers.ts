import { initialLastRunItemState, ILastRunItemState } from './last-run-item.state';
import { LastRunItemActions, LastRunItemActionTypes } from './last-run-item.actions';

export function lastRunItemReducer(
  state = initialLastRunItemState,
  action: LastRunItemActions
): ILastRunItemState {
  switch (action.type) {
    case LastRunItemActionTypes.SHOW_EDITOR_FINALIZE:
      return { ...state, showFinalizeEditor: true };
    case LastRunItemActionTypes.HIDE_EDITOR_FINALIZE:
      return { ...state, showFinalizeEditor: false };
    case LastRunItemActionTypes.SHOW_STATUS_VIEWER:
      return { ...state, showStatusViewer: true };
    case LastRunItemActionTypes.HIDE_STATUS_VIEWER:
      return { ...state, showStatusViewer: false };
    case LastRunItemActionTypes.SHOW_FIGURE_VIEWER:
      return { ...state, showFigureViewer: true };
    case LastRunItemActionTypes.HIDE_FIGURE_VIEWER:
      return { ...state, showFigureViewer: false };
    case LastRunItemActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case LastRunItemActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case LastRunItemActionTypes.LOADING:
      return { ...state, isLoading: true };
    case LastRunItemActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };
    case LastRunItemActionTypes.LOAD_LAST_RUN_DATA_SUCCESS:
      return {
        ...state, lastRuns: action.payload.map(data => Object.assign({}, data, {
          grouprunType: data.grouprun_value.trim().length ? `${data.grouprun_type
            } - ${data.grouprun_value}` : `${data.grouprun_type
            }`,
        })) };
    case LastRunItemActionTypes.LOAD_EMPLOYEE_DATA_SUCCESS:
      return { ...state, employeeData: action.payload };
    case LastRunItemActionTypes.LOAD_PAYSLIP_DATA_SUCCESS:
      return { ...state, payslipData: action.payload };
    case LastRunItemActionTypes.LOAD_LAST_RUN_STATUS_DATA_SUCCESS:
      return { ...state, lastRunStatus: action.payload };
    case LastRunItemActionTypes.LOAD_CAN_CANCEL_DATA_SUCCESS:
      return { ...state, canCancel: action.payload };
    case LastRunItemActionTypes.LOAD_BY_ID_PAYROLL_PROFILE_DATA_SUCCESS:
      return { ...state, payrollProfile: action.payload };
    case LastRunItemActionTypes.LOAD_REPORT_URL_DATA_SUCCESS:
      return { ...state, reportUrl: action.payload };
    case LastRunItemActionTypes.LOAD_SEND_FOR_APPROVAL_MESSAGE_DATA_SUCCESS:
      return { ...state, sendForApprovalMessage: action.payload };
    default: {
      return state;
    }
  }
}
