import { Action } from '@ngrx/store';

import { IFormTemplate } from '@nutela/models/talent/performance';
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export enum FormTemplateActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS FORM_TEMPLATES] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS FORM_TEMPLATES] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS FORM_TEMPLATES] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS FORM_TEMPLATES] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS FORM_TEMPLATES] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS FORM_TEMPLATES] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Data Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS FORM_TEMPLATES] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS FORM_TEMPLATES] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS FORM_TEMPLATES] Save Success',

  ADD = '[PERFORMANCE SETUPS FORM_TEMPLATES] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS FORM_TEMPLATES] Add Success',

  DELETE_DATA = '[PERFORMANCE SETUPS FORM_TEMPLATES] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS FORM_TEMPLATES] Remove Data',

  LOAD_ANALYSIS_LIST = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Analysis List',
  LOAD_ANALYSIS_LIST_SUCCESS = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Analysis List Success',

  LOAD_ANALYSIS_DETAIL_LIST = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Analysis Detail List',
  LOAD_ANALYSIS_DETAIL_LIST_SUCCESS = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Analysis Detail List Success',

  LOAD_POSITION_LIST = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Position List',
  LOAD_POSITION_LIST_SUCCESS = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Position List Success',

  LOAD_DESIGNATION_LIST = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Designation List',
  LOAD_DESIGNATION_LIST_SUCCESS = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Designation List Success',

  LOAD_GRADE_LIST = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Grade List',
  LOAD_GRADE_LIST_SUCCESS = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Grade List Success',

  LOAD_EMPLOYEE_LIST = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Employee List',
  LOAD_EMPLOYEE_LIST_SUCCESS = '[PERFORMANCE SETUPS FORM_TEMPLATES] Load Employee List Success',

}

export class ShowEditorFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.SHOW_EDITOR;
}

export class HideEditorFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.HIDE_EDITOR;
}


export class ShowViewerFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.SHOW_VIEWER;
}

export class HideViewerFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.HIDE_VIEWER;
}


export class ProcessingFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.PROCESSING;
}

export class NotProcessingFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.NOT_PROCESSING;
}


export class LoadDataFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.LOAD_DATA;
}

export class LoadDataFormTemplateSuccess implements Action {
  readonly type = FormTemplateActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IFormTemplate[]) {}
}


export class LoadDocumentFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentFormTemplateSuccess implements Action {
  readonly type = FormTemplateActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.SAVE;

  constructor(public payload: {data: IFormTemplate, recordId: number, editMode: boolean}) {}
}

export class AddFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.ADD;

  constructor(public payload: {data: IFormTemplate}) {}
}


export class DeleteDataFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class LoadAnalysisListFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.LOAD_ANALYSIS_LIST;
}

export class LoadAnalysisListFormTemplateSuccess implements Action {
  readonly type = FormTemplateActionTypes.LOAD_ANALYSIS_LIST_SUCCESS;

  constructor(public payload: IAnalysis[]) {}
}

export class LoadAnalysisDetListFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.LOAD_ANALYSIS_DETAIL_LIST;
  constructor(public payload: number) {}
}

export class LoadAnalysisDetListFormTemplateSuccess implements Action {
  readonly type = FormTemplateActionTypes.LOAD_ANALYSIS_DETAIL_LIST_SUCCESS;

  constructor(public payload: IAnalysisDetail[]) {}
}

export class LoadPositionListFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.LOAD_POSITION_LIST;
}

export class LoadPositionListFormTemplateSuccess implements Action {
  readonly type = FormTemplateActionTypes.LOAD_POSITION_LIST_SUCCESS;

  constructor(public payload: IPosition[]) {}
}

export class LoadDesignationListFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.LOAD_DESIGNATION_LIST;
}

export class LoadDesignationListFormTemplateSuccess implements Action {
  readonly type = FormTemplateActionTypes.LOAD_DESIGNATION_LIST_SUCCESS;

  constructor(public payload: IDesignation[]) {}
}

export class LoadGradeListFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.LOAD_GRADE_LIST;
}

export class LoadGradeListFormTemplateSuccess implements Action {
  readonly type = FormTemplateActionTypes.LOAD_GRADE_LIST_SUCCESS;

  constructor(public payload: IGrade[]) {}
}

export class LoadEmployeeListFormTemplate implements Action {
  readonly type = FormTemplateActionTypes.LOAD_EMPLOYEE_LIST;
}

export class LoadEmployeeListFormTemplateSuccess implements Action {
  readonly type = FormTemplateActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS;

  constructor(public payload: IPersonal[]) {}
}

export type FormTemplateActions =
  | ShowEditorFormTemplate
  | HideEditorFormTemplate
  | ShowViewerFormTemplate
  | HideViewerFormTemplate
  | ProcessingFormTemplate
  | NotProcessingFormTemplate
  | LoadDataFormTemplate
  | LoadDataFormTemplateSuccess
  | LoadDocumentFormTemplate
  | LoadDocumentFormTemplateSuccess
  | ClearDocumentFormTemplate
  | LoadInlineDocumentFormTemplate
  | SaveFormTemplate
  | AddFormTemplate
  | DeleteDataFormTemplate
  | RemoveDataFormTemplate
  | LoadAnalysisListFormTemplate
  | LoadAnalysisListFormTemplateSuccess
  | LoadAnalysisDetListFormTemplate
  | LoadAnalysisDetListFormTemplateSuccess
  | LoadPositionListFormTemplate
  | LoadPositionListFormTemplateSuccess
  | LoadDesignationListFormTemplate
  | LoadDesignationListFormTemplateSuccess
  | LoadGradeListFormTemplate
  | LoadGradeListFormTemplateSuccess
  | LoadEmployeeListFormTemplate
  | LoadEmployeeListFormTemplateSuccess;
