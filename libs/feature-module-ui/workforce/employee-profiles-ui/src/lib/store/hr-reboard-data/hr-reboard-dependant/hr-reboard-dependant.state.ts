
import { IDependant } from '@nutela/models/workforce/employee-profiles';
import { IStateSelectOption, ISelectOption } from '@nutela/models/core-data';

export interface IHrReboardDependantState {
  data: IDependant[];
  stateList: IStateSelectOption[];
  cityList: ISelectOption[];
  photo: any,
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialHrReboardDependantsState: IHrReboardDependantState = {
  data: [],
  stateList: [],
  cityList: [],
  photo: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false
}

