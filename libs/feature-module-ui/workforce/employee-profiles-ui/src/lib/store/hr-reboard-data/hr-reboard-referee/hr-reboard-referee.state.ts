
import { IReferee } from '@nutela/models/workforce/employee-profiles';

export interface IHrReboardRefereeState {
  data: IReferee[];
  document: any;
  inlineDocument: any;
  photo: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialHrReboardRefereeState: IHrReboardRefereeState = {
  data: [],
  document: null,
  inlineDocument: null,
  photo: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

