import { Action } from "@ngrx/store";
import { ISchedule } from "@nutela/models/compensation/payment";


export enum CompletedActionTypes {

  SHOW_VIEWER = '[HR PAYMENTS - COMPLETED] Show Viewer',
  HIDE_VIEWER = '[HR PAYMENTS - COMPLETED] Hide Viewer',

  LOADING_DATA = '[HR PAYMENTS - COMPLETED] Loading Data',
  NOT_LOADING_DATA = '[HR PAYMENTS - COMPLETED]  Not Loading Data',

  LOAD_COMPLETED_DATA = '[HR PAYMENTS - COMPLETED]  Load Completed Data',
  LOAD_COMPLETED_DATA_SUCCESS = '[HR PAYMENTS - COMPLETED]  Load Completed Data Success',

  ARCHIVE_SCHEDULE = '[HR PAYMENTS - COMPLETED]  Archive Schedule',

}

export class ShowViewerCompletedSchedule implements Action {
  readonly type = CompletedActionTypes.SHOW_VIEWER;
}

export class HideViewerCompletedSchedule implements Action {
  readonly type = CompletedActionTypes.HIDE_VIEWER;
}

export class LoadingDataCompletedSchedule implements Action {
  readonly type = CompletedActionTypes.LOADING_DATA;
}

export class NotLoadingDataCompletedSchedule implements Action {
  readonly type = CompletedActionTypes.NOT_LOADING_DATA;
}

export class LoadDataCompletedSchedule implements Action {
  readonly type = CompletedActionTypes.LOAD_COMPLETED_DATA;
}

export class LoadDataCompletedScheduleSuccess implements Action {
  readonly type =
    CompletedActionTypes.LOAD_COMPLETED_DATA_SUCCESS;

  constructor(public payload: ISchedule[]) { }
}

export class ArchiveCompletedSchedule implements Action {
  readonly type =
    CompletedActionTypes.ARCHIVE_SCHEDULE;

  constructor(public payload: { recordId: number }) { }
}


export type CompletedActions =
  | ShowViewerCompletedSchedule
  | HideViewerCompletedSchedule
  | LoadingDataCompletedSchedule
  | NotLoadingDataCompletedSchedule
  | LoadDataCompletedSchedule
  | LoadDataCompletedScheduleSuccess
  | ArchiveCompletedSchedule
