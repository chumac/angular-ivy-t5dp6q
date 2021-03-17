import { initialClosureState, IClosureState } from "./closure.state";
import { ClosureActionTypes, ClosureActions } from "./closure.actions";



export function closureReducer(
  state = initialClosureState,
  action: ClosureActions
): IClosureState {
  switch (action.type) {
    case ClosureActionTypes.SHOW_EDITOR:
      return { ...state, showEditor: true };
    case ClosureActionTypes.HIDE_EDITOR:
      return { ...state, showEditor: false };

    case ClosureActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ClosureActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };

    case ClosureActionTypes.SHOW_GENERIC_SCHEDULE_VIEWER:
      return { ...state, showGenericScheduleViewer: true };
    case ClosureActionTypes.HIDE_GENERIC_SCHEDULE_VIEWER:
      return { ...state, showGenericScheduleViewer: false };

    case ClosureActionTypes.SHOW_REPAYMENT_SCHEDULE_VIEWER:
      return { ...state, showRepaymentScheduleViewer: true };
    case ClosureActionTypes.HIDE_REPAYMENT_SCHEDULE_VIEWER:
      return { ...state, showRepaymentScheduleViewer: false };

    case ClosureActionTypes.PROCESSING:
      return { ...state, isProcessing: true };
    case ClosureActionTypes.NOT_PROCESSING:
      return { ...state, isProcessing: false };

    case ClosureActionTypes.LOADING_CLOSURE:
      return { ...state, isLoading: true };
    case ClosureActionTypes.NOT_LOADING_CLOSURE:
      return { ...state, isLoading: false };

    case ClosureActionTypes.LOAD_APPLICATIONS_DATA_LOAN_CLOSURE_SUCCESS:
      return { ...state, applicationsData: action.payload.map(data => Object.assign({}, data, {
        employeeInfo: `${data.EmployeeInfo.employee_firstname} ${data.EmployeeInfo.employee_surname}, ${data.EmployeeInfo.employee_number}`,
      loanDefinition: data.loanDefInfo.description}))};

    case ClosureActionTypes.LOAD_AWAITING_APPROVAL_DATA_LOAN_CLOSURE_SUCCESS:
      return { ...state, closuresAwaitingApprovalData: action.payload.map(data => Object.assign({}, data, {
        employeeInfo: `${data.EmployeeInfo.employee_firstname} ${data.EmployeeInfo.employee_surname}, ${data.EmployeeInfo.employee_number}`,
      loanDefinition: data.loanDefInfo.description}))};

    case ClosureActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_LOAN_CLOSURE_SUCCESS:
      return { ...state, repaymentScheduleData: action.payload.map(data => {
        if(data.repayment_type == 0) {
          data = {...data, repayment_type_text: "Full"}
        } else {
          data = {...data, repayment_type_text: "Partial"}
        }
        return data;
      })  };
    case ClosureActionTypes.LOAD_GENERIC_SCHEDULE_DATA_LOAN_CLOSURE_SUCCESS:
      return { ...state, genericScheduleData: action.payload };

    default: {
      return state;
  }
  }
}
