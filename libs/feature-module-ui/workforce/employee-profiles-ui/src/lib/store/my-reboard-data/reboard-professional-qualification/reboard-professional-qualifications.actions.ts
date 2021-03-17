import { Action } from '@ngrx/store';

import { IProfessionalQualification } from '@nutela/models/workforce/employee-profiles';

export enum ReboardProfessionalQualificationsActionTypes {
  SHOW_EDITOR = '[MY REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Show Editor',
  HIDE_EDITOR = '[MY REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Hide Editor',

  SHOW_VIEWER = '[MY REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Show Viewer',
  HIDE_VIEWER = '[MY REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Hide Viewer',

  PROCESSING = '[MY REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Processing',
  NOT_PROCESSING = '[MY REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Not Processing',

  LOAD_DATA = '[MY REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Load Data',
  LOAD_DATA_SUCCESS = '[MY REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Load Data Success',

  LOAD_DOCUMENT = '[MY REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[MY REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Load Document Success',
  CLEAR_DOCUMENT = '[MY REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[MY REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Load Inline Document',

  SAVE = '[MY REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Save',
  UPDATE = '[MY REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Save Update',
  DELETE_DATA = '[MY REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Delete Data',
}

export class ShowEditorReboardProfessionalQualifications implements Action {
  readonly type = ReboardProfessionalQualificationsActionTypes.SHOW_EDITOR;
}

export class HideEditorReboardProfessionalQualifications implements Action {
  readonly type = ReboardProfessionalQualificationsActionTypes.HIDE_EDITOR;
}


export class ShowViewerReboardProfessionalQualifications implements Action {
  readonly type = ReboardProfessionalQualificationsActionTypes.SHOW_VIEWER;
}

export class HideViewerReboardProfessionalQualifications implements Action {
  readonly type = ReboardProfessionalQualificationsActionTypes.HIDE_VIEWER;
}


export class ProcessingReboardProfessionalQualifications implements Action {
  readonly type = ReboardProfessionalQualificationsActionTypes.PROCESSING;
}

export class NotProcessingReboardProfessionalQualifications implements Action {
  readonly type = ReboardProfessionalQualificationsActionTypes.NOT_PROCESSING;
}


export class LoadDataReboardProfessionalQualifications implements Action {
  readonly type = ReboardProfessionalQualificationsActionTypes.LOAD_DATA;
}

export class LoadDataReboardProfessionalQualificationsSuccess implements Action {
  readonly type = ReboardProfessionalQualificationsActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IProfessionalQualification[]) { }
}

export class LoadDocumentReboardProfessionalQualifications implements Action {
  readonly type = ReboardProfessionalQualificationsActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentReboardProfessionalQualificationsSuccess implements Action {
  readonly type = ReboardProfessionalQualificationsActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) { }
}

export class ClearDocumentReboardProfessionalQualifications implements Action {
  readonly type = ReboardProfessionalQualificationsActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentReboardProfessionalQualifications implements Action {
  readonly type = ReboardProfessionalQualificationsActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class SaveReboardProfessionalQualifications implements Action {
  readonly type = ReboardProfessionalQualificationsActionTypes.SAVE;

  constructor(public payload: { data: IProfessionalQualification }) { }
}

export class SaveUpdateReboardProfessionalQualifications implements Action {
  readonly type = ReboardProfessionalQualificationsActionTypes.UPDATE;

  constructor(public payload: { data: IProfessionalQualification, recordId: number }) { }
}

export class DeleteDataReboardProfessionalQualifications implements Action {
  readonly type = ReboardProfessionalQualificationsActionTypes.DELETE_DATA;

  constructor(public payload: { recordId: number }) { }
}


export type ReboardProfessionalQualificationsActions =
  | ShowEditorReboardProfessionalQualifications
  | HideEditorReboardProfessionalQualifications
  | ShowViewerReboardProfessionalQualifications
  | HideViewerReboardProfessionalQualifications
  | ProcessingReboardProfessionalQualifications
  | NotProcessingReboardProfessionalQualifications
  | LoadDataReboardProfessionalQualifications
  | LoadDataReboardProfessionalQualificationsSuccess
  | LoadDocumentReboardProfessionalQualifications
  | LoadDocumentReboardProfessionalQualificationsSuccess
  | ClearDocumentReboardProfessionalQualifications
  | LoadInlineDocumentReboardProfessionalQualifications
  | SaveReboardProfessionalQualifications
  | SaveUpdateReboardProfessionalQualifications
  | DeleteDataReboardProfessionalQualifications;
