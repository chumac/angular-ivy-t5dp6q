import { Action } from "@ngrx/store";
import { ISchedule } from "@nutela/models/compensation/payment";


export enum ProcessingActionTypes {

  SHOW_VIEWER = '[HR PAYMENTS - PROCESSING] Show Viewer',
  HIDE_VIEWER = '[HR PAYMENTS - PROCESSING] Hide Viewer',

  LOADING_DATA = '[HR PAYMENTS - PROCESSING] Loading Data',
  NOT_LOADING_DATA = '[HR PAYMENTS - PROCESSING]  Not Loading Data',

  LOAD_PROCESSING_DATA = '[HR PAYMENTS - PROCESSING]  Load Processing Data',
  LOAD_PROCESSING_DATA_SUCCESS = '[HR PAYMENTS - PROCESSING]  Load Processing Data Success',

  LOAD_AWAITING_APPROVAL_DATA = '[HR PAYMENTS - PROCESSING]  Load Awaiting Approval Data',
  LOAD_AWAITING_APPROVAL_DATA_SUCCESS = '[HR PAYMENTS - PROCESSING]  Load Awaiting Approval Data Success',

  ARCHIVE_SCHEDULE = '[HR PAYMENTS - PROCESSING]  Archive Schedule',

}

export class ShowViewerProcessingSchedule implements Action {
  readonly type = ProcessingActionTypes.SHOW_VIEWER;
}

export class HideViewerProcessingSchedule implements Action {
  readonly type = ProcessingActionTypes.HIDE_VIEWER;
}

export class LoadingDataProcessingSchedule implements Action {
  readonly type = ProcessingActionTypes.LOADING_DATA;
}

export class NotLoadingDataProcessingSchedule implements Action {
  readonly type = ProcessingActionTypes.NOT_LOADING_DATA;
}

export class LoadDataProcessingSchedule implements Action {
  readonly type = ProcessingActionTypes.LOAD_PROCESSING_DATA;
}

export class LoadDataProcessingScheduleSuccess implements Action {
  readonly type =
    ProcessingActionTypes.LOAD_PROCESSING_DATA_SUCCESS;

  constructor(public payload: ISchedule[]) { }
}

export class LoadDataAwaitingApproval implements Action {
  readonly type = ProcessingActionTypes.LOAD_AWAITING_APPROVAL_DATA;
}

export class LoadDataAwaitingApprovalSuccess implements Action {
  readonly type =
    ProcessingActionTypes.LOAD_AWAITING_APPROVAL_DATA_SUCCESS;

  constructor(public payload: ISchedule[]) { }
}

export class ArchiveProcessingSchedule implements Action {
  readonly type =
    ProcessingActionTypes.ARCHIVE_SCHEDULE;

  constructor(public payload: { recordId: number }) { }
}


export type ProcessingActions =
  | ShowViewerProcessingSchedule
  | HideViewerProcessingSchedule
  | LoadingDataProcessingSchedule
  | NotLoadingDataProcessingSchedule
  | LoadDataProcessingSchedule
  | LoadDataProcessingScheduleSuccess
  | LoadDataAwaitingApproval
  | LoadDataAwaitingApprovalSuccess
  | ArchiveProcessingSchedule
