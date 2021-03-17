import { Action } from '@ngrx/store';
import { IAnniversary, IAnnouncement } from '@nutela/models/core-data';

export enum NoticeBoardCardActionTypes {

  LOAD_ANNOUNCEMENTS = '[Notice Board Card - ANNOUNCEMENTS] Load Announcements',
  LOAD_ANNOUNCEMENTS_SUCCESS = '[Notice Board Card - ANNOUNCEMENTS] Load Announcements Success',


  VIEW_TYPE = '[Notice Board Card - VIEW TYPE] View Type',
}

export class LoadDataAnnouncements implements Action {
  readonly type = NoticeBoardCardActionTypes.LOAD_ANNOUNCEMENTS;

  constructor() {}
}

export class LoadDataAnnouncementsSuccess implements Action {
  readonly type = NoticeBoardCardActionTypes.LOAD_ANNOUNCEMENTS_SUCCESS;

  constructor(public payload: IAnnouncement[]) {}
}

export class SwitchViewTypeNoticeBoardCard implements Action {
  readonly type = NoticeBoardCardActionTypes.VIEW_TYPE;

  constructor(public payload: string) {}
}

export type NoticeBoardCardActions =
  | LoadDataAnnouncements
  | LoadDataAnnouncementsSuccess
  | SwitchViewTypeNoticeBoardCard;
