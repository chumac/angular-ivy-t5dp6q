import { Action } from '@ngrx/store';
import {
  IReviewChecklist
} from 'libs/models/workforce/exit/src/lib/interfaces';
import { ISelectOption } from '@nutela/models/core-data';
import { IResignationLetter } from '../../interfaces';

export enum ResignActionTypes {
  SHOW_EDITOR = '[MY RESIGNATION - RESIGNATION] Show Editor',
  HIDE_EDITOR = '[MY RESIGNATION - RESIGNATION] Hide Editor',

  SHOW_VIEWER = '[MY RESIGNATION - RESIGNATION] Show Viewer',
  HIDE_VIEWER = '[MY RESIGNATION - RESIGNATION] Hide Viewer',

  SHOW_PROCESS_TABLE_VIEWER = '[MY RESIGNATION - RESIGNATION] Show Process Table Viewer',
  HIDE_PROCESS_TABLE_VIEWER = '[MY RESIGNATION - RESIGNATION] Hide Process Table Viewer',

  SHOW_CHECKLIST_VIEWER = '[MY RESIGNATION - RESIGNATION] Show Checklist Viewer',
  HIDE_CHECKLIST_VIEWER = '[MY RESIGNATION - RESIGNATION] Hide Checklist Viewer',

  PROCESSING = '[MY RESIGNATION - RESIGNATION] Processing',
  NOT_PROCESSING = '[MY RESIGNATION - RESIGNATION] Not Processing',

  LOAD_RESIGNATION_LETTER = '[MY RESIGNATION - RESIGNATION] Load Resignation Letter',
  LOAD_RESIGNATION_LETTER_SUCCESS = '[MY RESIGNATION - RESIGNATION] Load Resignation Letter Success',



  LOAD_REVIEW_CHECKLIST_DATA = '[MY RESIGNATION - RESIGNATION] Load Review Checklist Data',
  LOAD_REVIEW_CHECKLIST_DATA_SUCCESS = '[MY RESIGNATION - RESIGNATION] Load Review Checklist Data Success',

  LOAD_EXIT_COMPLETED_URL_DATA = '[MY RESIGNATION - RESIGNATION] Load Exit Completed Url Data',
  LOAD_EXIT_COMPLETED_URL_DATA_SUCCESS = '[MY RESIGNATION - RESIGNATION] Load Exit Completed Url Data Success',

  LOAD_EXIT_INTERVIEW_STATUS = '[MY RESIGNATION - RESIGNATION] Load Exit Interview Status Data',
  LOAD_EXIT_INTERVIEW_STATUS_SUCCESS = '[MY RESIGNATION - RESIGNATION] Load Exit Interview Status Data Success',

  LOAD_PROCESS_TABLE_DATA = '[MY RESIGNATION - RESIGNATION] Load Process Table Data',
  LOAD_PROCESS_TABLE_DATA_SUCCESS = '[MY RESIGNATION - RESIGNATION] Load Process Table Data Success',


  CANCEL = '[MY RESIGNATION - RESIGNATION] Cancel'
}

export class ShowEditorResign implements Action {
  readonly type = ResignActionTypes.SHOW_EDITOR;
}

export class HideEditorResign implements Action {
  readonly type = ResignActionTypes.HIDE_EDITOR;
}

export class ShowViewerResign implements Action {
  readonly type = ResignActionTypes.SHOW_VIEWER;
}

export class HideViewerResign implements Action {
  readonly type = ResignActionTypes.HIDE_VIEWER;
}

export class ShowProcessTableViewerResign implements Action {
  readonly type = ResignActionTypes.SHOW_PROCESS_TABLE_VIEWER;
}

export class HideProcessTableViewerResign implements Action {
  readonly type = ResignActionTypes.HIDE_PROCESS_TABLE_VIEWER;
}

export class ShowChecklistViewerResign implements Action {
  readonly type = ResignActionTypes.SHOW_CHECKLIST_VIEWER;
}

export class HideChecklistViewerResign implements Action {
  readonly type = ResignActionTypes.HIDE_CHECKLIST_VIEWER;
}

export class ProcessingResign implements Action {
  readonly type = ResignActionTypes.PROCESSING;
}

export class NotProcessingResign implements Action {
  readonly type = ResignActionTypes.NOT_PROCESSING;
}

export class LoadLetterResign implements Action {
  readonly type = ResignActionTypes.LOAD_RESIGNATION_LETTER;
}

export class LoadLetterResignSuccess implements Action {
  readonly type = ResignActionTypes.LOAD_RESIGNATION_LETTER_SUCCESS;

  constructor(public payload: IResignationLetter[]) { }
}



export class LoadReviewChecklistDataResign implements Action {
  readonly type = ResignActionTypes.LOAD_REVIEW_CHECKLIST_DATA;

  constructor(public payload: { letterId: number, employeeId?: number }) { }
}

export class LoadReviewChecklistDataResignSuccess implements Action {
  readonly type = ResignActionTypes.LOAD_REVIEW_CHECKLIST_DATA_SUCCESS;

  constructor(public payload: IReviewChecklist[]) { }
}

export class LoadExitCompletedUrlDataResign implements Action {
  readonly type = ResignActionTypes.LOAD_EXIT_COMPLETED_URL_DATA;
}

export class LoadExitCompletedUrlDataResignSuccess implements Action {
  readonly type = ResignActionTypes.LOAD_EXIT_COMPLETED_URL_DATA_SUCCESS;

  constructor(public payload: string[]) { }
}

export class LoadProcessTableDataResign implements Action {
  readonly type = ResignActionTypes.LOAD_PROCESS_TABLE_DATA;

  constructor(public payload: { recordId: number }) { }
}

export class LoadProcessTableDataResignSuccess implements Action {
  readonly type = ResignActionTypes.LOAD_PROCESS_TABLE_DATA_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadExitInterviewStatusDataResign implements Action {
  readonly type = ResignActionTypes.LOAD_EXIT_INTERVIEW_STATUS;
}

export class LoadExitInterviewStatusDataResignSuccess implements Action {
  readonly type = ResignActionTypes.LOAD_EXIT_INTERVIEW_STATUS_SUCCESS;

  constructor(public payload: string[]) { }
}


export class CancelResignation implements Action {
  readonly type = ResignActionTypes.CANCEL;

  constructor(public payload?: { letterId: number }) { }
}

export type ResignActions =
  | ShowEditorResign
  | HideEditorResign
  | ShowViewerResign
  | HideViewerResign
  | ShowProcessTableViewerResign
  | HideProcessTableViewerResign
  | ShowChecklistViewerResign
  | HideChecklistViewerResign
  | ProcessingResign
  | NotProcessingResign
  | LoadLetterResign
  | LoadLetterResignSuccess
  | LoadReviewChecklistDataResign
  | LoadReviewChecklistDataResignSuccess
  | LoadExitCompletedUrlDataResign
  | LoadExitCompletedUrlDataResignSuccess
  | LoadExitInterviewStatusDataResign
  | LoadExitInterviewStatusDataResignSuccess
  | LoadProcessTableDataResign
  | LoadProcessTableDataResignSuccess
  | CancelResignation;
