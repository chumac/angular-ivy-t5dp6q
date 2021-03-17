
import { ISelectOption } from "@nutela/models/core-data";
import { ILoanDefinition, IApprovedLoan, ILoanRepayment, ILoanSchedule } from "@nutela/models/compensation/loans";

export interface IProxyApplicationsState {
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
  showStandardScheduleViewer: boolean;
  showActualScheduleViewer: boolean;
  showGenericScheduleViewer: boolean;
  showRepaymentScheduleViewer: boolean;
  approvedApplicationsData: IApprovedLoan[];
  awaitingApprovalsData: IApprovedLoan[];
  proxyApplicationsData: IApprovedLoan[];
  currenciesData: ISelectOption[];
  loanTypesData: ILoanDefinition[];
  selfServiceSourcesData: ISelectOption[];
  monthlyDeduction: number;
  actualScheduleData: ILoanRepayment[];
  genericScheduleData: ILoanRepayment[];
  repaymentScheduleData: ILoanRepayment[];
  standardScheduleData: ILoanSchedule[];
  document: any;
  loanTypesSelect: ISelectOption[]
}

export const initialProxyApplicationsState: IProxyApplicationsState = {
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showViewer: false,
  proxyApplicationsData: [],
  approvedApplicationsData: [],
  awaitingApprovalsData: [],
  currenciesData: null,
  loanTypesData: null,
  selfServiceSourcesData: null,
  monthlyDeduction: null,
  repaymentScheduleData: null,
  standardScheduleData: null,
  genericScheduleData: null,
  actualScheduleData: null,
  showStandardScheduleViewer: false,
  showActualScheduleViewer: false,
  showGenericScheduleViewer: false,
  showRepaymentScheduleViewer: false,
  document: null,
  loanTypesSelect: null
}

