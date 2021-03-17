import { Action } from '@ngrx/store';

import { IEmail } from '@nutela/models/foundation';


export enum EmailActionTypes {

  LOAD_EMAIL_DATA = '[ EMAIL] Load EMAIL Data',
  LOAD_EMAIL_DATA_SUCCESS = '[ EMAIL] Load EMAIL Data Success',

  SAVE = '[EMAIL] Save',
  SAVE_SUCCESS = '[ EMAIL] Save Success', 
}



export class LoadEmailData implements Action {
  readonly type = EmailActionTypes.LOAD_EMAIL_DATA;
}

export class LoadEmailDataSuccess implements Action {
  readonly type = EmailActionTypes.LOAD_EMAIL_DATA_SUCCESS;

  constructor(public payload: IEmail[]) {}
}


export class SaveEmail implements Action {
  readonly type = EmailActionTypes.SAVE;

  constructor(public payload: {data: IEmail, recordId: number, editMode: boolean}) {}
}

export type EmailActions =
  | LoadEmailData
  | LoadEmailDataSuccess
  | SaveEmail;
