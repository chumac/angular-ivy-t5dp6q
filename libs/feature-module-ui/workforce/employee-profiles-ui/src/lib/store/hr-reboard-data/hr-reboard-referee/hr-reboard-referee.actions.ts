import { Action } from '@ngrx/store';
import { IReferee } from '@nutela/models/workforce/employee-profiles';

export enum HrReboardRefereeActionTypes {
  SHOW_EDITOR = '[HR REBOARDING DATA - PERSONAL REFEREE] Show Editor',
  HIDE_EDITOR = '[HR REBOARDING DATA - PERSONAL REFEREE] Hide Editor',

  SHOW_VIEWER = '[HR REBOARDING DATA - PERSONAL REFEREE] Show Viewer',
  HIDE_VIEWER = '[HR REBOARDING DATA - PERSONAL REFEREE] Hide Viewer',

  PROCESSING = '[HR REBOARDING DATA - PERSONAL REFEREE] Processing',
  NOT_PROCESSING = '[HR REBOARDING DATA - PERSONAL REFEREE] Not Processing',

  LOAD_DATA = '[HR REBOARDING DATA - PERSONAL REFEREE] Load Data',
  LOAD_DATA_SUCCESS = '[HR REBOARDING DATA - PERSONAL REFEREE] Load Data Success',

  LOAD_PHOTO = '[HR REBOARDING DATA - PERSONAL REFEREE] Load Photo',
  LOAD_PHOTO_SUCCESS = '[HR REBOARDING DATA - PERSONAL REFEREE] Load Photo Success',

  CLEAR_VIEWER_PHOTO = '[HR REBOARDING DATA - PERSONAL REFEREE] Clear Viewer Photo',

  LOAD_DOCUMENT = '[HR REBOARDING DATA - PERSONAL REFEREE] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR REBOARDING DATA - PERSONAL REFEREE] Load Document Success',
  CLEAR_DOCUMENT = '[HR REBOARDING DATA - PERSONAL REFEREE] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR REBOARDING DATA - PERSONAL REFEREE] Load Inline Document',
  LOAD_INLINE_DOCUMENT_SUCCESS = '[HR REBOARDING DATA - PERSONAL REFEREE] Load Inline Document Success',

  SAVE = '[HR REBOARDING DATA - PERSONAL REFEREE] Save',
  UPDATE = '[HR REBOARDING DATA - PERSONAL REFEREE] Save Update',
  DELETE_DATA = '[HR REBOARDING DATA - PERSONAL REFEREE] Delete Data',
}

export class ShowEditorHrReboardReferee implements Action {
  readonly type = HrReboardRefereeActionTypes.SHOW_EDITOR;
}

export class HideEditorHrReboardReferee implements Action {
  readonly type = HrReboardRefereeActionTypes.HIDE_EDITOR;
}

export class ShowViewerHrReboardReferee implements Action {
  readonly type = HrReboardRefereeActionTypes.SHOW_VIEWER;
}

export class HideViewerHrReboardReferee implements Action {
  readonly type = HrReboardRefereeActionTypes.HIDE_VIEWER;
}

export class ProcessingHrReboardReferee implements Action {
  readonly type = HrReboardRefereeActionTypes.PROCESSING;
}

export class NotProcessingHrReboardReferee implements Action {
  readonly type = HrReboardRefereeActionTypes.NOT_PROCESSING;
}

export class LoadDataHrReboardReferee implements Action {
  readonly type = HrReboardRefereeActionTypes.LOAD_DATA;
  constructor(public payload: {employeeId: number}) { }
}

export class LoadDataHrReboardRefereeSuccess implements Action {
  readonly type = HrReboardRefereeActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IReferee[]) {}
}

export class LoadDocumentHrReboardReferee implements Action {
  readonly type = HrReboardRefereeActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, employeeId: number}) {}
}

export class LoadDocumentHrReboardRefereeSuccess implements Action {
  readonly type = HrReboardRefereeActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentHrReboardReferee implements Action {
  readonly type = HrReboardRefereeActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentHrReboardReferee implements Action {
  readonly type = HrReboardRefereeActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, employeeId: number}) {}
}

export class LoadInlineDocumentHrReboardRefereeSuccess implements Action {
  readonly type = HrReboardRefereeActionTypes.LOAD_INLINE_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class SaveHrReboardReferee implements Action {
  readonly type = HrReboardRefereeActionTypes.SAVE;

  constructor(public payload: { data: IReferee, employeeId: number }) {}
}

export class SaveUpdateHrReboardReferee implements Action {
  readonly type = HrReboardRefereeActionTypes.UPDATE;

  constructor(public payload: { data: IReferee, recordId: number, employeeId: number }) {}
}

export class DeleteDataHrReboardReferee implements Action {
  readonly type = HrReboardRefereeActionTypes.DELETE_DATA;

  constructor(public payload: { recordId: number, employeeId: number }) {}
}

export class LoadPhotoHrReboardReferee implements Action {
  readonly type = HrReboardRefereeActionTypes.LOAD_PHOTO;

  constructor(public payload: {recordId: number, employeeId: number}) {}
}

export class LoadPhotoHrReboardRefereeSuccess implements Action {
  readonly type = HrReboardRefereeActionTypes.LOAD_PHOTO_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearViewerPhotoHrReboardReferee implements Action {
  readonly type = HrReboardRefereeActionTypes.CLEAR_VIEWER_PHOTO;
}

export type HrReboardRefereeActions =
  | ShowEditorHrReboardReferee
  | HideEditorHrReboardReferee
  | ShowViewerHrReboardReferee
  | HideViewerHrReboardReferee
  | ProcessingHrReboardReferee
  | NotProcessingHrReboardReferee
  | LoadDataHrReboardReferee
  | LoadDataHrReboardRefereeSuccess
  | LoadDocumentHrReboardReferee
  | LoadDocumentHrReboardRefereeSuccess
  | ClearDocumentHrReboardReferee
  | LoadInlineDocumentHrReboardReferee
  | LoadInlineDocumentHrReboardRefereeSuccess
  | SaveHrReboardReferee
  | LoadPhotoHrReboardReferee
  | LoadPhotoHrReboardRefereeSuccess
  | DeleteDataHrReboardReferee
  | ClearViewerPhotoHrReboardReferee;
