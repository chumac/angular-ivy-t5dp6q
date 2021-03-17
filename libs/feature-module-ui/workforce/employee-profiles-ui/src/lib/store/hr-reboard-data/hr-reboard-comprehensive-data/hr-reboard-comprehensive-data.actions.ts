import { Action } from '@ngrx/store';

import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';

export enum HrReboardComprehensiveDataActionTypes {
  LOAD_DATA = '[HR_REBOARD_DATA - COMPREHENSIVE DATA] Load Data',
  LOAD_DATA_SUCCESS = '[HR_REBOARD_DATA - COMPREHENSIVE DATA] Load Data Success',

  RESET_DATA = '[HR_REBOARD_DATA - COMPREHENSIVE DATA] Reset Data'
}


export class LoadHrReboardComprehensiveData implements Action {
  readonly type = HrReboardComprehensiveDataActionTypes.LOAD_DATA;

  constructor(public payload: { employeeId: number }) { }
}

export class LoadHrReboardComprehensiveDataSuccess implements Action {
  readonly type = HrReboardComprehensiveDataActionTypes.LOAD_DATA_SUCCESS;

  constructor(public payload: IComprehensiveData) {}
}

export class ResetHrReboardComprehensiveData implements Action {
  readonly type = HrReboardComprehensiveDataActionTypes.RESET_DATA;
}

export type HrReboardComprehensiveDataActions =
  | LoadHrReboardComprehensiveData
  | LoadHrReboardComprehensiveDataSuccess
  | ResetHrReboardComprehensiveData;
