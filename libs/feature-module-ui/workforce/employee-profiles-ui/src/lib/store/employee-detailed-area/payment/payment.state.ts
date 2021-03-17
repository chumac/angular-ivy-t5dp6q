
import { IPayment } from '@nutela/models/workforce/employee-profiles';

export interface IPaymentState {
  approvedData: IPayment;
  awaitingApprovalData: IPayment;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialPaymentState: IPaymentState =  {
  approvedData: null,
  awaitingApprovalData: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}
