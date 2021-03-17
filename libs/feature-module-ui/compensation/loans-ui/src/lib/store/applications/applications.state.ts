import { ISelectOption } from '@nutela/models/core-data';
import {
  IApplication,
  ILoanRepayment,
  ILoanSchedule,
  ILoanDefinition
} from '@nutela/models/compensation/loans';

export interface IApplicationsState {
  approvedData: any[];
  awaitingApprovalData: any[];
  closedData: any[];
  allApplicationsData: IApplication[];
  repaymentScheduleData: ILoanRepayment[];
  standardScheduleData: ILoanSchedule[];
  definitionsList: ILoanDefinition[];
  currenciesList: ISelectOption[];
  actualScheduleData: ILoanRepayment[];
  genericScheduleData: ILoanRepayment[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
  showStandardScheduleViewer: boolean;
  showActualScheduleViewer: boolean;
  showGenericScheduleViewer: boolean;
  showRepaymentScheduleViewer: boolean;
  monthlyDeduction: number;
  document: any;
  saveSuccess: boolean;
  loanTypesSelect: ISelectOption[];
}

export const initialApplicationsState: IApplicationsState = {
  approvedData: [],
  awaitingApprovalData: [],
  closedData: [],
  allApplicationsData: [],
  repaymentScheduleData: [],
  standardScheduleData: [],
  definitionsList: [],
  currenciesList: [],
  actualScheduleData: [],
  genericScheduleData: [],
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showViewer: false,
  showStandardScheduleViewer: false,
  showActualScheduleViewer: false,
  showGenericScheduleViewer: false,
  showRepaymentScheduleViewer: false,
  monthlyDeduction: null,
  document: null,
  saveSuccess: false,
  loanTypesSelect: []
};
