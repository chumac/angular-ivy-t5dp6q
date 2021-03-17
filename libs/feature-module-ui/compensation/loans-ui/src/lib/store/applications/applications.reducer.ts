import {
  initialApplicationsState,
  IApplicationsState
} from './applications.state';
import {
  ApplicationActions,
  ApplicationsActionTypes
} from './applications.actions';

export function applicationsReducer(
  state = initialApplicationsState,
  action: ApplicationActions
): IApplicationsState {
  switch (action.type) {
    case ApplicationsActionTypes.SHOW_APPLY_EDITOR:
      return { ...state, showEditor: true };
    case ApplicationsActionTypes.HIDE_APPLY_EDITOR:
      return { ...state, showEditor: false };

    case ApplicationsActionTypes.SHOW_APPLY_VIEWER:
      return { ...state, showViewer: true };
    case ApplicationsActionTypes.HIDE_APPLY_VIEWER:
      return { ...state, showViewer: false };

    case ApplicationsActionTypes.SHOW_STANDARD_SCHEDULE_VIEWER:
      return { ...state, showStandardScheduleViewer: true };
    case ApplicationsActionTypes.HIDE_STANDARD_SCHEDULE_VIEWER:
      return { ...state, showStandardScheduleViewer: false };

    case ApplicationsActionTypes.SHOW_ACTUAL_SCHEDULE_VIEWER:
      return { ...state, showActualScheduleViewer: true };
    case ApplicationsActionTypes.HIDE_ACTUAL_SCHEDULE_VIEWER:
      return { ...state, showActualScheduleViewer: false };

    case ApplicationsActionTypes.SHOW_GENERIC_SCHEDULE_VIEWER:
      return { ...state, showGenericScheduleViewer: true };
    case ApplicationsActionTypes.HIDE_GENERIC_SCHEDULE_VIEWER:
      return { ...state, showGenericScheduleViewer: false };

    case ApplicationsActionTypes.SHOW_REPAYMENT_SCHEDULE_VIEWER:
      return { ...state, showRepaymentScheduleViewer: true };
    case ApplicationsActionTypes.HIDE_REPAYMENT_SCHEDULE_VIEWER:
      return { ...state, showRepaymentScheduleViewer: false };

    case ApplicationsActionTypes.SHOW_APPLICATION_VIEWER:
      return { ...state, showViewer: true };
    case ApplicationsActionTypes.HIDE_APPLICATION_VIEWER:
      return { ...state, showViewer: false };

    case ApplicationsActionTypes.PROCESSING_APPLICATION:
      return { ...state, isProcessing: true };
    case ApplicationsActionTypes.NOT_PROCESSING_APPLICATION:
      return { ...state, isProcessing: false };

    case ApplicationsActionTypes.LOADING_APPLICATION:
      return { ...state, isLoading: true };
    case ApplicationsActionTypes.NOT_LOADING_APPLICATION:
      return { ...state, isLoading: false };

    case ApplicationsActionTypes.LOAD_ALL_DATA_APPLICATION_SUCCESS:
      return { ...state, allApplicationsData: action.payload };

    case ApplicationsActionTypes.SAVE_SUCCESS:
      return { ...state, saveSuccess: action.payload };

    case ApplicationsActionTypes.LOAD_APPROVED_DATA_APPLICATION_SUCCESS:
      return { ...state, approvedData: action.payload.map(data => Object.assign({}, data, {
        loanTypeDescription: data.loanDefInfo.description,
      })) };

    case ApplicationsActionTypes.LOAD_AWAITING_APPROVAL_DATA_APPLICATION_SUCCESS:
      return { ...state, awaitingApprovalData: action.payload.map(data => Object.assign({}, data, {
        loanTypeDescription: data.loanDefInfo.description,
      })) };

    case ApplicationsActionTypes.LOAD_LOAN_DEFINITION_DATA_APPLICATION_SUCCESS:
      return { ...state, definitionsList: action.payload.data, loanTypesSelect: action.payload.loanTypesSelect};

    case ApplicationsActionTypes.LOAD_LOAN_CURRENCY_DATA_APPLICATION_SUCCESS:
      return { ...state, currenciesList: action.payload };

      case ApplicationsActionTypes.LOAD_STANDARD_SCHEDULE_DATA_APPLICATION_SUCCESS:
      return { ...state, standardScheduleData: action.payload };

    case ApplicationsActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_APPLICATION_SUCCESS:
      return { ...state, repaymentScheduleData: action.payload.map(data => {
        if(data.repayment_type == 0) {
          data = {...data, repayment_type_text: "Full"}
        } else {
          data = {...data, repayment_type_text: "Partial"}
        }
        return data;
      }) };

    case ApplicationsActionTypes.LOAD_ACTUAL_SCHEDULE_DATA_APPLICATION_SUCCESS:
      return { ...state, actualScheduleData: action.payload };

    case ApplicationsActionTypes.LOAD_GENERIC_SCHEDULE_DATA_APPLICATION_SUCCESS:
      return { ...state, genericScheduleData: action.payload };

    case ApplicationsActionTypes.LOAD_MONTHLY_DEDUCTION_DATA_APPLICATION_SUCCESS:
      return { ...state, monthlyDeduction: action.payload };

    case ApplicationsActionTypes.LOAD_CLOSED_DATA_APPLICATIONS_SUCCESS:
      return { ...state, closedData: action.payload };

    case ApplicationsActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };

    default: {
      return state;
    }
  }
}
