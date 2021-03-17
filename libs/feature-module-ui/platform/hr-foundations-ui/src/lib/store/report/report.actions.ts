import { Action } from '@ngrx/store';

import { IReport } from '@nutela/models/foundation';
import { ISelectOption } from '@nutela/models/core-data';


export enum ReportActionTypes {
  SHOW_EDITOR = '[REPORT] Show Editor',
  HIDE_EDITOR = '[REPORT] Hide Editor',

  SHOW_VIEWER = '[REPORT] Show Viewer',
  HIDE_VIEWER = '[REPORT] Hide Viewer',

  PROCESSING = '[REPORT] Processing',
  NOT_PROCESSING = '[REPORT] Not Processing',

  LOADING_REPORTS = '[REPORT] Loading Reports',
  NOT_LOADING_REPORTS = '[REPORT] Not Not Loading Reports',

  LOAD_STANDARD_REPORT_DATA = '[STANDARD REPORT] Load Report Data',
  LOAD_STANDARD_REPORT_DATA_SUCCESS = '[STANDARD REPORT] Load Report Data Success',

  LOAD_REPORT_PERMISSION_DATA = '[PERMISSION REPORT] Load Report Data',
  LOAD_REPORT_PERMISSION_DATA_SUCCESS = '[PERMISSION REPORT] Load Report Data Success',

  LOAD_ROLE_DATA = '[PERMISSION REPORT] Load  Role  Data',
  LOAD_ROLE_DATA_SUCCESS = '[PERMISSION REPORT] Load Role Data Success',

  SAVE_REPORT= '[SINGLE REPORT ] Save',
  SAVE_REPORT_SUCCESS = '[SINGLE REPORT] Save Success',

  SAVE_MULTIPLE_REPORT= '[MULTIPLE REPORT ] Save',
  SAVE_MULTIPLE_REPORT_SUCCESS = '[MULTIPLE REPORT] Save Success',

  DELETE_REPORT_DATA = '[REPORT] Delete REPORT Data',
  DELETE_REPORT_SUCCESS_DATA = '[REPORT] Delete REPORT Data',
}

export class ShowEditorReport implements Action {
  readonly type = ReportActionTypes.SHOW_EDITOR;
}

export class HideEditorReport implements Action {
  readonly type = ReportActionTypes.HIDE_EDITOR;
}

export class ShowViewerReport implements Action {
  readonly type = ReportActionTypes.SHOW_VIEWER;
}

export class HideViewerReport implements Action {
  readonly type = ReportActionTypes.HIDE_VIEWER;
}

export class ProcessingReport implements Action {
  readonly type = ReportActionTypes.PROCESSING;
}

export class NotProcessingReport implements Action {
  readonly type = ReportActionTypes.NOT_PROCESSING;
}

export class LoadingReport implements Action {
  readonly type = ReportActionTypes.LOADING_REPORTS;
}

export class NotLoadingReport implements Action {
  readonly type = ReportActionTypes.NOT_LOADING_REPORTS;
}

export class LoadStandardReport implements Action {
  readonly type = ReportActionTypes.LOAD_STANDARD_REPORT_DATA;
}

export class LoadStandardReportSuccess implements Action {
  readonly type = ReportActionTypes.LOAD_STANDARD_REPORT_DATA_SUCCESS;
  constructor(public payload: IReport[]) {}
}

export class LoadReportPermission implements Action {
  readonly type = ReportActionTypes.LOAD_REPORT_PERMISSION_DATA;
}

export class LoadReportPermissionSuccess implements Action {
  readonly type = ReportActionTypes.LOAD_REPORT_PERMISSION_DATA_SUCCESS;
  constructor(public payload: IReport[]) {}
}


export class SaveReport implements Action {
  readonly type = ReportActionTypes.SAVE_REPORT;
  constructor(public payload: {data: IReport}) {}
}

export class SaveMultipleReport implements Action {
  readonly type = ReportActionTypes.SAVE_MULTIPLE_REPORT;
  constructor(public payload: {data: IReport[]}) {}
}

export class DeleteReport implements Action {
  readonly type = ReportActionTypes.DELETE_REPORT_DATA
  constructor(public payload: {ReportId: number}) {}
}

export class LoadRole implements Action {
  readonly type = ReportActionTypes.LOAD_ROLE_DATA;
}

export class  LoadRoleSuccess implements Action {
  readonly type = ReportActionTypes.LOAD_ROLE_DATA_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}





export type ReportActions =
  | ShowEditorReport
  | HideEditorReport
  | ShowViewerReport
  | HideViewerReport
  | ProcessingReport
  | NotProcessingReport
  | LoadingReport
  | NotLoadingReport
  | LoadStandardReport
  | LoadStandardReportSuccess
  | LoadReportPermission
  | LoadReportPermissionSuccess
  | LoadRole
  | LoadRoleSuccess
  | SaveReport
  | SaveMultipleReport
  | DeleteReport;
