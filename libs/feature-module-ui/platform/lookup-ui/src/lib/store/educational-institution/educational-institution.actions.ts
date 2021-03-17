import { Action } from '@ngrx/store';

import { IEducationalInstitution } from "@nutela/models/platform/lookup";
import { ISelectOption } from '@nutela/models/core-data';


export enum EducationalInstitutionActionTypes {

  SHOW_EDITOR = '[INSTITUTION] Show Editor',
  HIDE_EDITOR = '[INSTITUTION] Hide Editor',

  PROCESSING = '[INSTITUTION] Processing',
  NOT_PROCESSING = '[INSTITUTION] Not Processing',

  LOAD_EDUCATIONAL_INSTITUTION_DATA = '[ INSTITUTION] Load EDUCATIONAL INSTITUTION Data',
  LOAD_EDUCATIONAL_INSTITUTION_DATA_SUCCESS = '[ INSTITUTION] Load EDUCATIONAL INSTITUTION Data Success',

  LOAD_PROFESSIONAL_INSTITUTION_DATA = '[ PROFESSIONAL INSTITUTION] Load PROFESSIONAL INSTITUTION Data',
  LOAD_PROFESSIONAL_INSTITUTION_DATA_SUCCESS = '[ PROFESSIONAL INSTITUTION] Load PROFESSIONAL INSTITUTION Data Success',

  LOAD_NATIONALITY_DATA = '[INSTITUTION] Load NATIONALITY Data',
  LOAD_NATIONALITY_DATA_SUCCESS = '[INSTITUTION] Load NATIONALITY Data Success',

  LOAD_STATE_DATA = '[INSTITUTION ] Load STATE Data',
  LOAD_STATE_DATA_SUCCESS = '[INSTITUTION ] Load STATE Data Success',

  SAVE = '[INSTITUTION] Save',
  SAVE_SUCCESS = '[INSTITUTION] Save Success',

  UPDATE = '[UPDATE INSTITUTION] UPDATE',
  UPDATE_SUCCESS = '[UPDATE INSTITUTION] UPDATE Success',

  DELETE = '[INSTITUTION] DELETE',
}


export class ShowEditorEducationalInstitution implements Action {
  readonly type = EducationalInstitutionActionTypes.SHOW_EDITOR;
}

export class HideEditorEducationalInstitution implements Action {
  readonly type = EducationalInstitutionActionTypes.HIDE_EDITOR;
}

export class ProcessingEducationalInstitution implements Action {
  readonly type = EducationalInstitutionActionTypes.PROCESSING;
}

export class NotProcessingEducationalInstitution implements Action {
  readonly type = EducationalInstitutionActionTypes.NOT_PROCESSING;
}


export class LoadEducationalInstitution implements Action {
  readonly type = EducationalInstitutionActionTypes.LOAD_EDUCATIONAL_INSTITUTION_DATA;
  constructor(public payload: {countryName: String}){}
}

export class LoadEducationalInstitutionSuccess implements Action {
  readonly type = EducationalInstitutionActionTypes.LOAD_EDUCATIONAL_INSTITUTION_DATA_SUCCESS;

  constructor(public payload: IEducationalInstitution[]) {}
}

export class LoadProfessionalInstitution implements Action {
  readonly type = EducationalInstitutionActionTypes.LOAD_PROFESSIONAL_INSTITUTION_DATA;
}

export class LoadProfessionalInstitutionSuccess implements Action {
  readonly type = EducationalInstitutionActionTypes.LOAD_PROFESSIONAL_INSTITUTION_DATA_SUCCESS;

  constructor(public payload: IEducationalInstitution[]) {}
}


export class LoadNationEducationalInstitution implements Action {
  readonly type = EducationalInstitutionActionTypes.LOAD_NATIONALITY_DATA;
}

export class LoadNationEducationalInstitutionSuccess implements Action {
  readonly type = EducationalInstitutionActionTypes.LOAD_NATIONALITY_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class LoadStateEducationalInstitution implements Action {
  readonly type = EducationalInstitutionActionTypes.LOAD_STATE_DATA;
  constructor(public payload: {countryId: number}) {}
}

export class LoadStateEducationalInstitutionSuccess implements Action {
  readonly type = EducationalInstitutionActionTypes.LOAD_STATE_DATA_SUCCESS;
  constructor(public payload: ISelectOption[]) {}
}

export class SaveEducationalInstitution implements Action {
  readonly type = EducationalInstitutionActionTypes.SAVE;

  constructor(public payload: {data: IEducationalInstitution, countryName: String}) {}
}

export class UpdateEducationalInstitution implements Action {
  readonly type = EducationalInstitutionActionTypes.UPDATE;
  constructor(public payload: {data: IEducationalInstitution, recordId: number, countryName: String}) {}
}

export class DeleteEducationalInstitution implements Action {
  readonly type = EducationalInstitutionActionTypes.DELETE;
  constructor(public payload: {recordId: number, countryName: String}) {}
}

export type EducationalInstitutionActions =
  | ShowEditorEducationalInstitution
  | HideEditorEducationalInstitution
  | ProcessingEducationalInstitution
  | NotProcessingEducationalInstitution
  | LoadEducationalInstitution
  | LoadEducationalInstitutionSuccess
  | LoadProfessionalInstitution
  | LoadProfessionalInstitutionSuccess
  | LoadNationEducationalInstitution
  | LoadNationEducationalInstitutionSuccess
  | LoadStateEducationalInstitution
  | LoadStateEducationalInstitutionSuccess
  | SaveEducationalInstitution
  | UpdateEducationalInstitution;
