import { Action } from '@ngrx/store';
import { IBusinessOption } from '@nutela/models/core-data';

export enum BusinessOptionDataActionTypes {
  LOAD = '[BUSINESS OPTION DATA] Load',
  LOAD_SUCCESS = '[BUSINESS OPTION DATA] Load Success',
  LOAD_FAILURE = '[BUSINESS OPTION DATA] Load Failure',
}

export class BusinessOptionDataLoad implements Action {
  readonly type = BusinessOptionDataActionTypes.LOAD;
}

export class BusinessOptionDataLoadSuccess implements Action {
  readonly type = BusinessOptionDataActionTypes.LOAD_SUCCESS;

  constructor(public payload: { options: IBusinessOption[] }) {}
}

export class BusinessOptionDataLoadFailure implements Action {
  readonly type = BusinessOptionDataActionTypes.LOAD_FAILURE;

  constructor(public error: any) {}
}

export type BusinessOptionDataActions =
  | BusinessOptionDataLoad
  | BusinessOptionDataLoadSuccess;
