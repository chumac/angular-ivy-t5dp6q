import { IPayDesk, IPaymentPlatform } from "@nutela/models/compensation/payment";


export interface IPayDeskState {
  data: IPayDesk[];
  paymentPlatforms: IPaymentPlatform[];
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialPayDeskState: IPayDeskState = {
  data: [],
  paymentPlatforms: null,
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showViewer: false,
};
