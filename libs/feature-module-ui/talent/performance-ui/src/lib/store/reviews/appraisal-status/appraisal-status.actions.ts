import { Action } from '@ngrx/store';
import { IAppraisalStatus } from '@nutela/models/talent/performance';

export enum AppraisalStatusActionTypes {
  PROCESSING = '[PERFORMANCE - APPRAISAL_STATUS] Processing',
  NOT_PROCESSING = '[PERFORMANCE - APPRAISAL_STATUS] Not Processing',

  LOAD_APPRAISAL_STATUS = '[PERFORMANCE - APPRAISAL_STATUS] Load Appraisal Status',
  LOAD_APPRAISAL_STATUS_SUCCESS = '[PERFORMANCE - APPRAISAL_STATUS] Load Appraisal Status Success',
  CLEAR_APPRAISAL_STATUS = '[PERFORMANCE - APPRAISAL_STATUS] Clear Appraisal Status'
}

export class ProcessingAppraisalStatus implements Action {
  readonly type = AppraisalStatusActionTypes.PROCESSING;
}

export class NotProcessingAppraisalStatus implements Action {
  readonly type = AppraisalStatusActionTypes.NOT_PROCESSING;
}

export class LoadDataAppraisalStatus implements Action {
  readonly type = AppraisalStatusActionTypes.LOAD_APPRAISAL_STATUS;

  constructor(public payload: number) {}
}

export class LoadDataAppraisalStatusSuccess implements Action {
  readonly type = AppraisalStatusActionTypes.LOAD_APPRAISAL_STATUS_SUCCESS;

  constructor(public payload: IAppraisalStatus[]) {}
}

export class ClearDataAppraisalStatus implements Action {
  readonly type = AppraisalStatusActionTypes.CLEAR_APPRAISAL_STATUS;
}

export type AppraisalStatusActions = ProcessingAppraisalStatus 
                                    | NotProcessingAppraisalStatus 
                                    | LoadDataAppraisalStatus 
                                    | LoadDataAppraisalStatusSuccess 
                                    | ClearDataAppraisalStatus;
