import { Action } from '@ngrx/store';
import { IFeedbackMetadata, IFeedbackObjectiveMaster, IFeedbackObjectiveDetail, IFeedbackRating, IReviewWorkflowProcess } from '@nutela/models/talent/performance';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export enum FeedbackFormActionTypes {
  PROCESSING = '[PERFORMANCE - FEEDBACK FORM] Processing',
  NOT_PROCESSING = '[PERFORMANCE - FEEDBACK FORM] Not Processing',

  LOADING_MASTERS = '[PERFORMANCE - FEEDBACK FORM] Loading Masters',
  LOADING_DETAILS = '[PERFORMANCE - FEEDBACK FORM] Loading Details',
  COMPLETING_MASTERS = '[PERFORMANCE - FEEDBACK FORM] Completing Masters',
  COMPLETING_DETAILS = '[PERFORMANCE - FEEDBACK FORM] Completing Details',
  SUBMITTING_OBJECTIVES = '[PERFORMANCE - FEEDBACK FORM] Submitting Objectives',
  LOADING_TEAM = '[PERFORMANCE - FEEDBACK FORM] Loading Team',


  SET_FEEDBACK_METADATA = '[PERFORMANCE - FEEDBACK FORM] Set Feedback Metadata',
  SET_FEEDBACK_METADATA_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Set Feedback Metadata Success',

  LOAD_FEEDBACK_RATINGS = '[PERFORMANCE - FEEDBACK FORM] Load Feedback Ratings',
  LOAD_FEEDBACK_RATINGS_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Load Feedback Ratings Success',

  LOAD_EMPLOYEE_CAN_PROVIDE_FEEDBACK = '[PERFORMANCE - FEEDBACK FORM] Load Employee Can Provide',
  LOAD_EMPLOYEE_CAN_PROVIDE_FEEDBACK_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Load Employee Can Provide Success',

  START_EMPLOYEE_FEEDBACK = '[PERFORMANCE - FEEDBACK FORM] Start Employee Feedback',
  START_EMPLOYEE_FEEDBACK_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Start Employee Feedback Success',

  LOAD_EMPLOYEE_FEEDBACK_OBJECTIVE_MASTERS = '[PERFORMANCE - FEEDBACK FORM] Load Employee Feedback Objectives Masters',
  LOAD_EMPLOYEE_FEEDBACK_OBJECTIVE_MASTERS_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Load Employee Feedback Objectives Masters Success',

  LOAD_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS = '[PERFORMANCE - FEEDBACK FORM] Load Employee Feedback Objective Details',
  LOAD_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Load Employee Feedback Objective Details Success',

  LOAD_LM_FEEDBACK_OBJECTIVE_MASTERS = '[PERFORMANCE - FEEDBACK FORM] Load Line Manager Feedback Objectives Masters',
  LOAD_LM_FEEDBACK_OBJECTIVE_MASTERS_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Load Line Manager Feedback Objectives Masters Success',

  LOAD_LM_FEEDBACK_OBJECTIVE_DETAILS = '[PERFORMANCE - FEEDBACK FORM] Load Line Manager Feedback Objective Details',
  LOAD_LM_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Load Line Manager Feedback Objective Details Success',

  LOAD_LM_FEEDBACK_OBJECTIVE_DETAILS_ALT = '[PERFORMANCE - FEEDBACK FORM] Load Line Manager Feedback Objective Details alt',
  LOAD_LM_FEEDBACK_OBJECTIVE_DETAILS_ALT_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Load Line Manager Feedback Objective Details alt Success',

  LOAD_HR_FEEDBACK_OBJECTIVE_MASTERS = '[PERFORMANCE - FEEDBACK FORM] Load HR Feedback Objectives Masters',
  LOAD_HR_FEEDBACK_OBJECTIVE_MASTERS_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Load HR Feedback Objectives Masters Success',

  LOAD_HR_FEEDBACK_OBJECTIVE_DETAILS = '[PERFORMANCE - FEEDBACK FORM] Load HR Feedback Objective Details',
  LOAD_HR_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Load HR Feedback Objective Details Success',

  LOAD_HR_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS = '[PERFORMANCE - FEEDBACK FORM] Load HR Employee Feedback Objective Details',
  LOAD_HR_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Load HR Employee Feedback Objective Details Success',
  
  LOAD_HR_LM_FEEDBACK_OBJECTIVE_DETAILS = '[PERFORMANCE - FEEDBACK FORM] Load HR LM Feedback Objective Details',
  LOAD_HR_LM_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Load HR LM Feedback Objective Details Success',

  LOAD_LM_FEEDBACK_TEAM_COUNT = '[PERFORMANCE - FEEDBACK FORM] Load LM Feedback Team Count',
  LOAD_LM_FEEDBACK_TEAM_COUNT_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Load LM Feedback Team Count Success',

  LOAD_LM_FEEDBACK_TEAM = '[PERFORMANCE - FEEDBACK FORM] Load LM Feedback Team',
  LOAD_LM_FEEDBACK_TEAM_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Load LM Feedback Team Success',

  LOAD_HR_FEEDBACK_TEAM = '[PERFORMANCE - FEEDBACK FORM] Load HR Feedback Team',
  LOAD_HR_FEEDBACK_TEAM_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Load HR Feedback Team Success',


  LOAD_EMPLOYEE_INFO = '[PERFORMANCE - FEEDBACK FORM] Load Employee Info',
  LOAD_EMPLOYEE_INFO_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Load Employee Info Success',

  SAVE_EMPLOYEE_FEEDBACK_OBJECTIVE_MASTERS = '[PERFORMANCE - FEEDBACK FORM] Save Employee Feedback Objectives Masters',
  SAVE_EMPLOYEE_FEEDBACK_OBJECTIVE_MASTERS_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Save Employee Feedback Objectives Masters Success',

  SAVE_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS = '[PERFORMANCE - FEEDBACK FORM] Save Employee Feedback Objective Details',
  SAVE_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Save Employee Feedback Objective Details Success',

  SUBMIT_EMPLOYEE_FEEDBACK_OBJECTIVE = '[PERFORMANCE - FEEDBACK FORM] Submit Employee Feedback Objectives',
  SUBMIT_EMPLOYEE_FEEDBACK_OBJECTIVE_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Submit Employee Feedback Objectives Success',

  
  SAVE_LM_FEEDBACK_OBJECTIVE_MASTERS = '[PERFORMANCE - FEEDBACK FORM] Save LM Feedback Objectives Masters',
  SAVE_LM_FEEDBACK_OBJECTIVE_MASTERS_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Save LM Feedback Objectives Masters Success',

  SAVE_LM_FEEDBACK_OBJECTIVE_DETAILS = '[PERFORMANCE - FEEDBACK FORM] Save LM Feedback Objective Details',
  SAVE_LM_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Save LM Feedback Objective Details Success',

  SUBMIT_LM_FEEDBACK_OBJECTIVE = '[PERFORMANCE - FEEDBACK FORM] Submit LM Feedback Objectives',
  SUBMIT_LM_FEEDBACK_OBJECTIVE_SUCCESS = '[PERFORMANCE - FEEDBACK FORM] Submit LM Feedback Objectives Success',

  HR_INITIATE_FEEDBACK_FORM = '[PERFORMANCE - FEEDBACK FORM] Initiate Feedback form',

  CLOSE_SINGLE_HR_FEEDBACK_OBJECTIVE = '[PERFORMANCE - FEEDBACK FORM] Close Single HR Feedback form',
  CLOSE_MULTIPLE_HR_FEEDBACK_OBJECTIVE = '[PERFORMANCE - FEEDBACK FORM] Close Multiple HR Feedback form',


}

export class ProcessingFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.PROCESSING;
}

export class NotProcessingFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.NOT_PROCESSING;
}

export class SetMetadataFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.SET_FEEDBACK_METADATA;

  constructor(public payload: IFeedbackMetadata) {}
}

export class SetMetadataFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.SET_FEEDBACK_METADATA_SUCCESS;

  constructor(public payload: IFeedbackMetadata) {}
}

export class LoadRatingsFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_FEEDBACK_RATINGS;
}

export class LoadRatingsFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_FEEDBACK_RATINGS_SUCCESS;

  constructor(public payload: ISelectOption[]) {}
}


// Employee Actions


export class LoadEmployeeCanProvideFeedback implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_EMPLOYEE_CAN_PROVIDE_FEEDBACK;
}

export class LoadEmployeeCanProvideFeedbackSuccess implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_EMPLOYEE_CAN_PROVIDE_FEEDBACK_SUCCESS;

  constructor(public payload: boolean) {}
}

export class StartEmployeeObjectiveFeedback implements Action {
  readonly type = FeedbackFormActionTypes.START_EMPLOYEE_FEEDBACK;
  constructor(public payload: number) {}

}

export class StartEmployeeObjectiveFeedbackSuccess implements Action {
  readonly type = FeedbackFormActionTypes.START_EMPLOYEE_FEEDBACK_SUCCESS;

  constructor(public payload: boolean) {}
}




export class LoadEmployeeObjectiveMastersFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_EMPLOYEE_FEEDBACK_OBJECTIVE_MASTERS;
}

export class LoadEmployeeObjectiveMastersFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_EMPLOYEE_FEEDBACK_OBJECTIVE_MASTERS_SUCCESS;

  constructor(public payload: IFeedbackObjectiveMaster[]) {}
}

export class LoadEmployeeObjectiveDetailsFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS;
}

export class LoadEmployeeObjectiveDetailsFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS;

  constructor(public payload: IFeedbackObjectiveDetail[]) {}
}

export class SaveEmployeeObjectiveMastersFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.SAVE_EMPLOYEE_FEEDBACK_OBJECTIVE_MASTERS;

  constructor(public payload: { values: IFeedbackObjectiveMaster[], planId: number }) {}
}

export class SaveEmployeeObjectiveMastersFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.SAVE_EMPLOYEE_FEEDBACK_OBJECTIVE_MASTERS_SUCCESS;

  constructor(public payload: IFeedbackObjectiveMaster[]) {}
}

export class SaveEmployeeObjectiveDetailsFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.SAVE_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS;

  constructor(public payload: { values: IFeedbackObjectiveDetail[]}) {}
}

export class SaveEmployeeObjectiveDetailsFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.SAVE_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS;

  constructor(public payload: IFeedbackObjectiveDetail[]) {}
}

export class SubmitEmployeeObjectiveFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.SUBMIT_EMPLOYEE_FEEDBACK_OBJECTIVE;
  constructor(public payload: number) {}

}

export class SubmitEmployeeObjectiveFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.SUBMIT_EMPLOYEE_FEEDBACK_OBJECTIVE_SUCCESS;

  constructor(public payload: any[]) {}
}


// Line Manager Actions
export class LoadLMTeamCountFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_LM_FEEDBACK_TEAM_COUNT;
  constructor(public payload: number) {}
}

export class LoadLMTeamCountFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_LM_FEEDBACK_TEAM_COUNT_SUCCESS;

  constructor(public payload: number) {}
}

export class LoadLMTeamFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_LM_FEEDBACK_TEAM;
  constructor(public payload: number) {}

}

export class LoadLMTeamFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_LM_FEEDBACK_TEAM_SUCCESS;

  constructor(public payload: IPersonal[]) {}
}

export class LoadLMObjectiveMastersFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_LM_FEEDBACK_OBJECTIVE_MASTERS;
  constructor(public payload: number) {}

}

export class LoadLMObjectiveMastersFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_LM_FEEDBACK_OBJECTIVE_MASTERS_SUCCESS;

  constructor(public payload: IFeedbackObjectiveMaster[]) {}
}

export class LoadLMObjectiveDetailsFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_LM_FEEDBACK_OBJECTIVE_DETAILS;
  constructor(public payload: number) {}

}

export class LoadLMObjectiveDetailsFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_LM_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS;

  constructor(public payload: IFeedbackObjectiveDetail[]) {}
}

export class LoadLMObjectiveDetailsAltFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_LM_FEEDBACK_OBJECTIVE_DETAILS_ALT;
  constructor(public payload: number) {}

}

export class LoadLMObjectiveDetailsAltFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_LM_FEEDBACK_OBJECTIVE_DETAILS_ALT_SUCCESS;

  constructor(public payload: IFeedbackObjectiveDetail[]) {}
}

export class SaveLMObjectiveMastersFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.SAVE_LM_FEEDBACK_OBJECTIVE_MASTERS;

  constructor(public payload: { values: IFeedbackObjectiveMaster[], planId: number, employeeId: number }) {}
}

export class SaveLMObjectiveMastersFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.SAVE_LM_FEEDBACK_OBJECTIVE_MASTERS_SUCCESS;

  constructor(public payload: IFeedbackObjectiveMaster[]) {}
}

export class SaveLMObjectiveDetailsFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.SAVE_LM_FEEDBACK_OBJECTIVE_DETAILS;

  constructor(public payload: { values: IFeedbackObjectiveDetail[], objectiveDetailsId: number, employeeId:number }) {}
}

export class SaveLMObjectiveDetailsFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.SAVE_LM_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS;

  constructor(public payload: IFeedbackObjectiveDetail[]) {}
}

export class SubmitLMObjectiveFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.SUBMIT_LM_FEEDBACK_OBJECTIVE;
  constructor(public payload: {planId: number, employeeId: number}) {}

}

export class SubmitLMObjectiveFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.SUBMIT_LM_FEEDBACK_OBJECTIVE_SUCCESS;

  constructor(public payload: any[]) {}
}


// HR Actions


export class HRInitiateFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.HR_INITIATE_FEEDBACK_FORM;

  constructor(public payload: {planId: number}) {}
}

export class LoadHRTeamFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_HR_FEEDBACK_TEAM;
  constructor(public payload: number) {}

}

export class LoadHRTeamFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_HR_FEEDBACK_TEAM_SUCCESS;

  constructor(public payload: IReviewWorkflowProcess[]) {}
}

export class LoadHRObjectiveMastersFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_HR_FEEDBACK_OBJECTIVE_MASTERS;
  constructor(public payload: number) {}

}

export class LoadHRObjectiveMastersFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_HR_FEEDBACK_OBJECTIVE_MASTERS_SUCCESS;

  constructor(public payload: IFeedbackObjectiveMaster[]) {}
}

export class LoadHRObjectiveDetailsFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_HR_FEEDBACK_OBJECTIVE_DETAILS;
  constructor(public payload: number) {}

}

export class LoadHRObjectiveDetailsFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_HR_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS;

  constructor(public payload: IFeedbackObjectiveDetail[]) {}
}

export class LoadHREmployeeObjectiveDetailsFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_HR_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS;

  constructor(public payload: number) {}
}

export class LoadHREmployeeObjectiveDetailsFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_HR_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS;

  constructor(public payload: IFeedbackObjectiveDetail[]) {}
}

export class LoadHRLineManagerObjectiveDetailsFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_HR_LM_FEEDBACK_OBJECTIVE_DETAILS;

  constructor(public payload: number) {}
}

export class LoadHRLineManagerObjectiveDetailsFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_HR_LM_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS;

  constructor(public payload: IFeedbackObjectiveDetail[]) {}
}

export class HRCloseSingleFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.CLOSE_SINGLE_HR_FEEDBACK_OBJECTIVE;

  constructor(public payload: {planId: number, employeeId: number}) {}
}

export class HRCloseMultipleFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.CLOSE_MULTIPLE_HR_FEEDBACK_OBJECTIVE;

  constructor(public payload: {planId: number, employeeIds: any[]}) {}
}





// General Actions

export class isLoadingMastersFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOADING_MASTERS;

  constructor(public payload: boolean) {}
}

export class isLoadingDetailsFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOADING_DETAILS;

  constructor(public payload: boolean) {}
}

export class isCompletingMastersFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.COMPLETING_MASTERS;

  constructor(public payload: boolean) {}
}

export class isCompletingDetailsFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.COMPLETING_DETAILS;

  constructor(public payload: boolean) {}
}

export class isSubmittingFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.SUBMITTING_OBJECTIVES;

  constructor(public payload: boolean) {}
}

export class isLoadingTeamFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOADING_TEAM;

  constructor(public payload: boolean) {}
}



export class LoadEmployeeInfoFeedbackForm implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_EMPLOYEE_INFO;
}

export class LoadEmployeeInfoFeedbackFormSuccess implements Action {
  readonly type = FeedbackFormActionTypes.LOAD_EMPLOYEE_INFO_SUCCESS;

  constructor(public payload: IPersonal) {}
}

export type FeedbackFormActions =
  | ProcessingFeedbackForm
  | NotProcessingFeedbackForm
  | isLoadingMastersFeedbackForm
  | isLoadingDetailsFeedbackForm
  | isSubmittingFeedbackForm
  | isLoadingTeamFeedbackForm
  | isCompletingMastersFeedbackForm
  | isCompletingDetailsFeedbackForm
  | LoadRatingsFeedbackForm
  | LoadRatingsFeedbackFormSuccess
  | SetMetadataFeedbackForm
  | SetMetadataFeedbackFormSuccess
  | LoadEmployeeObjectiveMastersFeedbackForm
  | LoadEmployeeObjectiveMastersFeedbackFormSuccess
  | LoadEmployeeInfoFeedbackForm
  | LoadEmployeeInfoFeedbackFormSuccess
  | LoadEmployeeObjectiveDetailsFeedbackForm
  | LoadEmployeeObjectiveDetailsFeedbackFormSuccess
  | SaveEmployeeObjectiveMastersFeedbackForm
  | SaveEmployeeObjectiveMastersFeedbackFormSuccess
  | SaveEmployeeObjectiveDetailsFeedbackForm
  | SaveEmployeeObjectiveDetailsFeedbackFormSuccess
  | SubmitEmployeeObjectiveFeedbackForm
  | SubmitEmployeeObjectiveFeedbackFormSuccess
  | LoadLMTeamFeedbackForm
  | LoadLMTeamFeedbackFormSuccess
  | LoadLMObjectiveMastersFeedbackForm
  | LoadLMObjectiveMastersFeedbackFormSuccess
  | LoadLMObjectiveDetailsFeedbackForm
  | LoadLMObjectiveDetailsFeedbackFormSuccess
  | LoadLMObjectiveDetailsAltFeedbackForm
  | LoadLMObjectiveDetailsAltFeedbackFormSuccess
  | SaveLMObjectiveMastersFeedbackForm
  | SaveLMObjectiveMastersFeedbackFormSuccess
  | SaveLMObjectiveDetailsFeedbackForm
  | SaveLMObjectiveDetailsFeedbackFormSuccess
  | SubmitLMObjectiveFeedbackForm
  | SubmitLMObjectiveFeedbackFormSuccess
  | LoadLMTeamCountFeedbackForm
  | LoadLMTeamCountFeedbackFormSuccess
  | LoadEmployeeCanProvideFeedback
  | LoadEmployeeCanProvideFeedbackSuccess
  | StartEmployeeObjectiveFeedback
  | StartEmployeeObjectiveFeedbackSuccess
  | HRInitiateFeedbackForm
  | LoadHRTeamFeedbackForm
  | LoadHRTeamFeedbackFormSuccess
  | LoadHRObjectiveMastersFeedbackForm
  | LoadHRObjectiveMastersFeedbackFormSuccess
  | LoadHRObjectiveDetailsFeedbackForm
  | LoadHRObjectiveDetailsFeedbackFormSuccess
  | LoadHREmployeeObjectiveDetailsFeedbackForm
  | LoadHREmployeeObjectiveDetailsFeedbackFormSuccess
  | LoadHRLineManagerObjectiveDetailsFeedbackForm
  | LoadHRLineManagerObjectiveDetailsFeedbackFormSuccess
  | HRCloseSingleFeedbackForm
  | HRCloseMultipleFeedbackForm;
