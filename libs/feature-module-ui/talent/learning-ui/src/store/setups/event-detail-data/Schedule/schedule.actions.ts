import { Action } from '@ngrx/store';
import { IEventDetail, IEventDetailData, IEventDetailType } from '@nutela/models/talent/learning';
import { IEventHall } from 'libs/models/talent/learning/src/lib/interfaces/event-hall.interface';
import { IEventSchedule } from 'libs/models/talent/learning/src/lib/interfaces/schedule.interface';

export enum EventScheduleActionTypes {
  PROCESSING = '[LEARNING SETUPS EVENT DETAIL] Processing',
  NOT_PROCESSING = '[LEARNING SETUPS EVENT DETAIL] Not Processing',

  LOAD_EVENT_SCHEDULE_DATA = '[LOAD EVENT SCHEDULE DATA] Load Event Schedule Data',
  LOAD_EVENT_SCHEDULE_DATA_SUCCESS = '[LOAD EVENT SCHEDULE DATA SUCCESS] Load Event Schedule Data Success',

  LOADING = '[ EVENT SCHEDULE EXECUTION PROCESS ] Loading',
  NOT_LOADING = '[ EVENT SCHEDULE EXECUTION PROCESS ] Not Loading',

  SHOW_EVENT_SCHEDULE_EDITOR = '[ SHOW EVENT SCHEDULE EDITOR PROCESS ] Show Event Schedule Editor',
  HIDE_EVENT_SCHEDULE_EDITOR = '[ HIDE EVENT SCHEDULE EDITOR PROCESS ] Hide Event Schedule Editor',

  LOAD_EVENT_HALL_DATA = '[LOAD EVENT HALL DATA] Load Event Hall Data',
  LOAD_EVENT_HALL_DATA_SUCCESS = '[LOAD EVENT HALL DATA SUCCESS] Load Event Hall Data Success',

  SAVE_EVENT_SCHEDULE_DATA = '[ SAVE EVENT SCHEDULE EXECUTION PROCESS ] Save Event Schedule Data',
  SAVE_EVENT_SCHEDULE_DATA_SUCCESS = '[ SAVE EVENT SCHEDULE EXECUTION PROCESS ] Save Event Schedule Data Success',

  UPDATE_VENT_SCHEDULE_DATA = '[ UPDATE EVENT SCHEDULE PROCESS ] Update Event Schedule  Data',
  UPDATE_VENT_SCHEDULE_DATA_SUCCESS = '[ UPDATE EVENT SCHEDULE PROCESS ] Update Event Schedule Data Success',

  SHOW_EVENT_SCHEDULE_VIEW = '[ SHOW EVENT SCHEDULE VIEW PROCESS ] Show Event Schedule View',
  HIDE_EVENT_SCHEDULE_VIEW = '[ HIDE EVENT SCHEDULE VIEW PROCESS ] Hide Event Schedule View',

  DELETE_EVENT_SCHEDULE = '[DELETE EVENT SCHEDULE PROCESS] Delete Event Schedule',
}

export class ProcessingEventSchedule implements Action {
  readonly type = EventScheduleActionTypes.PROCESSING;
}

export class NotProcessingEventSchedule implements Action {
  readonly type = EventScheduleActionTypes.NOT_PROCESSING;
}

export class LoadingEventSchedule implements Action {
  readonly type = EventScheduleActionTypes.LOADING;
}

export class NotLoadingEventSchedule implements Action {
  readonly type = EventScheduleActionTypes.NOT_LOADING;
}

export class LoadEventScheduleData implements Action {
  readonly type = EventScheduleActionTypes.LOAD_EVENT_SCHEDULE_DATA;
  constructor(public event_id: number) { }
}

export class LoadEventScheduleDataSuccess implements Action {
  readonly type = EventScheduleActionTypes.LOAD_EVENT_SCHEDULE_DATA_SUCCESS;
  constructor(public payload: IEventSchedule[]) { }
}

export class ShowEventScheduleEditor implements Action {
  readonly type = EventScheduleActionTypes.SHOW_EVENT_SCHEDULE_EDITOR;
}

export class HideEventScheduleEditor implements Action {
  readonly type = EventScheduleActionTypes.HIDE_EVENT_SCHEDULE_EDITOR;
}

export class LoadEventHallData implements Action {
  readonly type = EventScheduleActionTypes.LOAD_EVENT_HALL_DATA;
}

export class LoadEventHallDataSuccess implements Action {
  readonly type = EventScheduleActionTypes.LOAD_EVENT_HALL_DATA_SUCCESS;
  constructor(public payload: IEventHall[]) { }
}

export class SaveEventScheduleData implements Action {
  readonly type = EventScheduleActionTypes.SAVE_EVENT_SCHEDULE_DATA;
  constructor(public payload: { data: IEventSchedule }) { }
}

export class UpdateEventScheduleData implements Action {
  readonly type = EventScheduleActionTypes.UPDATE_VENT_SCHEDULE_DATA;
  constructor(public payload: { data: IEventSchedule, schedule_id:number }) { }
}

export class ShowEventScheduleView implements Action {
  readonly type = EventScheduleActionTypes.SHOW_EVENT_SCHEDULE_VIEW;
}

export class HideEventScheduleView implements Action {
  readonly type = EventScheduleActionTypes.HIDE_EVENT_SCHEDULE_VIEW;
}

export class DeleteEventSchedule implements Action {
  readonly type = EventScheduleActionTypes.DELETE_EVENT_SCHEDULE;
  constructor(public payload: {schedule_id: number, eventId: number}) {}
}

export type EventScheduleActions =
  | ProcessingEventSchedule
  | NotProcessingEventSchedule
  | LoadingEventSchedule
  | NotLoadingEventSchedule
  | LoadEventScheduleData
  | LoadEventScheduleDataSuccess
  | ShowEventScheduleEditor
  | HideEventScheduleEditor
  | LoadEventHallData
  | LoadEventHallDataSuccess
  | SaveEventScheduleData
  | ShowEventScheduleView
  | HideEventScheduleView
  | DeleteEventSchedule
