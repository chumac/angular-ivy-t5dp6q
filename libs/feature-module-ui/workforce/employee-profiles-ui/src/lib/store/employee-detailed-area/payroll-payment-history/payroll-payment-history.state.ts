import { IPayrollPaymentHistory } from "@nutela/models/workforce/employee-profiles";

export interface IPayrollPaymentHistoryState {
  approvedData: IPayrollPaymentHistory[];
  awaitingApprovalData: IPayrollPaymentHistory[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialPayrollPaymentHistoryState: IPayrollPaymentHistoryState = {
  approvedData: null,
  awaitingApprovalData: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}