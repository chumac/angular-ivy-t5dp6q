
import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export interface IReboardIdentificationState {
  data: IIdentification;
  signature: any;
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
  positionList: ISelectOption[];
  gradeList: ISelectOption[];
  paygroupList: ISelectOption[];
}

export const initialReboardIdentificationState: IReboardIdentificationState =  {
  data: null,
  signature: null,
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showViewer: false,
  positionList: null,
  gradeList: null,
  paygroupList: null
}
