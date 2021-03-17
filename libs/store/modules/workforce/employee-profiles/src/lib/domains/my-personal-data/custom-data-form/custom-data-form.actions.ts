import { Action } from '@ngrx/store';
import { ICustomDataForm } from '@nutela/models/workforce/employee-profiles';

export enum CustomDataFormActionTypes {
  SHOW_EDITOR = '[EMPLOYEE CUSTOM_DATA_FORMS] Show Editor',
  HIDE_EDITOR = '[EMPLOYEE CUSTOM_DATA_FORMS] Hide Editor',

  SHOW_VIEWER = '[EMPLOYEE CUSTOM_DATA_FORMS] Show Viewer',
  HIDE_VIEWER = '[EMPLOYEE CUSTOM_DATA_FORMS] Hide Viewer',

  PROCESSING = '[EMPLOYEE CUSTOM_DATA_FORMS] Processing',
  NOT_PROCESSING = '[EMPLOYEE CUSTOM_DATA_FORMS] Not Processing',

  PROCESSING_ALT = '[EMPLOYEE CUSTOM_DATA_FORMS] Processing Alt',
  NOT_PROCESSING_ALT = '[EMPLOYEE CUSTOM_DATA_FORMS] Not Processing Alt',


  LOAD_DATA = '[EMPLOYEE CUSTOM_DATA_FORMS] Load Data',
  LOAD_DATA_SUCCESS = '[EMPLOYEE CUSTOM_DATA_FORMS] Load Data Success',

  SAVE = '[EMPLOYEE CUSTOM_DATA_FORMS] Save',
  SAVE_SUCCESS = '[EMPLOYEE CUSTOM_DATA_FORMS] Save Success',

  ADD = '[EMPLOYEE CUSTOM_DATA_FORMS] Add',
  ADD_SUCCESS = '[EMPLOYEE CUSTOM_DATA_FORMS] Add Success',

  SUBMIT_DATA = '[EMPLOYEE CUSTOM_DATA_FORMS] Submit Data',

  DELETE_DATA = '[EMPLOYEE CUSTOM_DATA_FORMS] Delete Data',

  REMOVE_DATA = '[EMPLOYEE CUSTOM_DATA_FORMS] Remove Data',

}

export class ShowEditorCustomDataForm implements Action {
  readonly type = CustomDataFormActionTypes.SHOW_EDITOR;
}

export class HideEditorCustomDataForm implements Action {
  readonly type = CustomDataFormActionTypes.HIDE_EDITOR;
}


export class ShowViewerCustomDataForm implements Action {
  readonly type = CustomDataFormActionTypes.SHOW_VIEWER;
}

export class HideViewerCustomDataForm implements Action {
  readonly type = CustomDataFormActionTypes.HIDE_VIEWER;
}


export class ProcessingCustomDataForm implements Action {
  readonly type = CustomDataFormActionTypes.PROCESSING;
}

export class NotProcessingCustomDataForm implements Action {
  readonly type = CustomDataFormActionTypes.NOT_PROCESSING;
}


export class ProcessingAltCustomDataForm implements Action {
  readonly type = CustomDataFormActionTypes.PROCESSING_ALT;
}

export class NotProcessingAltCustomDataForm implements Action {
  readonly type = CustomDataFormActionTypes.NOT_PROCESSING_ALT;
}

export class LoadDataCustomDataForm implements Action {
  readonly type = CustomDataFormActionTypes.LOAD_DATA;
}

export class LoadDataCustomDataFormSuccess implements Action {
  readonly type = CustomDataFormActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ICustomDataForm[]) {}
}

export class SaveCustomDataForm implements Action {
  readonly type = CustomDataFormActionTypes.SAVE;

  constructor(public payload: {data: any, recordId: number, editMode: boolean}) {}
}

export class AddCustomDataForm implements Action {
  readonly type = CustomDataFormActionTypes.ADD;

  constructor(public payload: {data: any}) {}
}

export class SubmitCustomDataForm implements Action {
  readonly type = CustomDataFormActionTypes.SUBMIT_DATA;

  constructor(public payload: {recordId: number, data: {form_id: number, json_string:string}}) {}
}

export class DeleteDataCustomDataForm implements Action {
  readonly type = CustomDataFormActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataCustomDataForm implements Action {
  readonly type = CustomDataFormActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type CustomDataFormActions =
  | ShowEditorCustomDataForm
  | HideEditorCustomDataForm
  | ShowViewerCustomDataForm
  | HideViewerCustomDataForm
  | ProcessingCustomDataForm
  | NotProcessingCustomDataForm
  | ProcessingAltCustomDataForm
  | NotProcessingAltCustomDataForm
  | LoadDataCustomDataForm
  | LoadDataCustomDataFormSuccess
  | SaveCustomDataForm
  | SubmitCustomDataForm
  | AddCustomDataForm
  | DeleteDataCustomDataForm
  | RemoveDataCustomDataForm;
