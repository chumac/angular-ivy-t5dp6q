import { IAppraisalFormsState, initialAppraisalFormsState } from "./appraisal-forms.state";
import { AppraisalFormsActions, AppraisalFormsActionTypes } from "./appraisal-forms.actions";

export function appraisalFormsReducer(
  state = initialAppraisalFormsState,
  action: AppraisalFormsActions
): IAppraisalFormsState {
  switch (action.type) {
    case AppraisalFormsActionTypes.LOAD_EMPLOYEE_REVIEW_FORMS_SUCCESS:
      return { ...state, employeeReviewForms: action.payload };
    case AppraisalFormsActionTypes.LOAD_EMPLOYEE_CONFIRMATION_STATUS_SUCCESS:
      return { ...state, employeeConfirmationStatus: action.payload };
    case AppraisalFormsActionTypes.LOAD_PAGE_NAVIGATOR_LIST:
      return { ...state, pageNavigatorList: action.payload };
    case AppraisalFormsActionTypes.TOGGLE_SAVE_CONTINUE_DISABLED_STATUS:
      return { ...state, saveContinueDisabledStatus: action.payload };
    case AppraisalFormsActionTypes.LOAD_REVIEW_WORKFLOW_PROCESS:
      return { ...state, reviewWorkflowProcess: null, employeeReviewForms: [] };
    case AppraisalFormsActionTypes.LOAD_REVIEW_WORKFLOW_PROCESS_SUCCESS:
      return { ...state, reviewWorkflowProcess: action.payload };
    case AppraisalFormsActionTypes.LOAD_EMPLOYEE_PAGE_SCORES_SUCCESS:
      return { ...state, employeePageScores: action.payload };
    case AppraisalFormsActionTypes.CLEAR_EMPLOYEE_PAGE_SCORES:
      return { ...state, employeePageScores: null };

    default: {
      return state;
    }
  }
}
