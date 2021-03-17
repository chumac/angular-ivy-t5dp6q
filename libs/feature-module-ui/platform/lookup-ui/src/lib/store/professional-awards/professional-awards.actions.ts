import { Action } from '@ngrx/store';

import { IProfessionalAwards } from "@nutela/models/platform/lookup";


export enum ProfessionalAwardsActionTypes {

  SHOW_EDITOR = '[PROFESSIONAL AWARDS] Show Editor',
  HIDE_EDITOR = '[PROFESSIONAL AWARDS] Hide Editor',

  PROCESSING = '[PROFESSIONAL AWARDS] Processing',
  NOT_PROCESSING = '[PROFESSIONAL AWARDS] Not Processing',

  LOAD_AWARD_DATA = '[PROFESSIONAL AWARDS] Load PROFESSIONAL AWARDS Data',
  LOAD_AWARD_DATA_SUCCESS = '[PROFESSIONAL AWARDS] Load PROFESSIONAL AWARDS Data Success',

  SAVE = '[PROFESSIONAL AWARDS] Save',
  SAVE_SUCCESS = '[PROFESSIONAL AWARDS] Save Success', 

  UPDATE = '[UPDATE PROFESSIONAL AWARDS] UPDATE',
  UPDATE_SUCCESS = '[UPDATE PROFESSIONAL AWARDS] UPDATE Success', 

  DELETE = '[PROFESSIONAL AWARDS] DELETE',
}


export class ShowEditorProfessionalAwards implements Action {
  readonly type = ProfessionalAwardsActionTypes.SHOW_EDITOR;
}

export class HideEditorProfessionalAwards implements Action {
  readonly type = ProfessionalAwardsActionTypes.HIDE_EDITOR;
}

export class ProcessingProfessionalAwards implements Action {
  readonly type = ProfessionalAwardsActionTypes.PROCESSING;
}

export class NotProcessingProfessionalAwards implements Action {
  readonly type = ProfessionalAwardsActionTypes.NOT_PROCESSING;
}


export class LoadProfessionalAwardsData implements Action {
  readonly type = ProfessionalAwardsActionTypes.LOAD_AWARD_DATA;
}

export class LoadProfessionalAwardsSuccess implements Action {
  readonly type = ProfessionalAwardsActionTypes.LOAD_AWARD_DATA_SUCCESS;

  constructor(public payload: IProfessionalAwards[]) {}
}


export class SaveProfessionalAwards implements Action {
  readonly type = ProfessionalAwardsActionTypes.SAVE;
  constructor(public payload: {data: IProfessionalAwards}) {}
}

export class UpdateProfessionalAwards implements Action {
  readonly type = ProfessionalAwardsActionTypes.UPDATE;
  constructor(public payload: {data: IProfessionalAwards, recordId: number}) {}
}

export class DeleteProfessionalAwards implements Action {
  readonly type = ProfessionalAwardsActionTypes.DELETE;
  constructor(public payload: {recordId: number}) {}
}

export type ProfessionalAwardsActions =
  | ShowEditorProfessionalAwards
  | HideEditorProfessionalAwards 
  | ProcessingProfessionalAwards
  | NotProcessingProfessionalAwards
  | LoadProfessionalAwardsData
  | LoadProfessionalAwardsSuccess
  | SaveProfessionalAwards
  | UpdateProfessionalAwards;
