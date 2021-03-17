
import { ManageReviewActionTypes, ManageReviewActions } from './manage-review.actions';
import { initialManageReviewState, IManageReviewState } from './manage-review.state';

export function manageReviewReducer(
  state = initialManageReviewState,
  action: ManageReviewActions
): IManageReviewState {
  switch (action.type) {
    case ManageReviewActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ManageReviewActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };
    case ManageReviewActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ManageReviewActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };
    case ManageReviewActionTypes.LOAD_OBJECTIVE_MASTER_SUCCESS:
      return { ...state, objectiveMaster: action.payload };
    case ManageReviewActionTypes.LOADING_OBJECTIVE_MASTER:
      return { ...state, loadingObjectiveMaster: true };
    case ManageReviewActionTypes.NOT_LOADING_OBJECTIVE_MASTER:
      return { ...state, loadingObjectiveMaster: false };
    case ManageReviewActionTypes.LOAD_OBJECTIVES_SUCCESS:
      return { ...state, objectives: action.payload };
    case ManageReviewActionTypes.LOAD_PRESCORED_OBJECTIVES_SUCCESS:
      return { ...state, preScoredObjectives: action.payload };
    case ManageReviewActionTypes.LOADING_OBJECTIVES:
      return { ...state, loadingObjectives: true };
    case ManageReviewActionTypes.NOT_LOADING_OBJECTIVES:
      return { ...state, loadingObjectives: false };
    default: {
      return state;
    }
  }
}
