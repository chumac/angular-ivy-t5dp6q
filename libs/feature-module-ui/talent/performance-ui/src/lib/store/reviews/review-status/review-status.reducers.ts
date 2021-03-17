
import { ReviewStatusActionTypes, ReviewStatusActions } from './review-status.actions';
import { initialReviewStatusState, IReviewStatusState } from './review-status.state';

export function reviewStatusReducer(
  state = initialReviewStatusState,
  action: ReviewStatusActions
): IReviewStatusState {
  switch (action.type) {
    case ReviewStatusActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ReviewStatusActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ReviewStatusActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ReviewStatusActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ReviewStatusActionTypes.LOAD_OBJECTIVE_MASTER_SUCCESS:
      return { ...state, objectiveMaster: action.payload };
    case ReviewStatusActionTypes.LOADING_OBJECTIVE_MASTER:
      return { ...state, loadingObjectiveMaster: true };
    case ReviewStatusActionTypes.NOT_LOADING_OBJECTIVE_MASTER:
      return { ...state, loadingObjectiveMaster: false };
    default: {
      return state;
    }
  }
}
