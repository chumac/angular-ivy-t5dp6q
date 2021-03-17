import { initialClosedState, IClosedState } from "./closed.state";
import { ClosedActions, ClosedActionTypes } from "./closed.actions";


export function closedReducer(
  state = initialClosedState,
  action: ClosedActions
): IClosedState {
  switch (action.type) {
    case ClosedActionTypes.SHOW_VIEWER:
      return { ...state, showViewer: true };
    case ClosedActionTypes.HIDE_VIEWER:
      return { ...state, showViewer: false };

    case ClosedActionTypes.LOADING_CLOSED:
      return { ...state, isLoading: true };
    case ClosedActionTypes.NOT_LOADING_CLOSED:
      return { ...state, isLoading: false };

    case ClosedActionTypes.SHOW_GENERIC_SCHEDULE_VIEWER:
      return { ...state, showGenericScheduleViewer: true };
    case ClosedActionTypes.HIDE_GENERIC_SCHEDULE_VIEWER:
      return { ...state, showGenericScheduleViewer: false };

    case ClosedActionTypes.SHOW_REPAYMENT_SCHEDULE_VIEWER:
      return { ...state, showRepaymentScheduleViewer: true };
    case ClosedActionTypes.HIDE_REPAYMENT_SCHEDULE_VIEWER:
      return { ...state, showRepaymentScheduleViewer: false };

    case ClosedActionTypes.LOAD_REPAYMENTS_SCHEDULE_DATA_CLOSED_SUCCESS:
      return { ...state, repaymentScheduleData: action.payload.map(data => {
        if(data.repayment_type == 0) {
          data = {...data, repayment_type_text: "Full"}
        } else {
          data = {...data, repayment_type_text: "Partial"}
        }
        return data;
      })  };

    case ClosedActionTypes.LOAD_GENERIC_SCHEDULE_DATA_CLOSED_SUCCESS:
      return { ...state, genericScheduleData: action.payload };

    case ClosedActionTypes.LOAD_CLOSED_DATA_SUCCESS:
      return { ...state, closedData: action.payload.map(data => Object.assign({}, data, {
        employeeInfo: `${data.EmployeeInfo.employee_firstname} ${data.EmployeeInfo.employee_surname}, ${data.EmployeeInfo.employee_number}`,
      loanDefinition: data.loanDefInfo.description}))};

    default: {
      return state;
  }
  }
}
