import { TransactionsActions, TransactionsActionTypes } from "./transactions.actions";
import { ITransactionsState, initialTransactionsState } from "./transactions.state";

export function transactionsReducer(
  state = initialTransactionsState,
  action: TransactionsActions
): ITransactionsState {
  switch (action.type) {
    case TransactionsActionTypes.SHOW_TRANSACTIONS_APPLICATIONS_EDITOR:
      return { ...state, showEditor: true };
    case TransactionsActionTypes.HIDE_TRANSACTIONS_APPLICATIONS_EDITOR:
      return { ...state, showEditor: false };

    case TransactionsActionTypes.SHOW_TRANSACTIONS_APPLICATIONS_VIEWER:
      return { ...state, showViewer: true };
    case TransactionsActionTypes.HIDE_TRANSACTIONS_APPLICATIONS_VIEWER:
      return { ...state, showViewer: false };

    case TransactionsActionTypes.SHOW_ACTUAL_SCHEDULE_VIEWER:
      return { ...state, showActualScheduleViewer: true };
    case TransactionsActionTypes.HIDE_ACTUAL_SCHEDULE_VIEWER:
      return { ...state, showActualScheduleViewer: false };

    case TransactionsActionTypes.PROCESSING_TRANSACTIONS_APPLICATIONS:
      return { ...state, isProcessing: true };
    case TransactionsActionTypes.NOT_PROCESSING_TRANSACTIONS_APPLICATIONS:
      return { ...state, isProcessing: false };

    case TransactionsActionTypes.LOADING_TRANSACTIONS_APPLICATIONS:
      return { ...state, isLoading: true };
    case TransactionsActionTypes.NOT_LOADING_TRANSACTIONS_APPLICATIONS:
      return { ...state, isLoading: false };

    case TransactionsActionTypes.SHOW_GENERIC_SCHEDULE_VIEWER:
      return { ...state, showGenericScheduleViewer: true };
    case TransactionsActionTypes.HIDE_GENERIC_SCHEDULE_VIEWER:
      return { ...state, showGenericScheduleViewer: false };

    case TransactionsActionTypes.SHOW_REPAYMENT_SCHEDULE_VIEWER:
    return { ...state, showRepaymentScheduleViewer: true };
  case TransactionsActionTypes.HIDE_REPAYMENT_SCHEDULE_VIEWER:
    return { ...state, showRepaymentScheduleViewer: false };

  case TransactionsActionTypes.LOAD_ACTUAL_SCHEDULE_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS:
    return { ...state, actualScheduleData: action.payload };


    case TransactionsActionTypes.LOAD_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS:
      return { ...state, transactionsData: action.payload.map(data => Object.assign({}, data, {
        employeeInfo: `${data.EmployeeInfo.employee_firstname} ${data.EmployeeInfo.employee_surname}, ${data.EmployeeInfo.employee_number}`,
      loanDefinition: data.loanDefInfo.description}))
 };

    case TransactionsActionTypes.LOAD_APPROVED_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS:
      return { ...state, approvedApplicationsData: action.payload };

    case TransactionsActionTypes.LOAD_AWAITING_APPROVAL_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS:
      return { ...state, awaitingApprovalsData: action.payload.map(data => Object.assign({}, data, {
        employeeInfo: `${data.EmployeeInfo.employee_firstname} ${data.EmployeeInfo.employee_surname}, ${data.EmployeeInfo.employee_number}`,
      loanDefinition: data.loanDefInfo.description})) };

    case TransactionsActionTypes.LOAD_LOAN_TYPES_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS:
      return { ...state, loanTypesData: action.payload.data, loanTypesSelect: action.payload.loanTypesTransformed };

    case TransactionsActionTypes.LOAD_CURRENCIES_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS:
      return { ...state, currenciesData: action.payload };

    case TransactionsActionTypes.LOAD_MONTHLY_DEDUCTION_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS:
    return { ...state, monthlyDeduction: action.payload };

    case TransactionsActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_APPLICATION_SUCCESS:
      return { ...state, repaymentScheduleData: action.payload.map(data => {
        if(data.repayment_type == 0) {
          data = {...data, repayment_type_text: "Full"}
        } else {
          data = {...data, repayment_type_text: "Partial"}
        }
        return data;
      })  };

    case TransactionsActionTypes.LOAD_GENERIC_SCHEDULE_DATA_TRANSACTIONS_APPLICATIONS_SUCCESS:
      return { ...state, genericScheduleData: action.payload };

    case TransactionsActionTypes.LOAD_DOCUMENT_SUCCESS:
      return { ...state, document: action.payload };
    default: {
      return state;
    }
  }
}
