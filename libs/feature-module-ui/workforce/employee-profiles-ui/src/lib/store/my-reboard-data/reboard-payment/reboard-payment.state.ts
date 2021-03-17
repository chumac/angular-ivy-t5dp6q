
import { IPayment } from '@nutela/models/workforce/employee-profiles';

export interface IReboardPaymentState {
  data: IPayment;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialReboardPaymentState: IReboardPaymentState =  {
  data: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}
