import { ProxyApplicationsActions, ProxyApplicationsActionTypes } from "./proxy-applications.actions";
import { IProxyApplicationsState, initialProxyApplicationsState } from "./proxy-applications.state";

export function proxyApplicationsReducer(
  state = initialProxyApplicationsState,
  action: ProxyApplicationsActions
): IProxyApplicationsState {
  switch (action.type) {
    case ProxyApplicationsActionTypes.SHOW_PROXY_APPLY_EDITOR:
      return { ...state, showEditor: true };
    case ProxyApplicationsActionTypes.HIDE_PROXY_APPLY_EDITOR:
      return { ...state, showEditor: false };

    case ProxyApplicationsActionTypes.SHOW_PROXY_APPLY_VIEWER:
      return { ...state, showViewer: true };
    case ProxyApplicationsActionTypes.HIDE_PROXY_APPLY_VIEWER:
      return { ...state, showViewer: false };

    case ProxyApplicationsActionTypes.PROCESSING_PROXY_APPLICATIONS:
      return { ...state, isProcessing: true };
    case ProxyApplicationsActionTypes.NOT_PROCESSING_PROXY_APPLICATIONS:
      return { ...state, isProcessing: false };

    case ProxyApplicationsActionTypes.LOADING_PROXY_APPLICATIONS:
      return { ...state, isLoading: true };
    case ProxyApplicationsActionTypes.NOT_LOADING_PROXY_APPLICATIONS:
      return { ...state, isLoading: false };

    case ProxyApplicationsActionTypes.SHOW_STANDARD_SCHEDULE_VIEWER:
    return { ...state, showStandardScheduleViewer: true };
  case ProxyApplicationsActionTypes.HIDE_STANDARD_SCHEDULE_VIEWER:
    return { ...state, showStandardScheduleViewer: false };

  case ProxyApplicationsActionTypes.SHOW_ACTUAL_SCHEDULE_VIEWER:
    return { ...state, showActualScheduleViewer: true };
  case ProxyApplicationsActionTypes.HIDE_ACTUAL_SCHEDULE_VIEWER:
    return { ...state, showActualScheduleViewer: false };

  case ProxyApplicationsActionTypes.SHOW_GENERIC_SCHEDULE_VIEWER:
    return { ...state, showGenericScheduleViewer: true };
  case ProxyApplicationsActionTypes.HIDE_GENERIC_SCHEDULE_VIEWER:
    return { ...state, showGenericScheduleViewer: false };

  case ProxyApplicationsActionTypes.SHOW_REPAYMENT_SCHEDULE_VIEWER:
    return { ...state, showRepaymentScheduleViewer: true };
  case ProxyApplicationsActionTypes.HIDE_REPAYMENT_SCHEDULE_VIEWER:
    return { ...state, showRepaymentScheduleViewer: false };


    case ProxyApplicationsActionTypes.LOAD_DATA_PROXY_APPLICATIONS_SUCCESS:
      return { ...state, proxyApplicationsData: action.payload.map(data => Object.assign({}, data, {
        employeeInfo: `${data.EmployeeInfo.employee_firstname} ${data.EmployeeInfo.employee_surname}, ${data.EmployeeInfo.employee_number}`,
      loanDefinition: data.loanDefInfo.description})) };

    case ProxyApplicationsActionTypes.LOAD_APPROVED_DATA_PROXY_APPLICATIONS_SUCCESS:
      return { ...state, approvedApplicationsData: action.payload.map(data => Object.assign({}, data, {
        loanType: data.loanDefInfo.description
      }))};

    case ProxyApplicationsActionTypes.LOAD_AWAITING_APPROVAL_DATA_PROXY_APPLICATIONS_SUCCESS:
      return { ...state, awaitingApprovalsData: action.payload.map(data => Object.assign({}, data, {
        employeeInfo: `${data.EmployeeInfo.employee_firstname} ${data.EmployeeInfo.employee_surname}, ${data.EmployeeInfo.employee_number}`,
      loanDefinition: data.loanDefInfo.description})) };

    case ProxyApplicationsActionTypes.LOAD_LOAN_TYPES_DATA_PROXY_APPLICATIONS_SUCCESS:
      return { ...state, loanTypesData: action.payload.data, loanTypesSelect: action.payload.loanTypesTransformed };

    case ProxyApplicationsActionTypes.LOAD_CURRENCIES_DATA_PROXY_APPLICATIONS_SUCCESS:
      return { ...state, currenciesData: action.payload };

    case ProxyApplicationsActionTypes.LOAD_SELFSERVICE_SOURCES_DATA_PROXY_APPLICATIONS_SUCCESS:
      return { ...state, selfServiceSourcesData: action.payload };

    case ProxyApplicationsActionTypes.LOAD_MONTHLY_DEDUCTION_DATA_PROXY_APPLICATIONS_SUCCESS:
    return { ...state, monthlyDeduction: action.payload };

    case ProxyApplicationsActionTypes.LOAD_STANDARD_SCHEDULE_DATA_PROXY_APPLICATION_SUCCESS:
    return { ...state, standardScheduleData: action.payload };

  case ProxyApplicationsActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_PROXY_APPLICATION_SUCCESS:
    return { ...state, repaymentScheduleData: action.payload.map(data => {
      if(data.repayment_type == 0) {
        data = {...data, repayment_type_text: "Full"}
      } else {
        data = {...data, repayment_type_text: "Partial"}
      }
      return data;
    })  };

  case ProxyApplicationsActionTypes.LOAD_ACTUAL_SCHEDULE_DATA_PROXY_APPLICATION_SUCCESS:
    return { ...state, actualScheduleData: action.payload };

  case ProxyApplicationsActionTypes.LOAD_GENERIC_SCHEDULE_DATA_PROXY_APPLICATION_SUCCESS:
    return { ...state, genericScheduleData: action.payload };

  case ProxyApplicationsActionTypes.LOAD_DOCUMENT_SUCCESS:
    return { ...state, document: action.payload };

    default: {
      return state;
    }
  }
}
