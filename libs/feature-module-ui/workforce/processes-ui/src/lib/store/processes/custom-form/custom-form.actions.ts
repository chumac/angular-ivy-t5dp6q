import { Action } from '@ngrx/store';

import { IBasicData } from '@nutela/models/core-data';
import { ICustomForm, ICustomFormType, ICustomFormArea, ICustomFormScope, ICustomFormEligibility } from '@nutela/models/workforce/employee-profiles';
import { IWorkDefinition } from '@nutela/models/foundation';

export enum CustomFormActionTypes {
  SHOW_EDITOR = '[HR_TRANSACTION CUSTOM_FORMS] Show Editor',
  HIDE_EDITOR = '[HR_TRANSACTION CUSTOM_FORMS] Hide Editor',

  SHOW_VIEWER = '[HR_TRANSACTION CUSTOM_FORMS] Show Viewer',
  HIDE_VIEWER = '[HR_TRANSACTION CUSTOM_FORMS] Hide Viewer',

  PROCESSING = '[HR_TRANSACTION CUSTOM_FORMS] Processing',
  NOT_PROCESSING = '[HR_TRANSACTION CUSTOM_FORMS] Not Processing',

  LOAD_DATA = '[HR_TRANSACTION CUSTOM_FORMS] Load Data',
  LOAD_DATA_SUCCESS = '[HR_TRANSACTION CUSTOM_FORMS] Load Data Success',

  LOAD_DATA_SET_TYPE = '[HR_TRANSACTION CUSTOM_FORMS] Load Data Set Type',
  LOAD_DATA_SET_TYPE_SUCCESS = '[HR_TRANSACTION CUSTOM_FORMS] Load Data Set Type Success',

  LOAD_CASCADE_DATA_SET_TYPE = '[HR_TRANSACTION CUSTOM_FORMS] Load Cascade Data Set Type',
  LOAD_CASCADE_DATA_SET_TYPE_SUCCESS = '[HR_TRANSACTION CUSTOM_FORMS] Load Cascade Data Set Type Success',

  LOAD_TYPE_LIST = '[HR_TRANSACTION CUSTOM_FORMS] Load Type List',
  LOAD_TYPE_LIST_SUCCESS = '[HR_TRANSACTION CUSTOM_FORMS] Load Type List Success',

  LOAD_AREA_LIST = '[HR_TRANSACTION CUSTOM_FORMS] Load Area List',
  LOAD_AREA_LIST_SUCCESS = '[HR_TRANSACTION CUSTOM_FORMS] Load Area List Success',

  LOAD_SCOPE_LIST = '[HR_TRANSACTION CUSTOM_FORMS] Load Scope List',
  LOAD_SCOPE_LIST_SUCCESS = '[HR_TRANSACTION CUSTOM_FORMS] Load Scope List Success',

  LOAD_ELIGIBILITY = '[HR_TRANSACTION CUSTOM_FORMS] Load Eligibility List',
  LOAD_ELIGIBILITY_SUCCESS = '[HR_TRANSACTION CUSTOM_FORMS] Load Eligibility List Success',

  LOAD_WORKFLOW_LIST = '[HR_TRANSACTION CUSTOM_FORMS] Load Work Flow List',
  LOAD_WORKFLOW_LIST_SUCCESS = '[HR_TRANSACTION CUSTOM_FORMS] Load Work Flow List Success',

  SAVE = '[HR_TRANSACTION CUSTOM_FORMS] Save',
  SAVE_SUCCESS = '[HR_TRANSACTION CUSTOM_FORMS] Save Success',

  ADD = '[HR_TRANSACTION CUSTOM_FORMS] Add',
  ADD_SUCCESS = '[HR_TRANSACTION CUSTOM_FORMS] Add Success',

  DELETE_DATA = '[HR_TRANSACTION CUSTOM_FORMS] Delete Data',

  REMOVE_DATA = '[HR_TRANSACTION CUSTOM_FORMS] Remove Data',

}

export class ShowEditorCustomForm implements Action {
  readonly type = CustomFormActionTypes.SHOW_EDITOR;
}

export class HideEditorCustomForm implements Action {
  readonly type = CustomFormActionTypes.HIDE_EDITOR;
}


export class ShowViewerCustomForm implements Action {
  readonly type = CustomFormActionTypes.SHOW_VIEWER;
}

export class HideViewerCustomForm implements Action {
  readonly type = CustomFormActionTypes.HIDE_VIEWER;
}


export class ProcessingCustomForm implements Action {
  readonly type = CustomFormActionTypes.PROCESSING;
}

export class NotProcessingCustomForm implements Action {
  readonly type = CustomFormActionTypes.NOT_PROCESSING;
}


export class LoadDataCustomForm implements Action {
  readonly type = CustomFormActionTypes.LOAD_DATA;
}

export class LoadDataCustomFormSuccess implements Action {
  readonly type = CustomFormActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ICustomForm[]) {}
}

export class LoadDataSetTypeCustomForm implements Action {
  readonly type = CustomFormActionTypes.LOAD_DATA_SET_TYPE;
}

export class LoadDataSetTypeCustomFormSuccess implements Action {
  readonly type = CustomFormActionTypes.LOAD_DATA_SET_TYPE_SUCCESS;

  constructor(public payload: IBasicData[]) {}
}

export class LoadTypeListCustomForm implements Action {
  readonly type = CustomFormActionTypes.LOAD_TYPE_LIST;
}

export class LoadTypeListCustomFormSuccess implements Action {
  readonly type = CustomFormActionTypes.LOAD_TYPE_LIST_SUCCESS;

  constructor(public payload: ICustomFormType[]) {}
}

export class LoadAreaListCustomForm implements Action {
  readonly type = CustomFormActionTypes.LOAD_AREA_LIST;
}

export class LoadAreaListCustomFormSuccess implements Action {
  readonly type = CustomFormActionTypes.LOAD_AREA_LIST_SUCCESS;

  constructor(public payload: ICustomFormArea[]) {}
}

export class LoadScopeListCustomForm implements Action {
  readonly type = CustomFormActionTypes.LOAD_SCOPE_LIST;
}

export class LoadScopeListCustomFormSuccess implements Action {
  readonly type = CustomFormActionTypes.LOAD_SCOPE_LIST_SUCCESS;

  constructor(public payload: ICustomFormScope[]) {}
}

export class LoadEligibilityListCustomForm implements Action {
  readonly type = CustomFormActionTypes.LOAD_ELIGIBILITY;
}

export class LoadEligibilityListCustomFormSuccess implements Action {
  readonly type = CustomFormActionTypes.LOAD_ELIGIBILITY_SUCCESS;

  constructor(public payload: ICustomFormEligibility[]) {}
}

export class LoadWorkFlowListCustomForm implements Action {
  readonly type = CustomFormActionTypes.LOAD_WORKFLOW_LIST;
}

export class LoadWorkFlowListCustomFormSuccess implements Action {
  readonly type = CustomFormActionTypes.LOAD_WORKFLOW_LIST_SUCCESS;

  constructor(public payload: IWorkDefinition[]) {}
}

export class LoadCascadeDataSetTypeCustomForm implements Action {
  readonly type = CustomFormActionTypes.LOAD_CASCADE_DATA_SET_TYPE;
}

export class LoadCascadeDataSetTypeCustomFormSuccess implements Action {
  readonly type = CustomFormActionTypes.LOAD_CASCADE_DATA_SET_TYPE_SUCCESS;

  constructor(public payload: IBasicData[]) {}
}

export class SaveCustomForm implements Action {
  readonly type = CustomFormActionTypes.SAVE;

  constructor(public payload: {data: ICustomForm, recordId: number, editMode: boolean}) {}
}

export class AddCustomForm implements Action {
  readonly type = CustomFormActionTypes.ADD;

  constructor(public payload: {data: ICustomForm}) {}
}


export class DeleteDataCustomForm implements Action {
  readonly type = CustomFormActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataCustomForm implements Action {
  readonly type = CustomFormActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type CustomFormActions =
  | ShowEditorCustomForm
  | HideEditorCustomForm
  | ShowViewerCustomForm
  | HideViewerCustomForm
  | ProcessingCustomForm
  | NotProcessingCustomForm
  | LoadDataCustomForm
  | LoadDataCustomFormSuccess
  | LoadDataSetTypeCustomForm
  | LoadDataSetTypeCustomFormSuccess
  | LoadCascadeDataSetTypeCustomForm
  | LoadCascadeDataSetTypeCustomFormSuccess
  | LoadTypeListCustomForm
  | LoadTypeListCustomFormSuccess
  | LoadAreaListCustomForm
  | LoadAreaListCustomFormSuccess
  | LoadScopeListCustomForm
  | LoadScopeListCustomFormSuccess
  | LoadEligibilityListCustomForm
  | LoadEligibilityListCustomFormSuccess
  | LoadWorkFlowListCustomForm
  | LoadWorkFlowListCustomFormSuccess
  | SaveCustomForm
  | AddCustomForm
  | DeleteDataCustomForm
  | RemoveDataCustomForm;
