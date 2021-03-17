import { IBusinessType } from "@nutela/models/platform/lookup";

export interface IBusinessTypeState {
  businessData: IBusinessType[];
  showEditor:boolean;
  isProcessing: boolean;
 
}

export const initialBusinessTypeState: IBusinessTypeState = {
  businessData: [],
  showEditor: false,
  isProcessing: false,
}

