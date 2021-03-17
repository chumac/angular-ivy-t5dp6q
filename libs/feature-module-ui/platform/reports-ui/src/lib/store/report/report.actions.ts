import { Action } from '@ngrx/store';
import { IReport } from '@nutela/models/platform/report';
import { SafeResourceUrl } from '@angular/platform-browser';

export enum ReportActionTypes {
  LOAD_DATA = '[REPORT] Load Data',
  LOAD_DATA_SUCCESS = '[REPORT] Load Data Success',

  LOAD_DATA_SINGLE = '[REPORT] Load Data Single',
  LOAD_DATA_SINGLE_SUCCESS = '[REPORT] Load Data Single Success',

  PROCESSING = '[REPORT] Processing',
  NOT_PROCESSING = '[REPORT] Not Processing',

  NAVIGATE = '[REPORT] Navigate',
  NAVIGATE_SUCCESS = '[REPORT] Navigate Success',

  LOAD_REPORT_URL = '[REPORT] Load Report Url',
  LOAD_REPORT_URL_SUCCESS = '[REPORT] Load Report Url Success'
}

export class LoadDataReport implements Action {
  readonly type = ReportActionTypes.LOAD_DATA;
}

export class LoadDataReportSuccess implements Action {
  readonly type = ReportActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IReport[]) {}
}

export class LoadDataSingleReport implements Action {
  readonly type = ReportActionTypes.LOAD_DATA_SINGLE;

  constructor(public payload: {recordId: number}) { }
}

export class LoadDataSingleReportSuccess implements Action {
  readonly type = ReportActionTypes.LOAD_DATA_SINGLE_SUCCESS;

  constructor(public payload: IReport) {}
}

export class ProcessingReport implements Action {
  readonly type = ReportActionTypes.PROCESSING;
}

export class NotProcessingReport implements Action {
  readonly type = ReportActionTypes.NOT_PROCESSING;
}

export class GotoReportUrl implements Action {
  readonly type = ReportActionTypes.NAVIGATE;
  constructor(public payload: number) {}
}

export class GotoReportUrlSuccess implements Action {
  readonly type = ReportActionTypes.NAVIGATE_SUCCESS;
}

export class LoadReportUrl implements Action {
  readonly type = ReportActionTypes.LOAD_REPORT_URL;
  constructor(public payload: {reportKey: number}) { }
}

export class LoadReportUrlSuccess implements Action {
  readonly type = ReportActionTypes.LOAD_REPORT_URL_SUCCESS;
  constructor(public payload: SafeResourceUrl) { }
}

export type ReportActions =
  | LoadDataReport
  | LoadDataReportSuccess
  | LoadDataSingleReport
  | LoadDataSingleReportSuccess
  | LoadReportUrl
  | LoadReportUrlSuccess
  | ProcessingReport
  | NotProcessingReport
  | GotoReportUrl
  | GotoReportUrlSuccess;
