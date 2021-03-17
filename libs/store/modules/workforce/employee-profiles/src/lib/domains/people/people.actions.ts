import { Action } from '@ngrx/store';
import { IPeople } from '@nutela/models/workforce/personnel';

export enum PeopleActionTypes {
  LOAD_DATA = '[PEOPLE] Load Data',
  LOAD_DATA_SUCCESS = '[PEOPLE] Load Data Success',

  LOAD_DATA_ITEM = '[PEOPLE] Load Data Item',
  LOAD_DATA_ITEM_SUCCESS = '[PEOPLE] Load Data Item Success',

  LOADING_DATA_PEOPLE = '[PEOPLE] Loading Data People',
  NOT_LOADING_DATA_PEOPLE = '[PEOPLE] Not Loading Data People',

  RESET_PEOPLE = '[PEOPLE] Reset People',

  PROCESSING = '[PEOPLE] Processing',
  NOT_PROCESSING = '[PEOPLE] Not Processing',

  SHOW_VIEWER_PEOPLE = '[PEOPLE] Show Viewer',
  HIDE_VIEWER_PEOPLE = '[PEOPLE] Hide Viewer'
}

export class LoadDataPeople implements Action {
  readonly type = PeopleActionTypes.LOAD_DATA;
  constructor(public payload: { pageNo: number, pageSize: number, searchID: number, searchText: string }) {}
}

export class LoadDataPeopleSuccess implements Action {
  readonly type = PeopleActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IPeople[]) {}
}

export class ProcessingPeople implements Action {
  readonly type = PeopleActionTypes.PROCESSING;
}

export class NotProcessingPeople implements Action {
  readonly type = PeopleActionTypes.NOT_PROCESSING;
}

export class LoadingPeople implements Action {
  readonly type = PeopleActionTypes.LOADING_DATA_PEOPLE;
}

export class NotLoadingPeople implements Action {
  readonly type = PeopleActionTypes.NOT_LOADING_DATA_PEOPLE;
}

export class ResetPeople implements Action {
  readonly type = PeopleActionTypes.RESET_PEOPLE;
}

export class ShowViewerPeople implements Action {
  readonly type = PeopleActionTypes.SHOW_VIEWER_PEOPLE;
}

export class HideViewerPeople implements Action {
  readonly type = PeopleActionTypes.HIDE_VIEWER_PEOPLE;
}


export type PeopleActions =
  | LoadDataPeople
  | LoadDataPeopleSuccess
  | ProcessingPeople
  | NotProcessingPeople
  | LoadingPeople
  | NotLoadingPeople
  | ResetPeople
  | ShowViewerPeople
  | HideViewerPeople
