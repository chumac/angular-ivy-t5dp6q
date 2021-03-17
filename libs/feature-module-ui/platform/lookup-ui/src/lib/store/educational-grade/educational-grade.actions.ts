import { Action } from '@ngrx/store';

import { IEducationGrades } from "@nutela/models/platform/lookup";


export enum EducationalGradeActionTypes {

  SHOW_EDITOR = '[ EDUCATIONAL GRADES] Show Editor',
  HIDE_EDITOR = '[EDUCATIONAL GRADES] Hide Editor',

  PROCESSING = '[ EDUCATIONAL GRADES] Processing',
  NOT_PROCESSING = '[ EDUCATIONAL GRADES] Not Processing',

  LOAD_GRADE_DATA = '[ EDUCATIONAL GRADES] Load EDUCATIONAL GRADES Data',
  LOAD_GRADE_DATA_SUCCESS = '[ EDUCATIONAL GRADES] Load EDUCATIONAL GRADES Data Success',

  SAVE = '[EDUCATIONAL GRADES] Save',
  SAVE_SUCCESS = '[ EDUCATIONAL GRADES] Save Success',
  
  UPDATE = '[UPDATE EDUCATIONAL GRADES] UPDATE',
  UPDATE_SUCCESS = '[UPDATE EDUCATIONAL GRADES] UPDATE Success',

  DELETE = '[EDUCATIONAL GRADES] DELETE',
}


export class ShowEditorEducationalGrade implements Action {
  readonly type = EducationalGradeActionTypes.SHOW_EDITOR;
}

export class HideEditorEducationalGrade implements Action {
  readonly type = EducationalGradeActionTypes.HIDE_EDITOR;
}

export class ProcessingEducationalGrade implements Action {
  readonly type = EducationalGradeActionTypes.PROCESSING;
}

export class NotProcessingEducationalGrade implements Action {
  readonly type = EducationalGradeActionTypes.NOT_PROCESSING;
}


export class LoadEducationalGradeData implements Action {
  readonly type = EducationalGradeActionTypes.LOAD_GRADE_DATA;
}

export class LoadEducationalGradeSuccess implements Action {
  readonly type = EducationalGradeActionTypes.LOAD_GRADE_DATA_SUCCESS;

  constructor(public payload: IEducationGrades[]) {}
}


export class SaveEducationalGrade implements Action {
  readonly type = EducationalGradeActionTypes.SAVE;

  constructor(public payload: {data: IEducationGrades}) {}
}

export class UpdateEducationalGrade implements Action {
  readonly type = EducationalGradeActionTypes.UPDATE;
  constructor(public payload: {data: IEducationGrades, recordId: number}) {}
}

export class DeleteEducationalGrade implements Action {
  readonly type = EducationalGradeActionTypes.DELETE;
  constructor(public payload: {recordId: number}) {}
}

export type EducationalGradeActions =
  | ShowEditorEducationalGrade
  | HideEditorEducationalGrade 
  | ProcessingEducationalGrade
  | NotProcessingEducationalGrade
  | LoadEducationalGradeData
  | LoadEducationalGradeSuccess
  | SaveEducationalGrade
  | UpdateEducationalGrade;
