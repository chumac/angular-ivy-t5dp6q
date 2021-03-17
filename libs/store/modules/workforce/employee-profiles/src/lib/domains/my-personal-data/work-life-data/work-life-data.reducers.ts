import { adapter } from './work-life-data.adapter';
import {
  WorkLifeDataActionTypes,
  WorkLifeDataActions,
  WorkLifeDataLoadSuccess,
  WorkLifeDataLoadWorkflowMessagesSuccess,
  WorkLifeDataLoadWorkflowSubmissionsSuccess
} from './work-life-data.actions';
import {
  initialWorkLifeDataState,
  IWorkLifeDataState
} from './work-life-data.state';

export function workLifeDataReducer(
  state = initialWorkLifeDataState,
  action: WorkLifeDataActions
): IWorkLifeDataState {
  switch (action.type) {
    case WorkLifeDataActionTypes.LOAD_SUCCESS:
      const newState = updateState(state, <WorkLifeDataLoadSuccess>action);
      return newState;
    case WorkLifeDataActionTypes.LOAD_FAILURE:
      return state;
    case WorkLifeDataActionTypes.LOAD_WORKFLOW_MESSAGES_SUCCESS:
      const wrkMsgState = updateWorkflowMessageState(state, <WorkLifeDataLoadWorkflowMessagesSuccess>action);
      return wrkMsgState;
    case WorkLifeDataActionTypes.LOAD_WORKFLOW_SUBMISSIONS_SUCCESS:
      const wrkSubState = updateWorkflowSubmissionState(state, <WorkLifeDataLoadWorkflowSubmissionsSuccess>action);
      return wrkSubState;

    case WorkLifeDataActionTypes.LOADING:
      return { ...state, isLoading: true };
    case WorkLifeDataActionTypes.NOT_LOADING:
      return { ...state, isLoading: false };

    case WorkLifeDataActionTypes.LOAD_SECURITY_ROLES_SUCCESS:
      return { ...state, SecurityRoles: action.payload };

    case WorkLifeDataActionTypes.LOAD_ANALYSIS_DETAIL_SUCCESS:
      return { ...state, analysisDetail: action.payload };


    case WorkLifeDataActionTypes.LOAD_QUEUE_ID:
      return { ...state, queueId: action.payload };

    case WorkLifeDataActionTypes.HAS_AGREED_TO_POLICY:
      return { ...state, hasAgreed: action.payload };

    default: {
      return state;
    }
  }
}

function updateState(
  state: IWorkLifeDataState,
  action: WorkLifeDataLoadSuccess
): IWorkLifeDataState {
  const data = action.payload;

  const newState = Object.assign({}, state);
  newState.ComprehensiveInfo = data.ComprehensiveInfo;
  newState.EducationalHistories = data.EducationalHistories || [];
  newState.PersonalReferees = data.PersonalReferees || [];
  newState.PreviousEmployers = data.PreviousEmployers || [];
  newState.Guarantors = data.Guarantors || [];
  newState.ProfessionalQualifications = data.ProfessionalQualifications || [];
  newState.Beneficiaries = data.Beneficiaries || [];
  newState.Dependents = data.Dependents || [];
  newState.FamilyInformation = data.FamilyInformation || [];
  newState.WorkflowMeassages = data.WorkflowMeassages || [];
  newState.WorkFlowSubmissions = data.WorkFlowSubmissions || [];
  newState.Announcement = data.Announcement || [];
  newState.Todo = data.Todo || [];
  newState.Anniversary = data.Anniversary || [];

  return newState;
}

function updateWorkflowMessageState(
  state: IWorkLifeDataState,
  action: WorkLifeDataLoadWorkflowMessagesSuccess
): IWorkLifeDataState {
  const data = action.payload;

  const newState = Object.assign({}, state);
  newState.WorkflowMeassages = data || [];

  return newState;
}

function updateWorkflowSubmissionState(
  state: IWorkLifeDataState,
  action: WorkLifeDataLoadWorkflowSubmissionsSuccess
): IWorkLifeDataState {
  const data = action.payload;

  const newState = Object.assign({}, state);
  newState.WorkFlowSubmissions = data || [];

  return newState;
}
