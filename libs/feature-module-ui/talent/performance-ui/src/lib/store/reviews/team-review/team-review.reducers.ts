import { initialTeamReviewState, ITeamReviewState } from './team-review.state';
import {
  TeamReviewActions,
  TeamReviewActionTypes
} from './team-review.actions';

export function teamReviewReducer(
  state = initialTeamReviewState,
  action: TeamReviewActions
): ITeamReviewState {
  switch (action.type) {
    case TeamReviewActionTypes.LOAD_TEAM_REVIEW_SUCCESS:
      return { ...state, data: action.payload };

    case TeamReviewActionTypes.LOADING_TEAM_REVIEW:
    return { ...state, isLoading: true };
  case TeamReviewActionTypes.NOT_LOADING_TEAM_REVIEW:
    return { ...state, isLoading: false };
    default: {
      return state;
    }
  }
}
