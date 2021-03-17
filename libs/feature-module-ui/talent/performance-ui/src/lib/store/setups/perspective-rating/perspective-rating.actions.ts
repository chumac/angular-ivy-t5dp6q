import { Action } from '@ngrx/store';

import { IPerspectiveRating, IPerspective } from '@nutela/models/talent/performance'; 
import { IAnalysis, IAnalysisDetail, IPosition, IDesignation, IGrade } from '@nutela/models/workforce/personnel';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

export enum PerspectiveRatingActionTypes {
  SHOW_EDITOR = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Show Editor',
  HIDE_EDITOR = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Hide Editor',

  SHOW_VIEWER = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Show Viewer',
  HIDE_VIEWER = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Hide Viewer',

  PROCESSING = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Processing',
  NOT_PROCESSING = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Not Processing',

  LOAD_DATA = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Data',
  LOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Data Success',

  LOAD_PERSPECTIVE_LIST = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Perspective List',
  LOAD_PERSPECTIVE_LIST_SUCCESS = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Perspective list Success',

  LOAD_DOCUMENT = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Document Success',
  CLEAR_DOCUMENT = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Inline Document',

  SAVE = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Save',
  SAVE_SUCCESS = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Save Success',

  ADD = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Add',
  ADD_SUCCESS = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Add Success',

  UPLOAD_DATA = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Upload Data',
  UPLOAD_DATA_SUCCESS = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Upload Data Success',

  DELETE_DATA = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Delete Data',

  REMOVE_DATA = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Remove Data',

  
  LOAD_ANALYSIS_LIST = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Analysis List',
  LOAD_ANALYSIS_LIST_SUCCESS = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Analysis List Success',

  LOAD_ANALYSIS_DETAIL_LIST = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Analysis Detail List',
  LOAD_ANALYSIS_DETAIL_LIST_SUCCESS = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Analysis Detail List Success',

  LOAD_POSITION_LIST = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Position List',
  LOAD_POSITION_LIST_SUCCESS = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Position List Success',

  LOAD_DESIGNATION_LIST = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Designation List',
  LOAD_DESIGNATION_LIST_SUCCESS = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Designation List Success',

  LOAD_GRADE_LIST = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Grade List',
  LOAD_GRADE_LIST_SUCCESS = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Grade List Success',

  LOAD_EMPLOYEE_LIST = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Employee List',
  LOAD_EMPLOYEE_LIST_SUCCESS = '[PERFORMANCE SETUPS PERSPECTIVE_RATINGS] Load Employee List Success',

}

export class ShowEditorPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.SHOW_EDITOR;
}

export class HideEditorPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.HIDE_EDITOR;
}


export class ShowViewerPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.SHOW_VIEWER;
}

export class HideViewerPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.HIDE_VIEWER;
}


export class ProcessingPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.PROCESSING;
}

export class NotProcessingPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.NOT_PROCESSING;
}


export class LoadDataPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_DATA;
  constructor(public payload: { persepectiveId: number}) {}

}

export class LoadDataPerspectiveRatingSuccess implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IPerspectiveRating[]) {}
}

export class UploadDataPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.UPLOAD_DATA;
  
  constructor(public payload: {objectiveData: IPerspectiveRating[]}) {}

}

export class UploadDataPerspectiveRatingSuccess implements Action {
  readonly type = PerspectiveRatingActionTypes.UPLOAD_DATA_SUCCESS;
}
export class LoadPerspectiveListPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_PERSPECTIVE_LIST;
}

export class LoadPerspectiveListPerspectiveRatingSuccess implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_PERSPECTIVE_LIST_SUCCESS;

  constructor(public payload: IPerspective[]) {}
}


export class LoadDocumentPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentPerspectiveRatingSuccess implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SavePerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.SAVE;

  constructor(public payload: {data: IPerspectiveRating, recordId: number, editMode: boolean, persepectiveId: number}) {}
}

export class AddPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.ADD;

  constructor(public payload: {data: IPerspectiveRating, persepectiveId: number}) {}
}


export class DeleteDataPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number, persepectiveId: number}) {}
}


export class RemoveDataPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class LoadAnalysisListPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_ANALYSIS_LIST;
}

export class LoadAnalysisListPerspectiveRatingSuccess implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_ANALYSIS_LIST_SUCCESS;

  constructor(public payload: IAnalysis[]) {}
}

export class LoadAnalysisDetListPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_ANALYSIS_DETAIL_LIST;
  constructor(public payload: number) {}
}

export class LoadAnalysisDetListPerspectiveRatingSuccess implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_ANALYSIS_DETAIL_LIST_SUCCESS;

  constructor(public payload: IAnalysisDetail[]) {}
}

export class LoadPositionListPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_POSITION_LIST;
}

export class LoadPositionListPerspectiveRatingSuccess implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_POSITION_LIST_SUCCESS;

  constructor(public payload: IPosition[]) {}
}

export class LoadDesignationListPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_DESIGNATION_LIST;
}

export class LoadDesignationListPerspectiveRatingSuccess implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_DESIGNATION_LIST_SUCCESS;

  constructor(public payload: IDesignation[]) {}
}

export class LoadGradeListPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_GRADE_LIST;
}

export class LoadGradeListPerspectiveRatingSuccess implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_GRADE_LIST_SUCCESS;

  constructor(public payload: IGrade[]) {}
}

export class LoadEmployeeListPerspectiveRating implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_EMPLOYEE_LIST;
}

export class LoadEmployeeListPerspectiveRatingSuccess implements Action {
  readonly type = PerspectiveRatingActionTypes.LOAD_EMPLOYEE_LIST_SUCCESS;

  constructor(public payload: IPersonal[]) {}
}

export type PerspectiveRatingActions =
  | ShowEditorPerspectiveRating
  | HideEditorPerspectiveRating
  | ShowViewerPerspectiveRating
  | HideViewerPerspectiveRating
  | ProcessingPerspectiveRating
  | NotProcessingPerspectiveRating
  | LoadDataPerspectiveRating
  | LoadDataPerspectiveRatingSuccess
  | LoadPerspectiveListPerspectiveRating
  | LoadPerspectiveListPerspectiveRatingSuccess
  | LoadDocumentPerspectiveRating
  | LoadDocumentPerspectiveRatingSuccess
  | ClearDocumentPerspectiveRating
  | LoadInlineDocumentPerspectiveRating
  | SavePerspectiveRating
  | AddPerspectiveRating
  | DeleteDataPerspectiveRating
  | RemoveDataPerspectiveRating
  | LoadAnalysisListPerspectiveRating
  | LoadAnalysisListPerspectiveRatingSuccess
  | LoadAnalysisDetListPerspectiveRating
  | LoadAnalysisDetListPerspectiveRatingSuccess
  | LoadPositionListPerspectiveRating
  | LoadPositionListPerspectiveRatingSuccess
  | LoadDesignationListPerspectiveRating
  | LoadDesignationListPerspectiveRatingSuccess
  | LoadGradeListPerspectiveRating
  | LoadGradeListPerspectiveRatingSuccess
  | LoadEmployeeListPerspectiveRating
  | LoadEmployeeListPerspectiveRatingSuccess
  | UploadDataPerspectiveRating
  | UploadDataPerspectiveRatingSuccess;
