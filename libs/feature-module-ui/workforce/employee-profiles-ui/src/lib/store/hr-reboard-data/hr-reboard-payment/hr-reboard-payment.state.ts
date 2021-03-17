
import { IPayment } from '@nutela/models/workforce/employee-profiles';

export interface IHrReboardPaymentState {
  data: IPayment;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialHrReboardPaymentState: IHrReboardPaymentState =  {
  data: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}
