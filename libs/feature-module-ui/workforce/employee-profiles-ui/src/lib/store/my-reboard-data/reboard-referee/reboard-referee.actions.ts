import { Action } from '@ngrx/store';
import { IReferee } from '@nutela/models/workforce/employee-profiles';

export enum ReboardRefereeActionTypes {
  SHOW_EDITOR = '[MY REBOARDING DATA - PERSONAL REFEREE] Show Editor',
  HIDE_EDITOR = '[MY REBOARDING DATA - PERSONAL REFEREE] Hide Editor',

  SHOW_VIEWER = '[MY REBOARDING DATA - PERSONAL REFEREE] Show Viewer',
  HIDE_VIEWER = '[MY REBOARDING DATA - PERSONAL REFEREE] Hide Viewer',

  PROCESSING = '[MY REBOARDING DATA - PERSONAL REFEREE] Processing',
  NOT_PROCESSING = '[MY REBOARDING DATA - PERSONAL REFEREE] Not Processing',

  LOAD_DATA = '[MY REBOARDING DATA - PERSONAL REFEREE] Load Data',
  LOAD_DATA_SUCCESS = '[MY REBOARDING DATA - PERSONAL REFEREE] Load Data Success',

  LOAD_PHOTO = '[MY REBOARDING DATA - PERSONAL REFEREE] Load Photo',
  LOAD_PHOTO_SUCCESS = '[MY REBOARDING DATA - PERSONAL REFEREE] Load Photo Success',

  CLEAR_VIEWER_PHOTO = '[MY REBOARDING DATA - PERSONAL REFEREE] Clear Viewer Photo',

  LOAD_DOCUMENT = '[MY REBOARDING DATA - PERSONAL REFEREE] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[MY REBOARDING DATA - PERSONAL REFEREE] Load Document Success',
  CLEAR_DOCUMENT = '[MY REBOARDING DATA - PERSONAL REFEREE] Clear Document',

  LOAD_INLINE_DOCUMENT = '[MY REBOARDING DATA - PERSONAL REFEREE] Load Inline Document',
  LOAD_INLINE_DOCUMENT_SUCCESS = '[MY REBOARDING DATA - PERSONAL REFEREE] Load Inline Document Success',

  SAVE = '[MY REBOARDING DATA - PERSONAL REFEREE] Save',
  UPDATE = '[MY REBOARDING DATA - PERSONAL REFEREE] Save Update',
  DELETE_DATA = '[MY REBOARDING DATA - PERSONAL REFEREE] Delete Data',
}

export class ShowEditorReboardReferee implements Action {
  readonly type = ReboardRefereeActionTypes.SHOW_EDITOR;
}

export class HideEditorReboardReferee implements Action {
  readonly type = ReboardRefereeActionTypes.HIDE_EDITOR;
}

export class ShowViewerReboardReferee implements Action {
  readonly type = ReboardRefereeActionTypes.SHOW_VIEWER;
}

export class HideViewerReboardReferee implements Action {
  readonly type = ReboardRefereeActionTypes.HIDE_VIEWER;
}

export class ProcessingReboardReferee implements Action {
  readonly type = ReboardRefereeActionTypes.PROCESSING;
}

export class NotProcessingReboardReferee implements Action {
  readonly type = ReboardRefereeActionTypes.NOT_PROCESSING;
}

export class LoadDataReboardReferee implements Action {
  readonly type = ReboardRefereeActionTypes.LOAD_DATA;
}

export class LoadDataReboardRefereeSuccess implements Action {
  readonly type = ReboardRefereeActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IReferee[]) {}
}

export class LoadDocumentReboardReferee implements Action {
  readonly type = ReboardRefereeActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentReboardRefereeSuccess implements Action {
  readonly type = ReboardRefereeActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentReboardReferee implements Action {
  readonly type = ReboardRefereeActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentReboardReferee implements Action {
  readonly type = ReboardRefereeActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadInlineDocumentReboardRefereeSuccess implements Action {
  readonly type = ReboardRefereeActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class SaveReboardReferee implements Action {
  readonly type = ReboardRefereeActionTypes.SAVE;

  constructor(public payload: { data: IReferee }) {}
}

export class SaveUpdateReboardReferee implements Action {
  readonly type = ReboardRefereeActionTypes.UPDATE;

  constructor(public payload: { data: IReferee, recordId: number }) {}
}

export class DeleteDataReboardReferee implements Action {
  readonly type = ReboardRefereeActionTypes.DELETE_DATA;

  constructor(public payload: { recordId: number }) { }
}

export class LoadPhotoReboardReferee implements Action {
  readonly type = ReboardRefereeActionTypes.LOAD_PHOTO;

  constructor(public payload: {recordId: number}) {}
}

export class LoadPhotoReboardRefereeSuccess implements Action {
  readonly type = ReboardRefereeActionTypes.LOAD_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearViewerPhotoReboardReferee implements Action {
  readonly type = ReboardRefereeActionTypes.CLEAR_VIEWER_PHOTO;
}

export type ReboardRefereeActions =
  | ShowEditorReboardReferee
  | HideEditorReboardReferee
  | ShowViewerReboardReferee
  | HideViewerReboardReferee
  | ProcessingReboardReferee
  | NotProcessingReboardReferee
  | LoadDataReboardReferee
  | LoadDataReboardRefereeSuccess
  | LoadDocumentReboardReferee
  | LoadDocumentReboardRefereeSuccess
  | ClearDocumentReboardReferee
  | LoadInlineDocumentReboardReferee
  | LoadInlineDocumentReboardRefereeSuccess
  | SaveReboardReferee
  | SaveUpdateReboardReferee
  | DeleteDataReboardReferee
  | LoadPhotoReboardReferee
  | LoadPhotoReboardRefereeSuccess
  | ClearViewerPhotoReboardReferee;
