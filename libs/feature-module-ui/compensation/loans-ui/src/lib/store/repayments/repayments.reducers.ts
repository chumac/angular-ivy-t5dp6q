import { initialRepaymentsState, IRepaymentsState } from "./repayments.state";
import { RepaymentsActionTypes, RepaymentsActions } from "./repayments.actions";



export function repaymentsReducer(
  state = initialRepaymentsState,
  action: RepaymentsActions
): IRepaymentsState {
  switch (action.type) {
    case RepaymentsActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case RepaymentsActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };

    case RepaymentsActionTypes.SHOW_REPAYMENT_VIEWER:
      return { ...state, showViewer: true };
    case RepaymentsActionTypes.HIDE_REPAYMENT_VIEWER:
      return { ...state, showViewer: false };

    case RepaymentsActionTypes.SHOW_REPAYMENT_SCHEDULE_VIEWER:
      return { ...state, showRepaymentScheduleViewer: true };
    case RepaymentsActionTypes.HIDE_REPAYMENT_SCHEDULE_VIEWER:
      return { ...state, showRepaymentScheduleViewer: false };

    case RepaymentsActionTypes.SHOW_PAYMENTS_VIEWER:
      return { ...state, showPayments: true };
    case RepaymentsActionTypes.HIDE_PAYMENTS_VIEWER:
      return { ...state, showPayments: false };

    case RepaymentsActionTypes.PROCESSING_REPAYMENTS:
      return { ...state, isProcessing: true };
    case RepaymentsActionTypes.NOT_PROCESSING_REPAYMENTS:
      return { ...state, isProcessing: false };

    case RepaymentsActionTypes.LOADING_REPAYMENTS:
      return { ...state, isLoading: true };
    case RepaymentsActionTypes.NOT_LOADING_REPAYMENTS:
      return { ...state, isLoading: false };

    case RepaymentsActionTypes.LOAD_DATA_PAYMENTS_HISTORY_SUCCESS:
      return { ...state, repaymentsData: action.payload };
    case RepaymentsActionTypes.LOAD_DATA_LOAN_REPAYMENT_TYPES_SUCCESS:
      return { ...state, repaymentTypes: action.payload };
    case RepaymentsActionTypes.LOAD_DATA_LOAN_REPAYMENT_INTEREST_SUCCESS:
      return { ...state, repaymentInterest: action.payload };
    case RepaymentsActionTypes.LOAD_DATA_LOAN_PAYMENT_INSTRUMENTS_SUCCESS:
      return { ...state, paymentInstruments: action.payload };
    case RepaymentsActionTypes.LOAD_DATA_LOAN_DEFINITIONS_REPAYMENT_SUCCESS:
      return { ...state, loanDefinitions: action.payload };
    case RepaymentsActionTypes.LOAD_DATA_RUNNING_LOANS_REPAYMENTS_SUCCESS:
      return { ...state, runningLoans: action.payload.map(data => Object.assign({}, data, {
        employeeInfo: `${data.EmployeeInfo.employee_firstname} ${data.EmployeeInfo.employee_surname}, ${data.EmployeeInfo.employee_number}`,
      loanDefinition: data.loanDefInfo.description})) };

  case RepaymentsActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_REPAYMENT_SUCCESS:
    return { ...state, repaymentScheduleData: action.payload.map(data => {
      if(data.repayment_type == 0) {
        data = {...data, repayment_type_text: "Full"}
      } else {
        data = {...data, repayment_type_text: "Partial"}
      }
      return data;
    })  };


    default: {
      return state;
  }
  }
}
