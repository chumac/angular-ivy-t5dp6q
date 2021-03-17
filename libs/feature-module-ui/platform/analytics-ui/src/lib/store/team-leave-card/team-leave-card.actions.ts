import { Action } from '@ngrx/store';

import { ILeaveTimeline } from '@nutela/models/workforce/leave';

export enum TeamLeaveCardActionTypes {
  LOAD_LEAVE_TIMELINE = '[TEAM LEAVE - LEAVE TIMELINE] Load Timeline',
  LOAD_LEAVE_TIMELINE_SUCCESS = '[TEAM LEAVE - LEAVE TIMELINE] Load Timeline Success',

  VIEW_TYPE = '[TEAM LEAVE - VIEW TYPE] View Type',
}

export class LoadDataLeaveTimeline implements Action {
  readonly type = TeamLeaveCardActionTypes.LOAD_LEAVE_TIMELINE;

  constructor() {}
}

export class LoadDataLeaveTimelineSuccess implements Action {
  readonly type = TeamLeaveCardActionTypes.LOAD_LEAVE_TIMELINE_SUCCESS;

  constructor(public payload: ILeaveTimeline[]) {}
}

export class SwitchViewTypeTeamLeaveCard implements Action {
  readonly type = TeamLeaveCardActionTypes.VIEW_TYPE;

  constructor(public payload: string) {}
}

export type TeamLeaveCardActions =
  | LoadDataLeaveTimeline
  | LoadDataLeaveTimelineSuccess
  | SwitchViewTypeTeamLeaveCard;
