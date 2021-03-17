import { Action } from '@ngrx/store';
import { ICalendar, IProfile, IProfileCalendar } from '@nutela/models/compensation/payroll';
import { ISelectOption } from 'dist/libs/models/core-data';



export enum CalendarActionTypes {

  SHOW_EDITOR = '[ CALENDAR] Show Editor',
  HIDE_EDITOR = '[CALENDAR] Hide Editor',

  SHOW_VIEWER = '[ CALENDAR] Show Viewer',
  HIDE_VIEWER = '[CALENDAR] Hide Viewer',

  SHOW_PROFILE_EDITOR = '[ CALENDAR] Show Profile Editor',
  HIDE_PROFILE_EDITOR = '[CALENDAR] Hide Profile Editor',

  PROCESSING = '[ CALENDAR ] Processing',
  NOT_PROCESSING = '[ CALENDAR ] Not Processing',

  LOADING = '[ CALENDAR ] LOADING',
  NOT_LOADING = '[ CALENDAR ] Not LOADING',

  LOAD_CALENDAR_DATA = '[ CALENDAR] Load ALL CALENDAR Data',
  LOAD_CALENDAR_DATA_SUCCESS = '[ CALENDAR] Load ALL CALENDAR Data Success',

  LOAD_SINGLE_CALENDAR = '[ CALENDAR] Load SINGLE CALENDAR Data',
  LOAD_SINGLE_CALENDAR_SUCCESS = '[ CALENDAR] Load SINGLE CALENDAR Data Success',

  LOAD_PAYROLL_PROFILE_DATA = '[ CALENDAR] Load Payroll Profile Data',
  LOAD_PAYROLL_PROFILE_DATA_SUCCESS = '[ CALENDAR] Load Payroll Profile Data Success',

  LOAD_PAYROLL_PROFILE_LIST = '[ CALENDAR] Load Payroll Profile List',
  LOAD_PAYROLL_PROFILE_LIST_SUCCESS = '[ CALENDAR] Load Payroll Profile List Success',

  LOAD_ALLOWANCE_LIST = '[ CALENDAR] Load Allowance List',
  LOAD_ALLOWANCE_LIST_SUCCESS = '[ CALENDAR] Load Allowance List Success',

  LOAD_DEDUCTION_LIST = '[ CALENDAR] Load Deduction List',
  LOAD_DEDUCTION_LIST_SUCCESS = '[ CALENDAR] Load Deduction List Success',

  LOAD_PAYGROUP_LIST = '[ CALENDAR] Load paygroup List',
  LOAD_PAYGROUP_LIST_SUCCESS = '[ CALENDAR] Load paygroup List Success',

  SAVE = '[CALENDAR] Save',
  SAVE_SUCCESS = '[ CALENDAR] Save Success',

  UPDATE = '[UPDATE CALENDAR] UPDATE',
  UPDATE_SUCCESS = '[UPDATE CALENDAR] UPDATE Success',

  DELETE_CALENDAR_DATA = '[CALENDAR] Delete CALENDAR Data',

  RESET_PROFILE_CALENDAR = '[CALENDAR] Reset Profile Calendar',
}


export class ShowEditorCalendar implements Action {
  readonly type = CalendarActionTypes.SHOW_EDITOR;
}

export class HideEditorCalendar implements Action {
  readonly type = CalendarActionTypes.HIDE_EDITOR;
}

export class ShowViewerCalendar implements Action {
  readonly type = CalendarActionTypes.SHOW_VIEWER;
}

export class HideViewerCalendar implements Action {
  readonly type = CalendarActionTypes.HIDE_VIEWER;
}
export class ShowEditorProfileCalendar implements Action {
  readonly type = CalendarActionTypes.SHOW_PROFILE_EDITOR;
}

export class HideEditorProfileCalendar implements Action {
  readonly type = CalendarActionTypes.HIDE_PROFILE_EDITOR;
}

export class ProcessingCalendar implements Action {
  readonly type = CalendarActionTypes.PROCESSING;
}

export class NotProcessingCalendar implements Action {
  readonly type = CalendarActionTypes.NOT_PROCESSING;
}

export class LoadingCalendar implements Action {
  readonly type = CalendarActionTypes.LOADING;
}

export class NotLoadingCalendar implements Action {
  readonly type = CalendarActionTypes.NOT_LOADING;
}

export class LoadPayrollProfilesCalendar implements Action {
  readonly type = CalendarActionTypes.LOAD_PAYROLL_PROFILE_DATA;
}

export class LoadPayrollProfilesCalendarSuccess implements Action {
  readonly type = CalendarActionTypes.LOAD_PAYROLL_PROFILE_DATA_SUCCESS;
  constructor(public payload: IProfile[]) {}
}

export class LoadPayrollProfileListCalendar implements Action {
  readonly type = CalendarActionTypes.LOAD_PAYROLL_PROFILE_LIST;
}

export class LoadAllowanceListCalendarSuccess implements Action {
  readonly type = CalendarActionTypes.LOAD_ALLOWANCE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadAllowanceListCalendar implements Action {
  readonly type = CalendarActionTypes.LOAD_ALLOWANCE_LIST;
}

export class LoadDeductionListCalendarSuccess implements Action {
  readonly type = CalendarActionTypes.LOAD_DEDUCTION_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadDeductionListCalendar implements Action {
  readonly type = CalendarActionTypes.LOAD_DEDUCTION_LIST;
}

export class LoadPaygroupListCalendarSuccess implements Action {
  readonly type = CalendarActionTypes.LOAD_PAYGROUP_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadPaygroupListCalendar implements Action {
  readonly type = CalendarActionTypes.LOAD_PAYGROUP_LIST;
}

export class LoadPayrollProfileListCalendarSuccess implements Action {
  readonly type = CalendarActionTypes.LOAD_PAYROLL_PROFILE_LIST_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadDataCalendar implements Action {
  readonly type = CalendarActionTypes.LOAD_CALENDAR_DATA;
  constructor(public payload: {workType: string}) { }
}

export class LoadCalendarSuccess implements Action {
  readonly type = CalendarActionTypes.LOAD_CALENDAR_DATA_SUCCESS;
  constructor(public payload: {workType: string, data: ICalendar[]}) {}
}

export class LoadSingleCalendar implements Action {
  readonly type = CalendarActionTypes.LOAD_SINGLE_CALENDAR;
  constructor(public payload: {calendarId:number}) {}
}

export class LoadSingleCalendarSuccess implements Action {
  readonly type = CalendarActionTypes.LOAD_SINGLE_CALENDAR_SUCCESS;
  constructor(public payload: IProfileCalendar[]) {}
}

export class SaveCalendar implements Action {
  readonly type = CalendarActionTypes.SAVE;
  constructor(public payload: {data: IProfileCalendar, recordId: number}) {}
}

export class UpdateCalendar implements Action {
  readonly type = CalendarActionTypes.UPDATE;
  constructor(public payload: {data: IProfileCalendar, recordId: number}) {}
}

export class DeleteCalendar implements Action{
  readonly type =CalendarActionTypes.DELETE_CALENDAR_DATA;
  constructor(public payload: { recordId: number}) {}
}

export class ResetProfileCalendar implements Action{
  readonly type =CalendarActionTypes.RESET_PROFILE_CALENDAR;
  constructor(public payload: { payrollProfileId: number}) {}
}

export type CalendarActions =
  | ShowEditorCalendar
  | HideEditorCalendar
  | ShowViewerCalendar
  | HideViewerCalendar
  | ShowEditorProfileCalendar
  | HideEditorProfileCalendar
  | ProcessingCalendar
  | NotProcessingCalendar
  | LoadingCalendar
  | NotLoadingCalendar
  | LoadDataCalendar
  | LoadCalendarSuccess
  | LoadSingleCalendar
  | LoadSingleCalendarSuccess
  | LoadPayrollProfilesCalendar
  | LoadPayrollProfilesCalendarSuccess
  | LoadPayrollProfileListCalendar
  | LoadAllowanceListCalendarSuccess
  | LoadAllowanceListCalendar
  | LoadDeductionListCalendarSuccess
  | LoadDeductionListCalendar
  | LoadPaygroupListCalendarSuccess
  | LoadPaygroupListCalendar
  | LoadPayrollProfileListCalendarSuccess
  | SaveCalendar
  | UpdateCalendar
  | ResetProfileCalendar
  | DeleteCalendar;
