import { Action } from '@ngrx/store';
import { IPayrollProfile } from '@nutela/models/compensation/payment';



export enum LastRunItemActionTypes {

  SHOW_EDITOR_FINALIZE = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Show Finalize Editor',
  HIDE_EDITOR_FINALIZE = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Hide Finalize Editor',

  SHOW_STATUS_VIEWER = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Show Status Viewer',
  HIDE_STATUS_VIEWER = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Hide Status Viewer',

  SHOW_FIGURE_VIEWER = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Show Figure Viewer',
  HIDE_FIGURE_VIEWER = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Hide Figure Viewer',

  PROCESSING = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Processing',
  NOT_PROCESSING = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Not Processing',

  LOADING = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Loading',
  NOT_LOADING = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Not Loading',

  LOAD_REPORT_URL_DATA = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load Report Url Data',
  LOAD_REPORT_URL_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load Report Url Data Success',

  LOAD_LAST_RUN_DATA = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load Last Run Data',
  LOAD_LAST_RUN_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load Last Run Data Success',

  LOAD_BY_ID_PAYROLL_PROFILE_DATA = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load By Id Payroll Profile Data',
  LOAD_BY_ID_PAYROLL_PROFILE_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load By Id Payroll Profile Data Success',

  LOAD_EMPLOYEE_DATA = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load Employee Data',
  LOAD_EMPLOYEE_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load Employee Data Success',

  LOAD_PAYSLIP_DATA = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load Payslip Data',
  LOAD_PAYSLIP_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load Payslip Data Success',

  LOAD_LAST_RUN_STATUS_DATA = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load Last Run Status Data',
  LOAD_LAST_RUN_STATUS_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load Last Run Status Data Success',

  LOAD_CAN_CANCEL_DATA = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load Can Cancel Data',
  LOAD_CAN_CANCEL_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load Can Cancel Data Success',

  LOAD_SEND_FOR_APPROVAL_MESSAGE_DATA = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load Send For Approval Message Data',
  LOAD_SEND_FOR_APPROVAL_MESSAGE_DATA_SUCCESS = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Load Send For Approval Message Data Success',

  SEND_FOR_APPROVAL = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Send for Approval',
  RECOVER_LAST_RUN_ITEM = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Recover Last Run Item',
  SAVE_RUN_FINALIZE = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Save Run Finalize',
  CANCEL_RUN = '[ PAYROLL EXECUTION PROCESS - LAST RUN ITEM ] Cancel Run',
}


export class ShowEditorFinalize implements Action {
  readonly type = LastRunItemActionTypes.SHOW_EDITOR_FINALIZE;
}

export class HideEditorFinalize implements Action {
  readonly type = LastRunItemActionTypes.HIDE_EDITOR_FINALIZE;
}

export class ShowViewerLastRunStatus implements Action {
  readonly type = LastRunItemActionTypes.SHOW_STATUS_VIEWER;
}

export class HideViewerLastRunStatus implements Action {
  readonly type = LastRunItemActionTypes.HIDE_STATUS_VIEWER;
}

export class ShowViewerLastRunFigure implements Action {
  readonly type = LastRunItemActionTypes.SHOW_FIGURE_VIEWER;
}

export class HideViewerLastRunFigure implements Action {
  readonly type = LastRunItemActionTypes.HIDE_FIGURE_VIEWER;
}

export class ProcessingLastRunItem implements Action {
  readonly type = LastRunItemActionTypes.PROCESSING;
}

export class NotProcessingLastRunItem implements Action {
  readonly type = LastRunItemActionTypes.NOT_PROCESSING;
}

export class LoadingLastRunItem implements Action {
  readonly type = LastRunItemActionTypes.LOADING;
}

export class NotLoadingLastRunItem implements Action {
  readonly type = LastRunItemActionTypes.NOT_LOADING;
}


export class LoadLastRunData implements Action {
  readonly type = LastRunItemActionTypes.LOAD_LAST_RUN_DATA;

  constructor(public payload: {payrollProfileID: number, payrollPeriod: any }) { }
}

export class LoadLastRunDataSuccess implements Action {
  readonly type = LastRunItemActionTypes.LOAD_LAST_RUN_DATA_SUCCESS;
  constructor(public payload: any[]) { }
}

export class LoadByIdPayrollProfileData implements Action {
  readonly type = LastRunItemActionTypes.LOAD_BY_ID_PAYROLL_PROFILE_DATA;
  constructor(public payload: {payrollProfileID: number}) { }
}

export class LoadByIdPayrollProfileDataSuccess implements Action {
  readonly type = LastRunItemActionTypes.LOAD_BY_ID_PAYROLL_PROFILE_DATA_SUCCESS;
  constructor(public payload: IPayrollProfile) { }
}

export class LoadEmployeeData implements Action {
  readonly type = LastRunItemActionTypes.LOAD_EMPLOYEE_DATA;

  constructor(public payload: {payrollRunID: number, payrollProfileID: number}) { }
}

export class LoadEmployeeDataSuccess implements Action {
  readonly type = LastRunItemActionTypes.LOAD_EMPLOYEE_DATA_SUCCESS;
  constructor(public payload: any[]) { }
}

export class LoadPayslipData implements Action {
  readonly type = LastRunItemActionTypes.LOAD_PAYSLIP_DATA;

  constructor(public payload: {payrollDate: string, employeeID: number, payrollProfileID: number}) { }
}

export class LoadPayslipDataSuccess implements Action {
  readonly type = LastRunItemActionTypes.LOAD_PAYSLIP_DATA_SUCCESS;
  constructor(public payload: any[]) { }
}

export class LoadReportUrlData implements Action {
  readonly type = LastRunItemActionTypes.LOAD_REPORT_URL_DATA;

  constructor(public payload: {payrollRunID: number}) { }
}

export class LoadReportUrlDataSuccess implements Action {
  readonly type = LastRunItemActionTypes.LOAD_REPORT_URL_DATA_SUCCESS;

  constructor(public payload: any) { }
}

export class LoadLastRunStatusData implements Action {
  readonly type = LastRunItemActionTypes.LOAD_LAST_RUN_STATUS_DATA;

  constructor(public payload: {payrollRunID: number}) { }
}

export class LoadLastRunStatusDataSuccess implements Action {
  readonly type = LastRunItemActionTypes.LOAD_LAST_RUN_STATUS_DATA_SUCCESS;

  constructor(public payload: IPayrollProfile[]) { }
}

export class LoadCanCancelData implements Action {
  readonly type = LastRunItemActionTypes.LOAD_CAN_CANCEL_DATA;
  constructor(public payload: { payrollRunID: number }) { }
}

export class LoadCanCancelDataSuccess implements Action {
  readonly type = LastRunItemActionTypes.LOAD_CAN_CANCEL_DATA_SUCCESS;
  constructor(public payload: any[]) { }
}

export class LoadSendForApprovalMessageData implements Action {
  readonly type = LastRunItemActionTypes.LOAD_SEND_FOR_APPROVAL_MESSAGE_DATA;

  constructor(public payload: { payrollRunID: number}) { }
}

export class LoadSendForApprovalMessageDataSuccess implements Action {
  readonly type = LastRunItemActionTypes.LOAD_SEND_FOR_APPROVAL_MESSAGE_DATA_SUCCESS;

  constructor(public payload: any) { }
}

export class SendRunDataForApproval implements Action {
  readonly type = LastRunItemActionTypes.SEND_FOR_APPROVAL;

  constructor(public payload: { payrollRunID: number, payrollProfileID: number, payrollPeriod: string }) { }
}

export class SavePayrollRunFinalize implements Action {
  readonly type = LastRunItemActionTypes.SAVE_RUN_FINALIZE;

  constructor(public payload: { data: any, recordId: number, payrollProfileID: number, payrollPeriod: string }) { }
}

export class CancelRun implements Action {
  readonly type = LastRunItemActionTypes.CANCEL_RUN;

  constructor(public payload: { payrollRunId: number, payrollProfileID: number, payrollPeriod: string }) { }
}


export type LastRunItemActions =
  | ShowEditorFinalize
  | HideEditorFinalize
  | ShowViewerLastRunStatus
  | HideViewerLastRunStatus
  | ShowViewerLastRunFigure
  | HideViewerLastRunFigure
  | ProcessingLastRunItem
  | NotProcessingLastRunItem
  | LoadingLastRunItem
  | NotLoadingLastRunItem
  | LoadLastRunData
  | LoadLastRunDataSuccess
  | LoadReportUrlData
  | LoadReportUrlDataSuccess
  | LoadEmployeeData
  | LoadEmployeeDataSuccess
  | LoadPayslipData
  | LoadPayslipDataSuccess
  | LoadLastRunStatusData
  | LoadLastRunStatusDataSuccess
  | LoadCanCancelData
  | LoadCanCancelDataSuccess
  | LoadSendForApprovalMessageData
  | LoadSendForApprovalMessageDataSuccess
  | SendRunDataForApproval
  | SavePayrollRunFinalize
  | LoadByIdPayrollProfileData
  | LoadByIdPayrollProfileDataSuccess
