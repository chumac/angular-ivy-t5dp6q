
import { IGuarantor } from '@nutela/models/workforce/employee-profiles';

export interface IReboardGuarantorState {
  data: IGuarantor[];
  document: any;
  inlineDocument: any;
  photo: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialReboardGuarantorState: IReboardGuarantorState = {
  data: [],
  document: null,
  inlineDocument: null,
  photo: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

