
import { IReferee } from '@nutela/models/workforce/employee-profiles';

export interface IReboardRefereeState {
  data: IReferee[];
  document: any;
  inlineDocument: any;
  photo: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialReboardRefereeState: IReboardRefereeState = {
  data: [],
  document: null,
  inlineDocument: null,
  photo: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

