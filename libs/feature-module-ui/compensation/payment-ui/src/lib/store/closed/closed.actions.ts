import { Action } from "@ngrx/store";
import { ISchedule } from "@nutela/models/compensation/payment";


export enum ClosedActionTypes {

  SHOW_VIEWER = '[HR PAYMENTS - CLOSED] Show Viewer',
  HIDE_VIEWER = '[HR PAYMENTS - CLOSED] Hide Viewer',

  LOADING_DATA = '[HR PAYMENTS - CLOSED] Loading Data',
  NOT_LOADING_DATA = '[HR PAYMENTS - CLOSED]  Not Loading Data',

  LOAD_CLOSED_DATA = '[HR PAYMENTS - CLOSED]  Load Closed Data',
  LOAD_CLOSED_DATA_SUCCESS = '[HR PAYMENTS - CLOSED]  Load Closed Data Success',

  ARCHIVE_SCHEDULE = '[HR PAYMENTS - CLOSED]  Archive Schedule',

}

export class ShowViewerClosedSchedule implements Action {
  readonly type = ClosedActionTypes.SHOW_VIEWER;
}

export class HideViewerClosedSchedule implements Action {
  readonly type = ClosedActionTypes.HIDE_VIEWER;
}

export class LoadingDataClosedSchedule implements Action {
  readonly type = ClosedActionTypes.LOADING_DATA;
}

export class NotLoadingDataClosedSchedule implements Action {
  readonly type = ClosedActionTypes.NOT_LOADING_DATA;
}

export class LoadDataClosedSchedule implements Action {
  readonly type = ClosedActionTypes.LOAD_CLOSED_DATA;
}

export class LoadDataClosedScheduleSuccess implements Action {
  readonly type =
    ClosedActionTypes.LOAD_CLOSED_DATA_SUCCESS;

  constructor(public payload: ISchedule[]) { }
}

export class ArchiveClosedSchedule implements Action {
  readonly type =
    ClosedActionTypes.ARCHIVE_SCHEDULE;

  constructor(public payload: { recordId: number }) { }
}


export type ClosedActions =
  | ShowViewerClosedSchedule
  | HideViewerClosedSchedule
  | LoadingDataClosedSchedule
  | NotLoadingDataClosedSchedule
  | LoadDataClosedSchedule
  | LoadDataClosedScheduleSuccess
  | ArchiveClosedSchedule
