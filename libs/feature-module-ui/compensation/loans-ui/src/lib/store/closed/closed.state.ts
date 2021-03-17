import { IApprovedLoan, ILoanRepayment } from "@nutela/models/compensation/loans";

export interface IClosedState {
  closedData: IApprovedLoan[];
  isLoading: boolean;
  showViewer: boolean;
  showGenericScheduleViewer: boolean;
  showRepaymentScheduleViewer: boolean;
  genericScheduleData: ILoanRepayment[];
  repaymentScheduleData: ILoanRepayment[];
}

export const initialClosedState: IClosedState =  {
  isLoading: false,
  showViewer: false,
  showGenericScheduleViewer: false,
  showRepaymentScheduleViewer: false,
  closedData: null,
  genericScheduleData: null,
  repaymentScheduleData: null
}
