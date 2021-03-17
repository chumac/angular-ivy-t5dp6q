import { initialFeedBackFormState, IFeedBackFormState } from './feedback-form.state';
import { FeedbackFormActions, FeedbackFormActionTypes } from './feedback-form.actions';

export function feedBackFormReducer(
  state = initialFeedBackFormState,
  action: FeedbackFormActions
): IFeedBackFormState {
  switch (action.type) {
    case FeedbackFormActionTypes.SET_FEEDBACK_METADATA:
      return { ...state, feedbackMetaData: action.payload };
    case FeedbackFormActionTypes.START_EMPLOYEE_FEEDBACK_SUCCESS:
      return { ...state, startEmployeeFeedback: action.payload };
    case FeedbackFormActionTypes.LOAD_EMPLOYEE_CAN_PROVIDE_FEEDBACK_SUCCESS:
      return { ...state, canEmployeeProvideFeedback: action.payload };
    case FeedbackFormActionTypes.LOAD_EMPLOYEE_FEEDBACK_OBJECTIVE_MASTERS_SUCCESS:
      return { ...state, employeeObjectiveMaster: action.payload.map(data => Object.assign({}, data, { 
        description_backup: data.description,
        editMode: false,
        emp_comment_err: null,
        lm_comment_err: null,
        lm_feedback_err: null,
        emp_feedback_err: null, 
      }))
      };
    case FeedbackFormActionTypes.LOAD_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS:
      return { ...state, employeeObjectiveDetail: action.payload.map(data => Object.assign({}, data, { 
        editMode: false,
        emp_comment_err: null, 
      })) 
      };

    case FeedbackFormActionTypes.LOAD_LM_FEEDBACK_OBJECTIVE_MASTERS_SUCCESS:
      return { ...state, lmObjectiveMaster: action.payload.map(data => Object.assign({}, data, { 
        description_backup: data.description,
        editMode: false,
        emp_comment_err: null,
        lm_comment_err: null,
        lm_feedback_err: null,
        emp_feedback_err: null, 
      }))
      };
    case FeedbackFormActionTypes.LOAD_LM_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS:
      return { ...state, lmObjectiveDetail: action.payload.map(data => Object.assign({}, data, { 
        editMode: false,
        emp_comment_err: null, 
      })) 
      };

    case FeedbackFormActionTypes.LOAD_LM_FEEDBACK_OBJECTIVE_DETAILS_ALT_SUCCESS:
      return { ...state, lmObjectiveDetailAlt: action.payload.map(data => Object.assign({}, data, { 
        editMode: false,
        emp_comment_err: null, 
      })) 
      };
  

    case FeedbackFormActionTypes.LOAD_HR_FEEDBACK_OBJECTIVE_MASTERS_SUCCESS:
      return { ...state, hrObjectiveMaster: action.payload.map(data => Object.assign({}, data, { 
        description_backup: data.description,
        editMode: false,
        emp_comment_err: null,
        lm_comment_err: null,
        lm_feedback_err: null,
        emp_feedback_err: null, 
      }))
      };
    case FeedbackFormActionTypes.LOAD_HR_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS:
      return { ...state, hrObjectiveDetail: action.payload.map(data => Object.assign({}, data, { 
        editMode: false,
        emp_comment_err: null, 
      })) 
      };

    case FeedbackFormActionTypes.LOAD_HR_EMPLOYEE_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS:
      return { ...state, hrEmpObjectiveDetail: action.payload.map(data => Object.assign({}, data, { 
        editMode: false,
        emp_comment_err: null, 
      })) 
      };

    case FeedbackFormActionTypes.LOAD_HR_LM_FEEDBACK_OBJECTIVE_DETAILS_SUCCESS:
      return { ...state, hrLMObjectiveDetail: action.payload.map(data => Object.assign({}, data, { 
        editMode: false,
        emp_comment_err: null, 
      })) 
      };

    case FeedbackFormActionTypes.PROCESSING:
      return { ...state, processing: true };
    case FeedbackFormActionTypes.NOT_PROCESSING:
      return { ...state, processing: false };
    case FeedbackFormActionTypes.LOADING_MASTERS:
      return { ...state, processingMasters: action.payload };
    case FeedbackFormActionTypes.LOADING_DETAILS:
      return { ...state, processingDetails: action.payload };
      case FeedbackFormActionTypes.COMPLETING_MASTERS:
        return { ...state, completingMasters: action.payload };
      case FeedbackFormActionTypes.COMPLETING_DETAILS:
        return { ...state, completingDetails: action.payload };
    case FeedbackFormActionTypes.SUBMITTING_OBJECTIVES:
      return { ...state, submittingObjective: action.payload };
    case FeedbackFormActionTypes.LOADING_TEAM:
      return { ...state, loadingTeam: action.payload };
      
    case FeedbackFormActionTypes.LOAD_FEEDBACK_RATINGS_SUCCESS:
      return { ...state, feedbackRatings: action.payload };

    case FeedbackFormActionTypes.LOAD_LM_FEEDBACK_TEAM_COUNT_SUCCESS:
      return { ...state, lmTeamCount: action.payload };
    case FeedbackFormActionTypes.LOAD_LM_FEEDBACK_TEAM_SUCCESS:
      return { ...state, lmTeamList: action.payload };
    case FeedbackFormActionTypes.LOAD_HR_FEEDBACK_TEAM_SUCCESS:
      return { ...state, hrTeamList: action.payload };
    case FeedbackFormActionTypes.LOAD_EMPLOYEE_INFO_SUCCESS:
      return { ...state, employeeInfo: action.payload };
    default: {
      return state;
    }
  }
}
