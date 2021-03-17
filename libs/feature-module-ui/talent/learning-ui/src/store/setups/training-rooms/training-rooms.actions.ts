import { Action } from '@ngrx/store';
import { ITrainingRooms } from '@nutela/models/talent/learning';

export enum TrainingRoomsActionTypes {
  SHOW_EDITOR = '[LEARNING SETUPS TRAINING ROOMS] Show Editor',
  HIDE_EDITOR = '[LEARNING SETUPS TRAINING ROOMS] Hide Editor',

  SHOW_VIEWER = '[LEARNING SETUPS TRAINING ROOMS] Show Viewer',
  HIDE_VIEWER = '[LEARNING SETUPS TRAINING ROOMS] Hide Viewer',

  PROCESSING = '[LEARNING SETUPS TRAINING ROOMS] Processing',
  NOT_PROCESSING = '[LEARNING SETUPS TRAINING ROOMS] Not Processing',

  LOAD_DATA = '[LEARNING SETUPS TRAINING ROOMS] Load Data',
  LOAD_DATA_SUCCESS = '[LEARNING SETUPS TRAINING ROOMS] Load Data Success',

  LOAD_DOCUMENT = '[LEARNING SETUPS TRAINING ROOMS] Load Document',
  LOAD_DOCUMENT_SUCCESS = '[LEARNING SETUPS TRAINING ROOMS] Load Document Success',
  CLEAR_DOCUMENT = '[LEARNING SETUPS TRAINING ROOMS] Clear Document',

  LOAD_INLINE_DOCUMENT = '[LEARNING SETUPS TRAINING ROOMS] Load Inline Document',

  SAVE = '[LEARNING SETUPS TRAINING ROOMS] Save',
  SAVE_SUCCESS = '[LEARNING SETUPS TRAINING ROOMS] Save Success',

  ADD = '[LEARNING SETUPS TRAINING ROOMS] Add',
  ADD_SUCCESS = '[LEARNING SETUPS TRAINING ROOMS] Add Success',

  DELETE_DATA = '[LEARNING SETUPS TRAINING ROOMS] Delete Data',

  REMOVE_DATA = '[LEARNING SETUPS TRAINING ROOMS] Remove Data',

}

export class ShowEditorTrainingRooms implements Action {
  readonly type = TrainingRoomsActionTypes.SHOW_EDITOR;
}

export class HideEditorTrainingRooms implements Action {
  readonly type = TrainingRoomsActionTypes.HIDE_EDITOR;
}


export class ShowViewerTrainingRooms implements Action {
  readonly type = TrainingRoomsActionTypes.SHOW_VIEWER;
}

export class HideViewerTrainingRooms implements Action {
  readonly type = TrainingRoomsActionTypes.HIDE_VIEWER;
}


export class ProcessingTrainingRooms implements Action {
  readonly type = TrainingRoomsActionTypes.PROCESSING;
}

export class NotProcessingTrainingRooms implements Action {
  readonly type = TrainingRoomsActionTypes.NOT_PROCESSING;
}


export class LoadDataTrainingRooms implements Action {
  readonly type = TrainingRoomsActionTypes.LOAD_DATA;
}

export class LoadDataTrainingRoomsSuccess implements Action {
  readonly type = TrainingRoomsActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: ITrainingRooms[]) {}
}


export class LoadDocumentTrainingRooms implements Action {
  readonly type = TrainingRoomsActionTypes.LOAD_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}

export class LoadDocumentTrainingRoomsSuccess implements Action {
  readonly type = TrainingRoomsActionTypes.LOAD_DOCUMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ClearDocumentTrainingRooms implements Action {
  readonly type = TrainingRoomsActionTypes.CLEAR_DOCUMENT;
}

export class LoadInlineDocumentTrainingRooms implements Action {
  readonly type = TrainingRoomsActionTypes.LOAD_INLINE_DOCUMENT;

  constructor(public payload: {recordId: number, isApproved: boolean}) {}
}


export class SaveTrainingRooms implements Action {
  readonly type = TrainingRoomsActionTypes.SAVE;

  constructor(public payload: {data: ITrainingRooms, recordId: number, editMode: boolean}) {}
}

export class AddTrainingRooms implements Action {
  readonly type = TrainingRoomsActionTypes.ADD;

  constructor(public payload: {data: ITrainingRooms}) {}
}


export class DeleteDataTrainingRooms implements Action {
  readonly type = TrainingRoomsActionTypes.DELETE_DATA;

  constructor(public payload: {recordId: number}) {}
}


export class RemoveDataTrainingRooms implements Action {
  readonly type = TrainingRoomsActionTypes.REMOVE_DATA;

  constructor(public payload: {recordId: number}) {}
}

export type TrainingRoomsActions =
  | ShowEditorTrainingRooms
  | HideEditorTrainingRooms
  | ShowViewerTrainingRooms
  | HideViewerTrainingRooms
  | ProcessingTrainingRooms
  | NotProcessingTrainingRooms
  | LoadDataTrainingRooms
  | LoadDataTrainingRoomsSuccess
  | LoadDocumentTrainingRooms
  | LoadDocumentTrainingRoomsSuccess
  | ClearDocumentTrainingRooms
  | LoadInlineDocumentTrainingRooms
  | SaveTrainingRooms
  | AddTrainingRooms
  | DeleteDataTrainingRooms
  | RemoveDataTrainingRooms;
