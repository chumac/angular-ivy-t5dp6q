import { Action } from '@ngrx/store';

import { IProfessionalQualification } from '@nutela/models/workforce/employee-profiles';

export enum HrReboardProfessionalQualificationsActionTypes {
  SHOW_EDITOR = '[HR REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Show Editor',
  HIDE_EDITOR = '[HR REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Hide Editor',

  SHOW_VIEWER = '[HR REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Show Viewer',
  HIDE_VIEWER = '[HR REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Hide Viewer',

  PROCESSING = '[HR REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Processing',
  NOT_PROCESSING = '[HR REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Not Processing',

  LOAD_DATA = '[HR REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Load Data',
  LOAD_DATA_SUCCESS = '[HR REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Load Data Success',

  LOAD_DOCUMENT = '[HR REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[HR REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Load Document Success',
  CLEAR_DOCUMENT = '[HR REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[HR REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Load Inline Document',

  SAVE = '[HR REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Save',
  UPDATE = '[HR REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Save Update',
  DELETE_DATA = '[HR REBOARDING DATA - PROFESSIONAL QUALIFICATIONS] Delete Data',
}

export class ShowEditorHrReboardProfessionalQualifications implements Action {
  readonly type = HrReboardProfessionalQualificationsActionTypes.SHOW_EDITOR;
}

export class HideEditorHrReboardProfessionalQualifications implements Action {
  readonly type = HrReboardProfessionalQualificationsActionTypes.HIDE_EDITOR;
}


export class ShowViewerHrReboardProfessionalQualifications implements Action {
  readonly type = HrReboardProfessionalQualificationsActionTypes.SHOW_VIEWER;
}

export class HideViewerHrReboardProfessionalQualifications implements Action {
  readonly type = HrReboardProfessionalQualificationsActionTypes.HIDE_VIEWER;
}


export class ProcessingHrReboardProfessionalQualifications implements Action {
  readonly type = HrReboardProfessionalQualificationsActionTypes.PROCESSING;
}

export class NotProcessingHrReboardProfessionalQualifications implements Action {
  readonly type = HrReboardProfessionalQualificationsActionTypes.NOT_PROCESSING;
}


export class LoadDataHrReboardProfessionalQualifications implements Action {
  readonly type = HrReboardProfessionalQualificationsActionTypes.LOAD_DATA;

  constructor(public payload: {employeeId: number}) { }
}

export class LoadDataHrReboardProfessionalQualificationsSuccess implements Action {
  readonly type = HrReboardProfessionalQualificationsActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IProfessionalQualification[]) { }
}

export class LoadDocumentHrReboardProfessionalQualifications implements Action {
  readonly type = HrReboardProfessionalQualificationsActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentHrReboardProfessionalQualificationsSuccess implements Action {
  readonly type = HrReboardProfessionalQualificationsActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) { }
}

export class ClearDocumentHrReboardProfessionalQualifications implements Action {
  readonly type = HrReboardProfessionalQualificationsActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentHrReboardProfessionalQualifications implements Action {
  readonly type = HrReboardProfessionalQualificationsActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class DeleteDataHrReboardProfessionalQualifications implements Action {
  readonly type = HrReboardProfessionalQualificationsActionTypes.DELETE_DATA;

  constructor(public payload: { recordId: number, employeeId: number }) { }
}

export class SaveHrReboardProfessionalQualifications implements Action {
  readonly type = HrReboardProfessionalQualificationsActionTypes.SAVE;

  constructor(public payload: { data: IProfessionalQualification, employeeId: number }) { }
}

export class SaveUpdateHrReboardProfessionalQualifications implements Action {
  readonly type = HrReboardProfessionalQualificationsActionTypes.UPDATE;

  constructor(public payload: { data: IProfessionalQualification, recordId: number, employeeId: number }) { }
}

export type HrReboardProfessionalQualificationsActions =
  | ShowEditorHrReboardProfessionalQualifications
  | HideEditorHrReboardProfessionalQualifications
  | ShowViewerHrReboardProfessionalQualifications
  | HideViewerHrReboardProfessionalQualifications
  | ProcessingHrReboardProfessionalQualifications
  | NotProcessingHrReboardProfessionalQualifications
  | LoadDataHrReboardProfessionalQualifications
  | LoadDataHrReboardProfessionalQualificationsSuccess
  | LoadDocumentHrReboardProfessionalQualifications
  | LoadDocumentHrReboardProfessionalQualificationsSuccess
  | ClearDocumentHrReboardProfessionalQualifications
  | LoadInlineDocumentHrReboardProfessionalQualifications
  | DeleteDataHrReboardProfessionalQualifications
  | SaveHrReboardProfessionalQualifications
  | SaveUpdateHrReboardProfessionalQualifications;
