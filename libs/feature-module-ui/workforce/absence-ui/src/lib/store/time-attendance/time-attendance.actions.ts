import { Action } from '@ngrx/store';
import { ITimeAttendance, ITimeAttendanceStatus } from '@nutela/models/workforce/leave';

export enum TimeAttendanceActionTypes {
  SHOW_EDITOR = '[HR-TIME_ATTENDANCES] Show Editor',
  HIDE_EDITOR = '[HR-TIME_ATTENDANCES] Hide Editor',

  SHOW_VIEWER = '[HR-TIME_ATTENDANCES] Show Viewer',
  HIDE_VIEWER = '[HR-TIME_ATTENDANCES] Hide Viewer',

  PROCESSING = '[HR-TIME_ATTENDANCES] Processing',
  NOT_PROCESSING = '[HR-TIME_ATTENDANCES] Not Processing',

  LOADING = '[HR-TIME_ATTENDANCES] Loading',
  NOT_LOADING = '[HR-TIME_ATTENDANCES] Not Loading',

  LOAD_DATA = '[HR-TIME_ATTENDANCES] Load Data',
  LOAD_DATA_SUCCESS = '[HR-TIME_ATTENDANCES] Load Data Success',

  LOAD_STATUS_LIST = '[HR-TIME_ATTENDANCES] Load Status List',
  LOAD_STATUS_LIST_SUCCESS = '[HR-TIME_ATTENDANCES] Load Status List Success',

  SAVE = '[HR-TIME_ATTENDANCES] Save',
  SAVE_SUCCESS = '[HR-TIME_ATTENDANCES] Save Success',

  ADD = '[HR-TIME_ATTENDANCES] Add',
  ADD_SUCCESS = '[HR-TIME_ATTENDANCES] Add Success',

  DELETE_DATA = '[HR-TIME_ATTENDANCES] Delete Data',

  REMOVE_DATA = '[HR-TIME_ATTENDANCES] Remove Data',

}

export class ShowEditorTimeAttendance implements Action {
  readonly type = TimeAttendanceActionTypes.SHOW_EDITOR;
}

export class HideEditorTimeAttendance implements Action {
  readonly type = TimeAttendanceActionTypes.HIDE_EDITOR;
}


export class ShowViewerTimeAttendance implements Action {
  readonly type = TimeAttendanceActionTypes.SHOW_VIEWER;
}

export class HideViewerTimeAttendance implements Action {
  readonly type = TimeAttendanceActionTypes.HIDE_VIEWER;
}


export class ProcessingTimeAttendance implements Action {
  readonly type = TimeAttendanceActionTypes.PROCESSING;
}

export class NotProcessingTimeAttendance implements Action {
  readonly type = TimeAttendanceActionTypes.NOT_PROCESSING;
}

export class LoadingTimeAttendance implements Action {
  readonly type = TimeAttendanceActionTypes.LOADING;
}

export class NotLoadingTimeAttendance implements Action {
  readonly type = TimeAttendanceActionTypes.NOT_LOADING;
}


export class LoadDataTimeAttendance implements Action {
  readonly type = TimeAttendanceActionTypes.LOAD_DATA;
  constructor(public payload: {employeeId: number, year: number, month: number}) {}
}

export class LoadDataTimeAttendanceSuccess implements Action {
  readonly type = TimeAttendanceActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ITimeAttendance[]) {}
}

export class LoadTimeAttendanceStatusList implements Action {
  readonly type = TimeAttendanceActionTypes.LOAD_STATUS_LIST;
}

export class LoadTimeAttendanceStatusListSuccess implements Action {
  readonly type = TimeAttendanceActionTypes.LOAD_STATUS_LIST_SUCCESS;

  constructor(public payload: ITimeAttendanceStatus[]) {}
}

export class SaveTimeAttendance implements Action {
  readonly type = TimeAttendanceActionTypes.SAVE;

  constructor(public payload: {data: any, recordId: number, editMode: boolean, employeeId: number, year: number, month: number}) {}
}

export class AddTimeAttendance implements Action {
  readonly type = TimeAttendanceActionTypes.ADD;

  constructor(public payload: {data: any}) {}
}


export class DeleteDataTimeAttendance implements Action {
  readonly type = TimeAttendanceActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, employeeId: number, year: number, month: number}) {}
}


export class RemoveDataTimeAttendance implements Action {
  readonly type = TimeAttendanceActionTypes.REMOVE_DATA;
}

export type TimeAttendanceActions =
  | ShowEditorTimeAttendance
  | HideEditorTimeAttendance
  | ShowViewerTimeAttendance
  | HideViewerTimeAttendance
  | ProcessingTimeAttendance
  | NotProcessingTimeAttendance
  | LoadingTimeAttendance
  | NotLoadingTimeAttendance
  | LoadDataTimeAttendance
  | LoadDataTimeAttendanceSuccess
  | LoadTimeAttendanceStatusList
  | LoadTimeAttendanceStatusListSuccess
  | SaveTimeAttendance
  | AddTimeAttendance
  | DeleteDataTimeAttendance
  | RemoveDataTimeAttendance;
