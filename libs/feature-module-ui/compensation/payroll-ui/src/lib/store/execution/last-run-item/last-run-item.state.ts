import { ILastRun } from "@nutela/models/compensation/payroll";
import { IPayrollProfile } from "@nutela/models/compensation/payment";


export interface ILastRunItemState {
  lastRuns: ILastRun[];
  payrollProfile: IPayrollProfile;
  lastRunStatus: any[];
  employeeData: any[];
  payslipData: any[];
  isProcessing: boolean;
  isLoading: boolean;
  showStatusViewer: boolean;
  showFigureViewer: boolean;
  showFinalizeEditor: boolean;
  canCancel: any;
  sendForApprovalMessage: any;
  reportUrl: string;
}

export const initialLastRunItemState: ILastRunItemState = {
  lastRuns: [],
  payrollProfile: null,
  lastRunStatus: [],
  employeeData: null,
  payslipData: null,
  isProcessing: false,
  isLoading: false,
  showStatusViewer: false,
  showFigureViewer: false,
  showFinalizeEditor: false,
  canCancel: null,
  sendForApprovalMessage: null,
  reportUrl: null
}

