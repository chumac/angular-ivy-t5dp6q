import { Action } from '@ngrx/store';
import { IEventParticiantCriteriaEmployee, IEventParticiantCriteriaKey, IEventParticiantCriteriaKeyItems, IEventParticiantEmployee, IEventParticiantGrade, IEventParticiantSchedule, IEventParticiantSource, IEventParticiantStructureType, IEventParticipants } from '@nutela/models/talent/learning';

export enum EventParticipantsActionTypes {
  PROCESSING = '[LEARNING SETUPS EVENT DETAIL] Processing',
  NOT_PROCESSING = '[LEARNING SETUPS EVENT DETAIL] Not Processing',

  LOAD_EVENT_PARTICIPANTS_DATA = '[LOAD EVENT PARTICIPANTS DATA] Load Event Participants Data',
  LOAD_EVENT_PARTICIPANTS_DATA_SUCCESS = '[LOAD EVENT PARTICIPANTS DATA SUCCESS] Load Event Participants Data Success',

  LOADING = '[ EVENT PARTICIPANTS EXECUTION PROCESS ] Loading',
  NOT_LOADING = '[ EVENT PARTICIPANTS EXECUTION PROCESS ] Not Loading',

  SHOW_EVENT_PARTICIPANTS_EDITOR = '[ SHOW EVENT PARTICIPANTS EDITOR PROCESS ] Show Event Participants Editor',
  HIDE_EVENT_PARTICIPANTS_EDITOR = '[ HIDE EVENT PARTICIPANTS EDITOR PROCESS ] Hide Event Participants Editor',

  SAVE_EVENT_PARTICIPANTS_DATA = '[ SAVE EVENT PARTICIPANTS EXECUTION PROCESS ] Save Event Participants Data',
  SAVE_EVENT_PARTICIPANTS_DATA_SUCCESS = '[ SAVE EVENT PARTICIPANTS EXECUTION PROCESS ] Save Event Participants Data Success',

  UPDATE_VENT_PARTICIPANTS_DATA = '[ UPDATE EVENT PARTICIPANTS PROCESS ] Update Event Participants  Data',
  UPDATE_VENT_PARTICIPANTS_DATA_SUCCESS = '[ UPDATE EVENT PARTICIPANTS PROCESS ] Update Event Participants Data Success',

  SHOW_EVENT_PARTICIPANTS_VIEW = '[ SHOW EVENT PARTICIPANTS VIEW PROCESS ] Show Event Participants View',
  HIDE_EVENT_PARTICIPANTS_VIEW = '[ HIDE EVENT PARTICIPANTS VIEW PROCESS ] Hide Event Participants View',

  DELETE_EVENT_PARTICIPANTS = '[DELETE EVENT PARTICIPANTS PROCESS] Delete Event Participants',

  LOAD_EVENT_PARTICIPANTS_SOURCE_DATA = '[LOAD EVENT PARTICIPANTS SOURCE DATA] Load Event Participants Source Data',
  LOAD_EVENT_PARTICIPANTS_SOURCE_DATA_SUCCESS = '[LOAD EVENT PARTICIPANTS SOURCE DATA SUCCESS] Load Event Participants Source Data Success',

  LOAD_EVENT_PARTICIPANTS_EMPLOYEE_DATA = '[LOAD EVENT PARTICIPANTS EMPLOYEE DATA] Load Event Participants Employee Data',
  LOAD_EVENT_PARTICIPANTS_EMPLOYEE_DATA_SUCCESS = '[LOAD EVENT PARTICIPANTS EMPLOYEE DATA SUCCESS] Load Event Participants Employee Data Success',

  LOAD_EVENT_PARTICIPANTS_SCHEDULE_DATA = '[LOAD EVENT PARTICIPANTS SCHEDULE DATA] Load Event Participants Schedule Data',
  LOAD_EVENT_PARTICIPANTS_SCHEDULE_DATA_SUCCESS = '[LOAD EVENT PARTICIPANTS SCHEDULE DATA SUCCESS] Load Event Participants Schedule Data Success',

  SAVE_EVENT_PARTICIPANT_DATA = '[ SAVE EVENT PARTICIPANT EXECUTION PROCESS ] Save Event Participant Data',
  SAVE_EVENT_PARTICIPANT_DATA_SUCCESS = '[ SAVE EVENT PARTICIPANT EXECUTION PROCESS ] Save Event Participant Data Success',

  UPDATE_EVENT_PARTICIPANT_DATA = '[ UPDATE EVENT PARTICIPANT PROCESS ] Update Event Participant  Data',
  UPDATE_EVENT_PARTICIPANT_DATA_SUCCESS = '[ UPDATE EVENT PARTICIPANT PROCESS ] Update Event Participant Data Success',

  SHOW_EVENT_PARTICIPANTS_CRITERIA = '[ SHOW EVENT PARTICIPANTS CRITERIA PROCESS ] Show Event Participants Criteria',
  HIDE_EVENT_PARTICIPANTS_CRITERIA = '[ HIDE EVENT PARTICIPANTS CRITERIA PROCESS ] Hide Event Participants Criteria',

  LOAD_EVENT_PARTICIPANT_GRADE_DATA = '[LOAD EVENT PARTICIPANT GRADE DATA] Load Event Participants Grade Data',
  LOAD_EVENT_PARTICIPANT_GRADE_DATA_SUCCESS = '[LOAD EVENT PARTICIPANT GRADE DATA SUCCESS] Load Event Participants Grade Data Success',

  LOAD_EVENT_PARTICIPANT_STRUCTURE_TYPE_DATA = '[LOAD EVENT PARTICIPANT STRUCTURE TYPE DATA] Load Event Participants Structure Type Data',
  LOAD_EVENT_PARTICIPANT_STRUCTURE_TYPE_DATA_SUCCESS = '[LOAD EVENT PARTICIPANT STRUCTURE TYPE DATA SUCCESS] Load Event Participants Structure Type Data Success',

  LOAD_EVENT_PARTICIPANT_CRITERIA_EMPLOYEE_DATA = '[LOAD EVENT PARTICIPANT CRITERIA EMPLOYEE DATA] Load Event Participants Criteria Employee Data',
  LOAD_EVENT_PARTICIPANT_CRITERIA_EMPLOYEE_DATA_SUCCESS = '[LOAD EVENT PARTICIPANT CRITERIA EMPLOYEE DATA SUCCESS] Load Event Participants Criteria Employee Data Success',

  LOAD_EVENT_PARTICIPANT_CRITERIA_KEY_DATA = '[LOAD EVENT PARTICIPANT CRITERIA KEY DATA] Load Event Participants Criteria Key Data',
  LOAD_EVENT_PARTICIPANT_CRITERIA_KEY_DATA_SUCCESS = '[LOAD EVENT PARTICIPANT CRITERIA KEY DATA SUCCESS] Load Event Participants Criteria Key Data Success',

  LOAD_EVENT_PARTICIPANT_CRITERIA_KEY_ITEMS_DATA = '[LOAD EVENT PARTICIPANT CRITERIA KEY ITEMS DATA] Load Event Participants Criteria Key Items Data',
  LOAD_EVENT_PARTICIPANT_CRITERIA_KEY_ITEMS_DATA_SUCCESS = '[LOAD EVENT PARTICIPANT CRITERIA KEY ITEMS DATA SUCCESS] Load Event Participants Criteria Key Items Data Success',
}

export class ProcessingEventParticipants implements Action {
  readonly type = EventParticipantsActionTypes.PROCESSING;
}

export class NotProcessingEventParticipants implements Action {
  readonly type = EventParticipantsActionTypes.NOT_PROCESSING;
}

export class LoadingEventParticipants implements Action {
  readonly type = EventParticipantsActionTypes.LOADING;
}

export class NotLoadingEventParticipants implements Action {
  readonly type = EventParticipantsActionTypes.NOT_LOADING;
}

export class LoadEventParticipantsData implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANTS_DATA;
  constructor(public event_id: number) { }
}

export class LoadEventParticipantsDataSuccess implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANTS_DATA_SUCCESS;
  constructor(public payload: IEventParticipants[]) { }
}

export class ShowEventParticipantsEditor implements Action {
  readonly type = EventParticipantsActionTypes.SHOW_EVENT_PARTICIPANTS_EDITOR;
}

export class HideEventParticipantsEditor implements Action {
  readonly type = EventParticipantsActionTypes.HIDE_EVENT_PARTICIPANTS_EDITOR;
}

export class LoadEventParticipantSource implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANTS_SOURCE_DATA;
}

export class LoadEventParticipantSourceSuccess implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANTS_SOURCE_DATA_SUCCESS;
  constructor(public payload: IEventParticiantSource[]) { }
}

export class LoadEventParticipantEmployee implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANTS_EMPLOYEE_DATA;
}

export class LoadEventParticipantEmployeeSuccess implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANTS_EMPLOYEE_DATA_SUCCESS;
  constructor(public payload: IEventParticiantEmployee[]) { }
}

export class LoadEventParticipantSchedule implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANTS_SCHEDULE_DATA;  
  constructor(public event_id: number) { }
}

export class LoadEventParticipantScheduleSuccess implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANTS_SCHEDULE_DATA_SUCCESS;
  constructor(public payload: IEventParticiantSchedule[]) { }
}

export class SaveEventParticipantData implements Action {
  readonly type = EventParticipantsActionTypes.SAVE_EVENT_PARTICIPANT_DATA;
  constructor(public payload: { data: any }) { }
}

export class UpdateEventParticipantData implements Action {
  readonly type = EventParticipantsActionTypes.UPDATE_EVENT_PARTICIPANT_DATA;
  constructor(public payload: { data: IEventParticipants, id : number }) { }
}

export class ShowEventParticipantsView implements Action {
  readonly type = EventParticipantsActionTypes.SHOW_EVENT_PARTICIPANTS_VIEW;
}

export class HideEventParticipantsView implements Action {
  readonly type = EventParticipantsActionTypes.HIDE_EVENT_PARTICIPANTS_VIEW
}

export class DeleteEventParticipant implements Action {
  readonly type = EventParticipantsActionTypes.DELETE_EVENT_PARTICIPANTS;
  constructor(public payload: {id: number, eventId: number}) {}
}

export class ShowEventParticipantCriteria implements Action {
  readonly type = EventParticipantsActionTypes.SHOW_EVENT_PARTICIPANTS_CRITERIA;
}

export class HideEventParticipantCriteria implements Action {
  readonly type = EventParticipantsActionTypes.HIDE_EVENT_PARTICIPANTS_CRITERIA
}

export class LoadEventParticipantGradeData implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_GRADE_DATA;
}

export class LoadEventParticipantGradeDataSuccess implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_GRADE_DATA_SUCCESS;
  constructor(public payload: IEventParticiantGrade[]) { }
}

export class LoadEventParticipantStructureTypeData implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_STRUCTURE_TYPE_DATA;
}

export class LoadEventParticipantStructureTypeDataSuccess implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_STRUCTURE_TYPE_DATA_SUCCESS;
  constructor(public payload: IEventParticiantStructureType[]) { }
}

export class LoadEventParticipantCriteriaEmployeeData implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_CRITERIA_EMPLOYEE_DATA;
  constructor(public criteria_text: string) {}
}

export class LoadEventParticipantCriteriaEmployeeDataSuccess implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_CRITERIA_EMPLOYEE_DATA_SUCCESS;
  constructor(public payload: IEventParticiantCriteriaEmployee[]) { }
}

export class LoadEventParticipantCriteriaKeyData implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_CRITERIA_KEY_DATA;
}

export class LoadEventParticipantCriteriaKeyDataSuccess implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_CRITERIA_KEY_DATA_SUCCESS;
  constructor(public payload: IEventParticiantCriteriaKey[]) { }
}

export class LoadEventParticipantCriteriaKeyItemsData implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_CRITERIA_KEY_ITEMS_DATA;
  constructor(public keyword: string) {}
}

export class LoadEventParticipantCriteriaKeyItemsDataSuccess implements Action {
  readonly type = EventParticipantsActionTypes.LOAD_EVENT_PARTICIPANT_CRITERIA_KEY_ITEMS_DATA_SUCCESS;
  constructor(public payload: IEventParticiantCriteriaKeyItems[]) { }
}

export type EventParticipantsActions =
  | ProcessingEventParticipants
  | NotProcessingEventParticipants
  | LoadingEventParticipants
  | NotLoadingEventParticipants
  | LoadEventParticipantsData
  | LoadEventParticipantsDataSuccess
  | ShowEventParticipantsEditor
  | HideEventParticipantsEditor
  | LoadEventParticipantSource
  | LoadEventParticipantSourceSuccess
  | LoadEventParticipantEmployee
  | LoadEventParticipantEmployeeSuccess
  | LoadEventParticipantSchedule
  | LoadEventParticipantScheduleSuccess
  | SaveEventParticipantData
  | UpdateEventParticipantData
  | ShowEventParticipantsView
  | HideEventParticipantsView
  | ShowEventParticipantCriteria
  | HideEventParticipantCriteria
  | LoadEventParticipantGradeData
  | LoadEventParticipantGradeDataSuccess
  | LoadEventParticipantStructureTypeData
  | LoadEventParticipantStructureTypeDataSuccess
  | LoadEventParticipantCriteriaEmployeeData
  | LoadEventParticipantCriteriaEmployeeDataSuccess
  | LoadEventParticipantCriteriaKeyData
  | LoadEventParticipantCriteriaKeyDataSuccess
  | LoadEventParticipantCriteriaKeyItemsData
  | LoadEventParticipantCriteriaKeyItemsDataSuccess