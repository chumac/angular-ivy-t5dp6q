import { Action } from '@ngrx/store';
import { IFormula } from '@nutela/models/compensation/payroll';
import { ISelectOption } from '@nutela/models/core-data';



export enum FormulaActionTypes {

  SHOW_EDITOR = '[ FORMULA ] Show Editor',
  HIDE_EDITOR = '[FORMULA ] Hide Editor',

  PROCESSING = '[ FORMULA ] Processing',
  NOT_PROCESSING = '[ FORMULA ] Not Processing',

  LOADING = '[ FORMULA ] LOADING',
  NOT_LOADING = '[ FORMULA ] Not LOADING',

  LOAD_FORMULA_DATA = '[ FORMULA ] Load Formula Data',
  LOAD_FORMULA_DATA_SUCCESS = '[ FORMULA ] Load Formula Data Success',

  LOAD_FILTERED_FORMULA_DATA = '[ FORMULA ] Load Filtered Formula Data',

  LOAD_ROLE_DATA = '[ FORMULA ] Load Role Data',
  LOAD_ROLE_DATA_SUCCESS = '[ FORMULA ] Load Role Data Success',

  SAVE = '[FORMULA ] Save',
  SAVE_SUCCESS = '[ FORMULA ] Save Success',

  UPDATE = '[UPDATE FORMULA ] Update Formula',
  UPDATE_SUCCESS = '[UPDATE FORMULA ] Update Formula Success',

  DELETE_FORMULA_DATA = '[FORMULA ] Delete Formula Data',

  HAS_FORMULA_ADMIN_ROLE = '[FORMULA ] Has Formula Admin Role',
}


export class ShowEditorFormula implements Action {
  readonly type = FormulaActionTypes.SHOW_EDITOR;
}

export class HideEditorFormula implements Action {
  readonly type = FormulaActionTypes.HIDE_EDITOR;
}

export class ProcessingFormula implements Action {
  readonly type = FormulaActionTypes.PROCESSING;
}

export class NotProcessingFormula implements Action {
  readonly type = FormulaActionTypes.NOT_PROCESSING;
}

export class LoadingFormula implements Action {
  readonly type = FormulaActionTypes.LOADING;
}

export class NotLoadingFormula implements Action {
  readonly type = FormulaActionTypes.NOT_LOADING;
}


export class LoadFormulaData implements Action {
  readonly type = FormulaActionTypes.LOAD_FORMULA_DATA;
}

export class LoadFormulaSuccess implements Action {
  readonly type = FormulaActionTypes.LOAD_FORMULA_DATA_SUCCESS;
  constructor(public payload: IFormula[]) { }
}

export class LoadFilteredFormula implements Action {
  readonly type = FormulaActionTypes.LOAD_FILTERED_FORMULA_DATA;
  constructor(public payload: {payrollProfileId: any}) { }
}

export class LoadRoleData implements Action {
  readonly type = FormulaActionTypes.LOAD_ROLE_DATA;
}

export class LoadRoleDataSuccess implements Action {
  readonly type = FormulaActionTypes.LOAD_ROLE_DATA_SUCCESS;
  constructor(public payload: any[]) { }
}

export class SaveFormula implements Action {
  readonly type = FormulaActionTypes.SAVE;
  constructor(public payload: { data: IFormula }) { }
}

export class UpdateFormula implements Action {
  readonly type = FormulaActionTypes.UPDATE;
  constructor(public payload: { data: IFormula, recordId: number }) { }
}

export class DeleteDataFormula implements Action {
  readonly type = FormulaActionTypes.DELETE_FORMULA_DATA;
  constructor(public payload: { recordId: number, payrollProfile: number }) { }
}

export class HasFormulaAdminRole implements Action {
  readonly type = FormulaActionTypes.HAS_FORMULA_ADMIN_ROLE;
  constructor(public payload: boolean) { }
}

export type FormulaActions =
  | ShowEditorFormula
  | HideEditorFormula
  | ProcessingFormula
  | NotProcessingFormula
  | LoadingFormula
  | NotLoadingFormula
  | LoadFormulaData
  | LoadFormulaSuccess
  | LoadFilteredFormula
  | LoadRoleData
  | LoadRoleDataSuccess
  | SaveFormula
  | UpdateFormula
  | HasFormulaAdminRole
  | DeleteDataFormula;
