import { Action } from '@ngrx/store';

import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';

export enum ReboardComprehensiveDataActionTypes {
  LOAD_DATA = '[MY_REBOARDING_DATA - COMPREHENSIVE DATA] Load Data',
  LOAD_DATA_SUCCESS = '[MY_REBOARDING_DATA - COMPREHENSIVE DATA] Load Data Success',

  RESET_DATA = '[MY_REBOARDING_DATA - COMPREHENSIVE DATA] Reset Data'
}

export class LoadReboardComprehensiveData implements Action {
  readonly type = ReboardComprehensiveDataActionTypes.LOAD_DATA;

  constructor() {}
}

export class LoadReboardComprehensiveDataSuccess implements Action {
  readonly type = ReboardComprehensiveDataActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IComprehensiveData) {}
}

export class ResetReboardComprehensiveData implements Action {
  readonly type = ReboardComprehensiveDataActionTypes.RESET_DATA;
}

export type ReboardComprehensiveDataActions =
  | LoadReboardComprehensiveData
  | LoadReboardComprehensiveDataSuccess
  | ResetReboardComprehensiveData;
