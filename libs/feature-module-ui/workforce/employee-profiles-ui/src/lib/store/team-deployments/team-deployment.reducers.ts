import { initialTeamDeploymentState, ITeamDeploymentState } from './team-deployment.state';
import { TeamDeploymentActions, TeamDeploymentActionTypes } from './team-deployment.actions';

export function teamDeploymentReducer(
  state = initialTeamDeploymentState,
  action: TeamDeploymentActions
): ITeamDeploymentState {
  switch (action.type) {
    case TeamDeploymentActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case TeamDeploymentActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };
    case TeamDeploymentActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case TeamDeploymentActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case TeamDeploymentActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case TeamDeploymentActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case TeamDeploymentActionTypes.LOADING:
      return { ...state, loading: true };
    case TeamDeploymentActionTypes.NOT_LOADING:
      return { ...state, loading: false };
    case TeamDeploymentActionTypes.LOADING_SUGGESTION:
      return { ...state, loadingSuggestion: true };
    case TeamDeploymentActionTypes.NOT_LOADING_SUGGESTION:
      return { ...state, loadingSuggestion: false };
    case TeamDeploymentActionTypes.LOAD_DEPLOYMENT_DATA:
      return { ...state, deploymentData: [] };
    case TeamDeploymentActionTypes.LOAD_TRANSACTION_DATA:
      return { ...state, transactionData: [] };
    case TeamDeploymentActionTypes.LOAD_DEPLOYMENT_DATA_SUCCESS:
      return { ...state, deploymentData: action.payload };
    case TeamDeploymentActionTypes.LOAD_TRANSACTION_DATA_SUCCESS:
      return { ...state, transactionData: action.payload };
    case TeamDeploymentActionTypes.LOAD_TEAM_MEMBERS_SUCCESS:
      return { ...state, team: action.payload.map(data => Object.assign({}, data, 
        { emp_fullname: `${data.employee_firstname} ${data.employee_midname} ${data.employee_surname}`}))
      };
    case TeamDeploymentActionTypes.LOAD_SUPERVISOR_SUGGESTION:
      return { ...state, suggestedSupervisor: null };
    case TeamDeploymentActionTypes.LOAD_SUPERVISOR_SUGGESTION_SUCCESS:
      return { ...state, suggestedSupervisor: action.payload };
    case TeamDeploymentActionTypes.LOAD_POSITION_LIST_SUCCESS:
      return { ...state, positionList: action.payload };
    default: {
      return state;
    }
  }
}