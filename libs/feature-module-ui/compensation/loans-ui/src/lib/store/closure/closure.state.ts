import { IApprovedLoan, ILoanRepayment } from "@nutela/models/compensation/loans";

export interface IClosureState {
  applicationsData: IApprovedLoan[];
  closuresAwaitingApprovalData: IApprovedLoan[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
  showGenericScheduleViewer: boolean;
  showRepaymentScheduleViewer: boolean;
  genericScheduleData: ILoanRepayment[];
  repaymentScheduleData: ILoanRepayment[];
}

export const initialClosureState: IClosureState =  {
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showViewer: false,
  applicationsData: null,
  closuresAwaitingApprovalData: null,
  showGenericScheduleViewer: false,
  showRepaymentScheduleViewer: false,
  genericScheduleData: null,
  repaymentScheduleData: null
}
