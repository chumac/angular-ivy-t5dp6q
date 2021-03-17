
import { ISelectOption } from "@nutela/models/core-data";
import { ILoanRepayment, IApprovedLoan } from "@nutela/models/compensation/loans";

export interface IRepaymentsState {
  repaymentsData: ILoanRepayment[];
  runningLoans: IApprovedLoan[];
  repaymentTypes: ISelectOption[];
  paymentInstruments: ISelectOption[];
  loanDefinitions: ISelectOption[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
  showPayments: boolean;
  paymentsHistory: ILoanRepayment[];
  repaymentInterest: any;
  showRepaymentScheduleViewer: boolean;
  repaymentScheduleData: ILoanRepayment[];
}

export const initialRepaymentsState: IRepaymentsState =  {
  repaymentsData: null,
  runningLoans: null,
  repaymentTypes: null,
  loanDefinitions: null,
  paymentInstruments: null,
  paymentsHistory: null,
  repaymentInterest: null,
  repaymentScheduleData: null,
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showViewer: false,
  showPayments: false,
  showRepaymentScheduleViewer: false
}
