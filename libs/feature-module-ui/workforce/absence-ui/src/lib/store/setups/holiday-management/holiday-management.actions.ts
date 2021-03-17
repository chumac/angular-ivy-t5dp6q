import { Action } from '@ngrx/store';


import { IPublicHoliday} from '@nutela/models/workforce/leave';

export enum PublicHolidayActionTypes {

  SHOW_EDITOR = '[HOLIDAY MANAGEMENT] Show Editor',
  HIDE_EDITOR = '[HOLIDAY MANAGEMENT] Hide Editor',


  PROCESSING = '[HOLIDAY MANAGEMENT] Processing',
  NOT_PROCESSING = '[HOLIDAY MANAGEMENT] Not Processing',

  LOADING = '[HOLIDAY MANAGEMENT] Loading',
  NOT_LOADING = '[HOLIDAY MANAGEMENT] Not Loading',

  LOAD_HOLIDAY_DATA = '[HOLIDAY MANAGEMENT] Load HOLIDAY Data',
  LOAD_HOLIDAY_DATA_SUCCESS = '[HOLIDAY MANAGEMENT] Load HOLIDAY Data Success',

  SAVE = '[HOLIDAY MANAGEMENT] Save',
  SAVE_SUCCESS = '[HOLIDAY MANAGEMENT] Save Success',

  UPDATED = '[HOLIDAY MANAGEMENT] UPDATED',
  UPDATED_SUCCESS = '[HOLIDAY MANAGEMENT] Update Success',

  DELETE = '[HOLIDAY MANAGEMENT] Delete Data',
}



export class ShowEditorPublicHoliday implements Action {
  readonly type = PublicHolidayActionTypes.SHOW_EDITOR;
}

export class HideEditorPublicHoliday implements Action {
  readonly type = PublicHolidayActionTypes.HIDE_EDITOR;
}


export class ProcessingPublicHoliday implements Action {
  readonly type = PublicHolidayActionTypes.PROCESSING;
}

export class NotProcessingPublicHoliday implements Action {
  readonly type = PublicHolidayActionTypes.NOT_PROCESSING;
}

export class LoadingPublicHoliday implements Action {
  readonly type = PublicHolidayActionTypes.LOADING;
}

export class NotLoadingPublicHoliday implements Action {
  readonly type = PublicHolidayActionTypes.NOT_LOADING;
}

export class LoadPublicHolidayData implements Action {
  readonly type=PublicHolidayActionTypes.LOAD_HOLIDAY_DATA;
}

export class LoadPublicHolidayDataSuccess implements Action {
  readonly type = PublicHolidayActionTypes.LOAD_HOLIDAY_DATA_SUCCESS;

  constructor(public payload: IPublicHoliday[]) {}
}

export class SavePublicHoliday implements Action {
  readonly type = PublicHolidayActionTypes.SAVE;
  constructor(public payload: {data: IPublicHoliday, recordId: number}) {}
}

export class UpdatePublicHoliday implements Action {
  readonly type = PublicHolidayActionTypes.UPDATED;

  constructor(public payload: {data: IPublicHoliday, recordId: number}) {}
}

export class DeletePublicHoliday implements Action {
  readonly type = PublicHolidayActionTypes.DELETE;

  constructor(public payload: {recordId: number}) {}
}

export type PublicHolidayActions =
  | ShowEditorPublicHoliday
  | HideEditorPublicHoliday
  | ProcessingPublicHoliday
  | NotProcessingPublicHoliday
  | LoadingPublicHoliday
  | NotLoadingPublicHoliday
  | LoadPublicHolidayData
  | LoadPublicHolidayDataSuccess
  | SavePublicHoliday
  | UpdatePublicHoliday
  | DeletePublicHoliday;
