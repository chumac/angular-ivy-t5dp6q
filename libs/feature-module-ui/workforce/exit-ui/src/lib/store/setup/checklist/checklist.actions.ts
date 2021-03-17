import { Action } from '@ngrx/store';
import {
  IReviewChecklist
} from 'libs/models/workforce/exit/src/lib/interfaces';
import { ISelectOption } from '@nutela/models/core-data';
import { IChecklistItem } from '../../../interfaces';

export enum ChecklistActionTypes {
  SHOW_EDITOR = '[HR EXIT - CHECKLIST SETUP] Show Editor',
  HIDE_EDITOR = '[HR EXIT - CHECKLIST SETUP] Hide Editor',

  SHOW_VIEWER = '[HR EXIT - CHECKLIST SETUP] Show Viewer',
  HIDE_VIEWER = '[HR EXIT - CHECKLIST SETUP] Hide Viewer',

  PROCESSING = '[HR EXIT - CHECKLIST SETUP] Processing',
  NOT_PROCESSING = '[HR EXIT - CHECKLIST SETUP] Not Processing',

  LOADING = '[HR EXIT - CHECKLIST SETUP] Loading',
  NOT_LOADING = '[HR EXIT - CHECKLIST SETUP] Not Loading',

  LOAD_CHECKLIST_DATA = '[HR EXIT - CHECKLIST SETUP] Load Checklist Data',
  LOAD_CHECKLIST_DATA_SUCCESS = '[HR EXIT - CHECKLIST SETUP] Load Checklist Data Success',

  LOAD_VALIDATION_ROLE_DATA = '[HR EXIT - CHECKLIST SETUP] Load Validation Role Data',
  LOAD_VALIDATION_ROLE_DATA_SUCCESS = '[HR EXIT - CHECKLIST SETUP] Load Validation Role Data Success',

  LOAD_WORKFLOW_DEFINITION_DATA = '[HR EXIT - CHECKLIST SETUP] Load Workflow Definition Data',
  LOAD_WORKFLOW_DEFINITION_DATA_SUCCESS = '[HR EXIT - CHECKLIST SETUP] Load Workflow Definition Data Success',

  LOAD_ROLES_SELECT_OPTION_DATA = '[HR EXIT - CHECKLIST SETUP] Load Roles Select Option Data',
  LOAD_ROLES_SELECT_OPTION_DATA_SUCCESS = '[HR EXIT - CHECKLIST SETUP] Load Roles Select Option Data Success',

  LOAD_POSITION_SELECT_OPTION_DATA = '[HR EXIT - CHECKLIST SETUP] Load Position Select Option Data',
  LOAD_POSITION_SELECT_OPTION_DATA_SUCCESS = '[HR EXIT - CHECKLIST SETUP] Load Position Select Option Data Success',

  SAVE = '[HR EXIT - CHECKLIST SETUP] Save',
  SAVE_UPDATE = '[HR EXIT - CHECKLIST SETUP] Save Update',
  ARCHIVE = '[HR EXIT - CHECKLIST SETUP] Archive',
}

export class ShowEditorChecklistSetup implements Action {
  readonly type = ChecklistActionTypes.SHOW_EDITOR;
}

export class HideEditorChecklistSetup implements Action {
  readonly type = ChecklistActionTypes.HIDE_EDITOR;
}

export class ShowViewerChecklistSetup implements Action {
  readonly type = ChecklistActionTypes.SHOW_VIEWER;
}

export class HideViewerChecklistSetup implements Action {
  readonly type = ChecklistActionTypes.HIDE_VIEWER;
}

export class ProcessingChecklistSetup implements Action {
  readonly type = ChecklistActionTypes.PROCESSING;
}

export class NotProcessingChecklistSetup implements Action {
  readonly type = ChecklistActionTypes.NOT_PROCESSING;
}

export class LoadingChecklistSetup implements Action {
  readonly type = ChecklistActionTypes.LOADING;
}

export class NotLoadingChecklistSetup implements Action {
  readonly type = ChecklistActionTypes.NOT_LOADING;
}

export class LoadDataChecklistSetup implements Action {
  readonly type = ChecklistActionTypes.LOAD_CHECKLIST_DATA;
}

export class LoadDataChecklistSetupSuccess implements Action {
  readonly type = ChecklistActionTypes.LOAD_CHECKLIST_DATA_SUCCESS;

  constructor(public payload: IChecklistItem[]) { }
}

export class LoadValidationRoleChecklistSetup implements Action {
  readonly type = ChecklistActionTypes.LOAD_VALIDATION_ROLE_DATA;
}

export class LoadValidationRoleChecklistSetupSuccess implements Action {
  readonly type = ChecklistActionTypes.LOAD_VALIDATION_ROLE_DATA_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadRoleSelectOption implements Action {
  readonly type = ChecklistActionTypes.LOAD_ROLES_SELECT_OPTION_DATA;
}

export class LoadRoleSelectOptionSuccess implements Action {
  readonly type = ChecklistActionTypes.LOAD_ROLES_SELECT_OPTION_DATA_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadWorkflowSelectOption implements Action {
  readonly type = ChecklistActionTypes.LOAD_WORKFLOW_DEFINITION_DATA;
}

export class LoadWorkflowSelectOptionSuccess implements Action {
  readonly type = ChecklistActionTypes.LOAD_WORKFLOW_DEFINITION_DATA_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadPositionSelectOption implements Action {
  readonly type = ChecklistActionTypes.LOAD_POSITION_SELECT_OPTION_DATA;
}

export class LoadPositionSelectOptionSuccess implements Action {
  readonly type = ChecklistActionTypes.LOAD_POSITION_SELECT_OPTION_DATA_SUCCESS;

  constructor(public payload: any[]) { }
}

export class SaveChecklistSetup implements Action {
  readonly type = ChecklistActionTypes.SAVE;

  constructor(public payload: { data: IReviewChecklist }) { }
}

export class SaveUpdateChecklistSetup implements Action {
  readonly type = ChecklistActionTypes.SAVE_UPDATE;

  constructor(public payload: { data: IReviewChecklist, recordId: number }) { }
}

export class ArchiveChecklistSetup implements Action {
  readonly type = ChecklistActionTypes.ARCHIVE;

  constructor(public payload: { recordId: number }) { }
}

export type ChecklistActions =
  | ShowEditorChecklistSetup
  | HideEditorChecklistSetup
  | ShowViewerChecklistSetup
  | HideViewerChecklistSetup
  | ProcessingChecklistSetup
  | NotProcessingChecklistSetup
  | LoadDataChecklistSetup
  | LoadDataChecklistSetupSuccess
  | LoadValidationRoleChecklistSetup
  | LoadValidationRoleChecklistSetupSuccess
  | LoadRoleSelectOption
  | LoadRoleSelectOptionSuccess
  | LoadWorkflowSelectOption
  | LoadWorkflowSelectOptionSuccess
  | LoadPositionSelectOption
  | LoadPositionSelectOptionSuccess
  | SaveChecklistSetup
  | ArchiveChecklistSetup
  | SaveUpdateChecklistSetup
