import { ITeamLeaveCardState, initialTeamLeaveCardState } from "./team-leave-card.state";
import { TeamLeaveCardActions, TeamLeaveCardActionTypes } from "./team-leave-card.actions";

export function teamLeaveCardReducer(
  state = initialTeamLeaveCardState,
  action: TeamLeaveCardActions
): ITeamLeaveCardState {
  switch (action.type) {
    case TeamLeaveCardActionTypes.LOAD_LEAVE_TIMELINE_SUCCESS :
      return { ...state, data: action.payload };
    case TeamLeaveCardActionTypes.VIEW_TYPE:
      return { ...state, viewType: action.payload };

    default: {
      return state;
    }
  }
}
