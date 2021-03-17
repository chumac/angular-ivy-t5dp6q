import { Action } from '@ngrx/store';
import { IToDo, IAnniversary, IAnnouncement } from '@nutela/models/core-data';

export enum ToDoCardActionTypes {
  LOAD_TO_DOs = '[TO DO CARD - TO DOs] Load To Dos',
  LOAD_TO_DOs_SUCCESS = '[TO DO CARD - TO DOs] Load To Dos Success',

  LOAD_ANNIVERSARIES = '[TO DO CARD - ANNIVERSARIES] Load Anniversaries',
  LOAD_ANNIVERSARIES_SUCCESS = '[TO DO CARD - ANNIVERSARIES] Load Anniversaries Success',

  LOAD_ANNOUNCEMENTS = '[TO DO CARD - ANNOUNCEMENTS] Load Announcements',
  LOAD_ANNOUNCEMENTS_SUCCESS = '[TO DO CARD - ANNOUNCEMENTS] Load Announcements Success',


  VIEW_TYPE = '[TO DO CARD - VIEW TYPE] View Type',
}

export class LoadDataToDos implements Action {
  readonly type = ToDoCardActionTypes.LOAD_TO_DOs;

  constructor() {}
}

export class LoadDataToDosSuccess implements Action {
  readonly type = ToDoCardActionTypes.LOAD_TO_DOs_SUCCESS;

  constructor(public payload: IToDo[]) {}
}

export class LoadDataAnniversaries implements Action {
  readonly type = ToDoCardActionTypes.LOAD_ANNIVERSARIES;

  constructor() {}
}

export class LoadDataAnniversariesSuccess implements Action {
  readonly type = ToDoCardActionTypes.LOAD_ANNIVERSARIES_SUCCESS;

  constructor(public payload: IAnniversary[]) {}
}


export class LoadDataAnnouncements implements Action {
  readonly type = ToDoCardActionTypes.LOAD_ANNOUNCEMENTS;

  constructor() {}
}

export class LoadDataAnnouncementsSuccess implements Action {
  readonly type = ToDoCardActionTypes.LOAD_ANNOUNCEMENTS_SUCCESS;

  constructor(public payload: IAnnouncement[]) {}
}

export class SwitchViewTypeToDoCard implements Action {
  readonly type = ToDoCardActionTypes.VIEW_TYPE;

  constructor(public payload: string) {}
}

export type ToDoCardActions =
  | LoadDataToDos
  | LoadDataToDosSuccess
  | LoadDataAnniversaries
  | LoadDataAnniversariesSuccess
  | LoadDataAnnouncements
  | LoadDataAnnouncementsSuccess
  | SwitchViewTypeToDoCard;
