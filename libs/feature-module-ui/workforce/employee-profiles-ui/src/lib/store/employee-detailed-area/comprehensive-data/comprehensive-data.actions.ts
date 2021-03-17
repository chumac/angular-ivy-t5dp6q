import { Action } from '@ngrx/store';

import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';

export enum ComprehensiveDataActionTypes {
  HR_LOAD = '[COMPREHENSIVE DATA (HR)] Load',
  HR_LOAD_SUCCESS = '[COMPREHENSIVE DATA (HR)] Load Success',

  HR_RESET_DATA = '[COMPREHENSIVE DATA (HR)] Reset Data'
}

export class LoadComprehensiveData implements Action {
  readonly type = ComprehensiveDataActionTypes.HR_LOAD;

  constructor(public payload: { employeeId: number }) {}
}

export class LoadComprehensiveDataSuccess implements Action {
  readonly type = ComprehensiveDataActionTypes.HR_LOAD_SUCCESS;

  constructor(public payload: IComprehensiveData) {}
}

export class ResetComprehensiveData implements Action {
  readonly type = ComprehensiveDataActionTypes.HR_RESET_DATA;
}

export type ComprehensiveDataActions =
  | LoadComprehensiveData
  | LoadComprehensiveDataSuccess
  | ResetComprehensiveData;
