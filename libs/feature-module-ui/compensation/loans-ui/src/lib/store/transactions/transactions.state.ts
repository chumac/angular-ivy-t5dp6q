import { IApprovedLoan, ILoanDefinition, ILoanRepayment } from "@nutela/models/compensation/loans";
import { ISelectOption } from "@nutela/models/core-data";


export interface ITransactionsState {
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
  showGenericScheduleViewer: boolean;
  approvedApplicationsData: IApprovedLoan[];
  awaitingApprovalsData: IApprovedLoan[];
  transactionsData: IApprovedLoan[];
  activePersonnel: ISelectOption[];
  currenciesData: ISelectOption[];
  loanTypesData: ILoanDefinition[];
  monthlyDeduction: number;
  showRepaymentScheduleViewer: boolean;
  repaymentScheduleData: ILoanRepayment[];
  genericScheduleData: ILoanRepayment[];
  showActualScheduleViewer: boolean;
  actualScheduleData: ILoanRepayment[];
  document: any,
  loanTypesSelect: ISelectOption[];
}

export const initialTransactionsState: ITransactionsState = {
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showViewer: false,
  transactionsData: null,
  approvedApplicationsData: null,
  awaitingApprovalsData: null,
  activePersonnel: null,
  currenciesData: null,
  loanTypesData: null,
  monthlyDeduction: null,
  showRepaymentScheduleViewer: false,
  showGenericScheduleViewer: false,
  repaymentScheduleData: null,
  genericScheduleData: null,
  showActualScheduleViewer: false,
  actualScheduleData: null,
  document: null,
  loanTypesSelect: null
}

