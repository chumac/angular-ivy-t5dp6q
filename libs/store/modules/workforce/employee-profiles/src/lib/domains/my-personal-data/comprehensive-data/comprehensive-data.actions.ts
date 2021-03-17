import { Action } from '@ngrx/store';

import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';

export enum ComprehensiveDataActionTypes {
  LOAD54 = '[COMPREHENSIVE DATA] Load',
  LOAD_SUCCESS = '[COMPREHENSIVE DATA] Load Success',
  LOAD_FAILURE = '[COMPREHENSIVE DATA] Load Failure'
}

export class ComprehensiveDataLoad implements Action {
  readonly type = ComprehensiveDataActionTypes.LOAD54;

  constructor() {}
}

export class ComprehensiveDataLoadSuccess implements Action {
  readonly type = ComprehensiveDataActionTypes.LOAD_SUCCESS;

  constructor(public payload: IComprehensiveData) {}
}

export class ComprehensiveDataLoadFailure implements Action {
  readonly type = ComprehensiveDataActionTypes.LOAD_FAILURE;

  constructor(public error: any) {}
}

export type ComprehensiveDataActions =
  | ComprehensiveDataLoad
  | ComprehensiveDataLoadSuccess
  | ComprehensiveDataLoadFailure;
