import { initialMyteamState, IMyTeamState } from './my-team.state';
import {
  MyTeamActions,
  MyTeamActionTypes,
  LoadTeamMemberProfilePictureSuccess
} from './my-team.actions';

export function myTeamReducer(
  state = initialMyteamState,
  action: MyTeamActions
): IMyTeamState {
  switch (action.type) {
    case MyTeamActionTypes.LOAD_MY_TEAM_SUCCESS:
      return { ...state, data: action.payload };
    case MyTeamActionTypes.LOAD_EMPLOYEE_TEAM_SUCCESS:
      return { ...state, data: action.payload };
    case MyTeamActionTypes.LOADING_MY_TEAM:
      return { ...state, isLoading: true };
    case MyTeamActionTypes.NOT_LOADING_MY_TEAM:
      return { ...state, isLoading: false };
    case MyTeamActionTypes.LOAD_TEAM_MEMBERS_PROFILE_PICTURE_SUCCESS:
      const newState = updateState(state, <LoadTeamMemberProfilePictureSuccess>action);
      return newState;
    default: {
      return state;
    }
  }
}

function updateState(
  state: IMyTeamState,
  action: LoadTeamMemberProfilePictureSuccess
): IMyTeamState {
  const data = action.payload;
  const newState = Object.assign({}, state);

  if (newState.data) {
    let rec = newState.data.filter(d => d.employee_id === data.employeeID).shift();
    if (rec) {
      rec.profile_picture = data.profilePic;
    }
  }

  return newState;
}