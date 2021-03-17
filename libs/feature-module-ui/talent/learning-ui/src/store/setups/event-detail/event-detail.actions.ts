import { Action } from '@ngrx/store';
import { IEventDetail, IEventDetailData, IEventEmployee, IEventDetailType, IEventDetailFaculty } from '@nutela/models/talent/learning';
import { IEventAllParticiants } from 'libs/models/talent/learning/src/lib/interfaces/event-detail-participants.interface';

export enum EventDetailActionTypes {
  SHOW_EDITOR = '[LEARNING SETUPS EVENT DETAIL] Show Editor',
  HIDE_EDITOR = '[LEARNING SETUPS EVENT DETAIL] Hide Editor',

  SHOW_VIEWER = '[LEARNING SETUPS EVENT DETAIL] Show Viewer',
  HIDE_VIEWER = '[LEARNING SETUPS EVENT DETAIL] Hide Viewer',

  PROCESSING = '[LEARNING SETUPS EVENT DETAIL] Processing',
  NOT_PROCESSING = '[LEARNING SETUPS EVENT DETAIL] Not Processing',

  LOAD_DATA = '[LEARNING SETUPS EVENT DETAIL] Load Data',
  LOAD_DATA_SUCCESS = '[LEARNING SETUPS EVENT DETAIL] Load Data Success',

  GET_EVENT_TYPE = '[LEARNING SETUPS EVENT DETAIL] Get Event Type',
  GET_EVENT_TYPE_SUCCESS = '[LEARNING SETUPS EVENT DETAIL] Get Event Type Success',

  GET_EVENT_FACULTY = '[LEARNING SETUPS EVENT DETAIL] Get Event Faculty',
  GET_EVENT_FACULTY_SUCCESS = '[LEARNING SETUPS EVENT DETAIL] Get Event Faculty Success',

  

  GET_DATA = '[LEARNING SETUPS EVENT DETAIL] Get Data',
  GET_DATA_SUCCESS = '[LEARNING SETUPS EVENT DETAIL] Get Data Success',

  LOAD_DOCUMENT = '[LEARNING SETUPS EVENT DETAIL] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[LEARNING SETUPS EVENT DETAIL] Load Document Success',
  CLEAR_DOCUMENT = '[LEARNING SETUPS EVENT DETAIL] Clear Document',

  LOAD_INLINE_DOCUMENT = '[LEARNING SETUPS EVENT DETAIL] Load Inline Document',

  SAVE = '[LEARNING SETUPS EVENT DETAIL] Save',
  SAVE_SUCCESS = '[LEARNING SETUPS EVENT DETAIL] Save Success',

  ADD = '[LEARNING SETUPS EVENT DETAIL] Add',
  ADD_SUCCESS = '[LEARNING SETUPS EVENT DETAIL] Add Success',

  DELETE_DATA = '[LEARNING SETUPS EVENT DETAIL] Delete Data',
  PUBLISH_DATA = '[LEARNING SETUPS EVENT DETAIL] Publish Data',
  UNPUBLISH_DATA = '[LEARNING SETUPS EVENT DETAIL] UnPublish Data',

  REMOVE_DATA = '[LEARNING SETUPS EVENT DETAIL] Remove Data',

  SHOW_CLOSE_EDITOR = '[LEARNING CLOSE EVENT] Show Close Editor',
  HIDE_CLOSE_EDITOR = '[LEARNING CLOSE EVENT] Hide Close Editor',

  SHOW_NOMINATION_EDITOR = '[LEARNING CLOSE EVENT] Show Nomination Editor',
  HIDE_NOMINATION_EDITOR = '[LEARNING CLOSE EVENT] Hide Nomination Editor',

  GET_PARTICIPANTS_DATA = '[GET PARTICIPANTS DATA] Get Participants Data',
  GET_PARTICIPANTS_DATA_SUCCESS = '[GET PARTICIPANTS DATA] Get Participants Data Success',

  GET_EMPLOYEE_DATA = '[GET PARTICIPANTS DATA] Get Employee Data',
  GET_EMPLOYEE_DATA_SUCCESS = '[GET PARTICIPANTS DATA] Get Employee Data Success',

  CLOSE_EVENT = '[CLOSE EVENT] Close Event',
  CLOSE_EVENT_SUCCESS = '[CLOSE EVENT] Close Event Success',

  NOMINATION_EVENT = '[CLOSE EVENT] Nomination Event',
  NOMINATION_EVENT_SUCCESS = '[CLOSE EVENT] Nomination Event Success',

}

export class ShowEditorEventDetail implements Action {
  readonly type = EventDetailActionTypes.SHOW_EDITOR;
}

export class HideEditorEventDetail implements Action {
  readonly type = EventDetailActionTypes.HIDE_EDITOR;
}


export class ShowViewerEventDetail implements Action {
  readonly type = EventDetailActionTypes.SHOW_VIEWER;
}

export class HideViewerEventDetail implements Action {
  readonly type = EventDetailActionTypes.HIDE_VIEWER;
}


export class ProcessingEventDetail implements Action {
  readonly type = EventDetailActionTypes.PROCESSING;
}

export class NotProcessingEventDetail implements Action {
  readonly type = EventDetailActionTypes.NOT_PROCESSING;
}


export class LoadDataEventDetail implements Action {
  readonly type = EventDetailActionTypes.LOAD_DATA;
}

export class LoadDataEventDetailSuccess implements Action {
  readonly type = EventDetailActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IEventDetail[]) {}
}


export class LoadDocumentEventDetail implements Action {
  readonly type = EventDetailActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentEventDetailSuccess implements Action {
  readonly type = EventDetailActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentEventDetail implements Action {
  readonly type = EventDetailActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentEventDetail implements Action {
  readonly type = EventDetailActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveEventDetail implements Action {
  readonly type = EventDetailActionTypes.SAVE;

  constructor(public payload: {data: IEventDetailData, recordId: number, editMode: boolean}) {}
}

export class AddEventDetail implements Action {
  readonly type = EventDetailActionTypes.ADD;

  constructor(public payload: {data: IEventDetailData}) {}
}


export class DeleteDataEventDetail implements Action {
  readonly type = EventDetailActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class PublishDataEventDetail implements Action {
  readonly type = EventDetailActionTypes.PUBLISH_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class UnPublishDataEventDetail implements Action {
  readonly type = EventDetailActionTypes.UNPUBLISH_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class RemoveDataEventDetail implements Action {
  readonly type = EventDetailActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class GetDataEventDetail implements Action {
  readonly type = EventDetailActionTypes.GET_DATA;

  constructor(public payload: {recordId: number}) {}
}

export class GetDataEventDetailSuccess implements Action {
  readonly type = EventDetailActionTypes.GET_DATA_SUCCESS;

  constructor(public payload: IEventDetailData[]) {}
}

export class GetEventDetailType implements Action {
  readonly type = EventDetailActionTypes.GET_EVENT_TYPE;
}

export class GetEventDetailTypeSuccess implements Action {
  readonly type = EventDetailActionTypes.GET_EVENT_TYPE_SUCCESS;

  constructor(public payload: IEventDetailType[]) {}
}

export class GetEventDetailFaculty implements Action {
  readonly type = EventDetailActionTypes.GET_EVENT_FACULTY;

  constructor(public payload: {recordId: number}) {}
}

export class GetEventDetailFacultySuccess implements Action {
  readonly type = EventDetailActionTypes.GET_EVENT_FACULTY_SUCCESS;

  constructor(public payload: IEventDetailFaculty[]) {}
}

export class ShowCloseEditorEvent implements Action {
  readonly type = EventDetailActionTypes.SHOW_CLOSE_EDITOR;
}

export class HideCloseEditorEvent implements Action {
  readonly type = EventDetailActionTypes.HIDE_CLOSE_EDITOR;
}

export class ShowNominationEditorEvent implements Action {
  readonly type = EventDetailActionTypes.SHOW_NOMINATION_EDITOR;
}

export class HideNominationEditorEvent implements Action {
  readonly type = EventDetailActionTypes.HIDE_NOMINATION_EDITOR;
}

export class GetEventParticipants implements Action {
  readonly type = EventDetailActionTypes.GET_PARTICIPANTS_DATA;
  constructor(public payload: {recordId: number}) {}
}

export class GetEventEmployee implements Action {
  readonly type = EventDetailActionTypes.GET_EMPLOYEE_DATA;
}

export class GetEventEmployeeSuccess implements Action {
  readonly type = EventDetailActionTypes.GET_EMPLOYEE_DATA_SUCCESS;
  constructor(public payload: IEventEmployee[]) {}

}

export class GetEventParticipantsSuccess implements Action {
  readonly type = EventDetailActionTypes.GET_PARTICIPANTS_DATA_SUCCESS;
  constructor(public payload: IEventAllParticiants[]) {}
}

export class CloseLearningEvent implements Action {
  readonly type = EventDetailActionTypes.CLOSE_EVENT;
  constructor(public payload: { data: any, event_id: number}) { }
}

export class NominationLearningEvent implements Action {
  readonly type = EventDetailActionTypes.NOMINATION_EVENT;
  constructor(public payload: { data: any , event_id: number}) { }
}

export type EventDetailActions =
  | ShowEditorEventDetail
  | HideEditorEventDetail
  | ShowViewerEventDetail
  | HideViewerEventDetail
  | ProcessingEventDetail
  | NotProcessingEventDetail
  | LoadDataEventDetail
  | LoadDataEventDetailSuccess
  | LoadDocumentEventDetail
  | LoadDocumentEventDetailSuccess
  | ClearDocumentEventDetail
  | LoadInlineDocumentEventDetail
  | SaveEventDetail
  | AddEventDetail
  | DeleteDataEventDetail
  | GetDataEventDetail
  | GetDataEventDetailSuccess
  | GetEventDetailType
  | GetEventDetailTypeSuccess
  | GetEventDetailFaculty
  | GetEventDetailFacultySuccess
  | PublishDataEventDetail
  | UnPublishDataEventDetail
  | RemoveDataEventDetail
  | ShowCloseEditorEvent
  | HideCloseEditorEvent
  | GetEventParticipants
  | GetEventParticipantsSuccess
  | GetEventEmployee
  | GetEventEmployeeSuccess
  | ShowNominationEditorEvent
  | HideNominationEditorEvent
  | NominationLearningEvent
  | CloseLearningEvent;
