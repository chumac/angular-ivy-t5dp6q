import { Action } from '@ngrx/store';
import { IHrCustomDataForm } from '@nutela/models/workforce/employee-profiles';

export enum HrCustomDataFormActionTypes {
  SHOW_EDITOR = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Show Editor',
  HIDE_EDITOR = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Hide Editor',

  SHOW_VIEWER = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Show Viewer',
  HIDE_VIEWER = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Hide Viewer',

  PROCESSING = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Processing',
  NOT_PROCESSING = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Not Processing',

  PROCESSING_ALT = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Processing Alt',
  NOT_PROCESSING_ALT = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Not Processing Alt',

  LOAD_DATA = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Load Data',
  LOAD_DATA_SUCCESS = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Load Data Success',

  SAVE = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Save',
  SAVE_SUCCESS = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Save Success',

  ADD = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Add',
  ADD_SUCCESS = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Add Success',

  DELETE_DATA = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Delete Data',

  SUBMIT_DATA = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Submit Data',

  REMOVE_DATA = '[CUSTOM_DATA_FORM (HR) HR_CUSTOM_DATA_FORMS] Remove Data',

}

export class ShowEditorHrCustomDataForm implements Action {
  readonly type = HrCustomDataFormActionTypes.SHOW_EDITOR;
}

export class HideEditorHrCustomDataForm implements Action {
  readonly type = HrCustomDataFormActionTypes.HIDE_EDITOR;
}


export class ShowViewerHrCustomDataForm implements Action {
  readonly type = HrCustomDataFormActionTypes.SHOW_VIEWER;
}

export class HideViewerHrCustomDataForm implements Action {
  readonly type = HrCustomDataFormActionTypes.HIDE_VIEWER;
}


export class ProcessingHrCustomDataForm implements Action {
  readonly type = HrCustomDataFormActionTypes.PROCESSING;
}

export class NotProcessingHrCustomDataForm implements Action {
  readonly type = HrCustomDataFormActionTypes.NOT_PROCESSING;
}

export class ProcessingAltHrCustomDataForm implements Action {
  readonly type = HrCustomDataFormActionTypes.PROCESSING_ALT;
}

export class NotProcessingAltHrCustomDataForm implements Action {
  readonly type = HrCustomDataFormActionTypes.NOT_PROCESSING_ALT;
}
export class LoadDataHrCustomDataForm implements Action {
  readonly type = HrCustomDataFormActionTypes.LOAD_DATA;
  constructor(public payload: {employeeId: number}) {}
}

export class LoadDataHrCustomDataFormSuccess implements Action {
  readonly type = HrCustomDataFormActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IHrCustomDataForm[]) {}
}

export class SaveHrCustomDataForm implements Action {
  readonly type = HrCustomDataFormActionTypes.SAVE;

  constructor(public payload: {data: any, recordId: number, editMode: boolean, employeeId: number}) {}
}

export class AddHrCustomDataForm implements Action {
  readonly type = HrCustomDataFormActionTypes.ADD;

  constructor(public payload: {employeeId: number, data: any}) {}
}

export class SubmitHrCustomDataForm implements Action {
  readonly type = HrCustomDataFormActionTypes.SUBMIT_DATA;

  constructor(public payload: {recordId: number, employeeId:number, data: {form_id: number, json_string:string}}) {}
}

export class DeleteDataHrCustomDataForm implements Action {
  readonly type = HrCustomDataFormActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataHrCustomDataForm implements Action {
  readonly type = HrCustomDataFormActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type HrCustomDataFormActions =
  | ShowEditorHrCustomDataForm
  | HideEditorHrCustomDataForm
  | ShowViewerHrCustomDataForm
  | HideViewerHrCustomDataForm
  | ProcessingHrCustomDataForm
  | NotProcessingHrCustomDataForm
  | ProcessingAltHrCustomDataForm
  | NotProcessingAltHrCustomDataForm
  | LoadDataHrCustomDataForm
  | LoadDataHrCustomDataFormSuccess
  | SaveHrCustomDataForm
  | AddHrCustomDataForm
  | SubmitHrCustomDataForm
  | DeleteDataHrCustomDataForm
  | RemoveDataHrCustomDataForm;
