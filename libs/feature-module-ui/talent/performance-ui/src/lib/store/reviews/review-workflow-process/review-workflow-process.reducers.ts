import { IReviewWorkflowProcessState, initialReviewWorkflowProcessState } from "./review-workflow-process.state";
import { ReviewWorkflowProcessActions, ReviewWorkflowProcessActionTypes } from "./review-workflow-process.actions";

export function reviewWorkflowProcessReducer(
  state = initialReviewWorkflowProcessState,
  action: ReviewWorkflowProcessActions
): IReviewWorkflowProcessState {
  switch (action.type) {
    case ReviewWorkflowProcessActionTypes.LOAD_REVIEW_WORKFLOW_PROCESS_SUCCESS:
      return { ...state, data: action.payload };

    case ReviewWorkflowProcessActionTypes.LOADING_REVIEW_WORKFLOW_PROCESS:
      return { ...state, isLoading: true };

    case ReviewWorkflowProcessActionTypes.NOT_LOADING_REVIEW_WORKFLOW_PROCESS:
      return { ...state, isLoading: false };

    case ReviewWorkflowProcessActionTypes.RESULT_COMMAND:
      return { ...state, resultCommand: action.payload };

    default: {
      return state;
    }
  }
}
