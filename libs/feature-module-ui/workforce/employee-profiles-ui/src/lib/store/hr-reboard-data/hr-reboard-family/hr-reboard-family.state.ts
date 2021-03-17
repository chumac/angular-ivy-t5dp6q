
import { IFamily } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption, IStateSelectOption } from '@nutela/models/core-data';

export interface IHrReboardFamilyState {
  data: IFamily[];
  document: any;
  inlineDocument: any;
  stateList: IStateSelectOption[];
  cityList: ISelectOption[];
  photo: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialHrReboardFamilyState: IHrReboardFamilyState = {
  data: [],
  document: null,
  inlineDocument: null,
  stateList: [],
  cityList: [],
  photo: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

